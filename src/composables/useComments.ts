import { ref } from 'vue';
import { z } from 'zod';

const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

type Comment = z.infer<typeof commentSchema>;

const useComments = () => {
  const comments = ref<Comment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let controller = new AbortController();

  const fetchComments = async () => {
    loading.value = true;
    error.value = null;
    controller = new AbortController();
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        signal: controller.signal,
      });
      const data = await response.json();
      comments.value = z.array(commentSchema).parse(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          error.value = 'Fetch aborted';
        } else {
          error.value = err.message;
        }
      } else {
        error.value = 'An unknown error occurred';
      }
    } finally {
      loading.value = false;
    }
  };

  const cancelFetch = () => {
    controller.abort(); 
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    cancelFetch,
  };
};

export default useComments;
