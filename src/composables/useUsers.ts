import { ref } from 'vue';
import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
});

const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: addressSchema,
  phone: z.string(),
  website: z.string(),
  company: companySchema,
});

type Address = z.infer<typeof addressSchema>;
type Company = z.infer<typeof companySchema>;
type User = z.infer<typeof userSchema>;

const useUsers = () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let controller = new AbortController();

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    controller = new AbortController(); 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal,
      });
      const data = await response.json();
      users.value = z.array(userSchema).parse(data);
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
    users,
    loading,
    error,
    fetchUsers,
    cancelFetch,
  };
};

export { Address, Company, useUsers as default };
