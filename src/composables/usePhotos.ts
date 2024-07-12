import { ref } from 'vue';
import { z } from 'zod';

const photoSchema = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});

type Photo = z.infer<typeof photoSchema>;

const usePhotos = () => {
  const photos = ref<Photo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let controller = new AbortController();

  const fetchPhotos = async () => {
    loading.value = true;
    error.value = null;
    controller = new AbortController(); 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
        signal: controller.signal,
      });
      const data = await response.json();
      photos.value = z.array(photoSchema).parse(data);
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
    photos,
    loading,
    error,
    fetchPhotos,
    cancelFetch,
  };
};

export default usePhotos;
