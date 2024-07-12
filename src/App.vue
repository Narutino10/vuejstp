<template>
  <div id="app">
    <nav>
      <button @click="navigateTo('/')">Users</button>
      <button @click="navigateTo('/posts')">Posts</button>
      <button @click="navigateTo('/photos')">Photos</button>
      <button @click="navigateTo('/comments')">Comments</button>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();

    const navigateTo = (path: string) => {
      router.push(path);
    };

    return {
      navigateTo,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

nav button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #009879;
  color: white;
  border: none;
  border-radius: 5px;
}

nav button:hover {
  background-color: #007f63;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

table th, table td {
  padding: 12px 15px;
}

table tbody tr {
  border-bottom: 1px solid #dddddd;
}

table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
