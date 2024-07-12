<template>
  <div>
    <h1>Users</h1>
    <button @click="fetchUsers">Fetch Users</button>
    <button @click="cancelFetch">Cancel Fetch</button>
    <table v-if="!loading && users.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatAddress(user.address) }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.website }}</td>
          <td>{{ formatCompany(user.company) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useUsers, { Address, Company } from '../composables/useUsers';

export default defineComponent({
  name: 'UsersView',
  setup() {
    const { users, loading, error, fetchUsers, cancelFetch } = useUsers();

    onMounted(() => {
      fetchUsers();
    });

    const formatAddress = (address: Address) => {
      return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode} (Lat: ${address.geo.lat}, Lng: ${address.geo.lng})`;
    };

    const formatCompany = (company: Company) => {
      return `${company.name}, ${company.catchPhrase}, ${company.bs}`;
    };

    return {
      users,
      loading,
      error,
      fetchUsers,
      cancelFetch,
      formatAddress,
      formatCompany,
    };
  },
});
</script>
