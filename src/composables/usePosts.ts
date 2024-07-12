import { ref } from 'vue';
import { z } from 'zod';

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

type Post = z.infer<typeof postSchema>;

const usePosts = () => {
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let controller = new AbortController();

  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;
    controller = new AbortController(); 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        signal: controller.signal,
      });
      const data = await response.json();
      posts.value = z.array(postSchema).parse(data);
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
    posts,
    loading,
    error,
    fetchPosts,
    cancelFetch,
  };
};

export default usePosts;
