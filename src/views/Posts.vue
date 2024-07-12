<template>
  <div>
    <h1>Posts</h1>
    <button @click="fetchPosts">Fetch Posts</button>
    <button @click="cancelFetch">Cancel Fetch</button>
    <table v-if="!loading && posts.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.userId }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import usePosts from '../composables/usePosts';

export default defineComponent({
  name: 'PostsView',
  setup() {
    const { posts, loading, error, fetchPosts, cancelFetch } = usePosts();

    onMounted(() => {
      fetchPosts();
    });

    return {
      posts,
      loading,
      error,
      fetchPosts,
      cancelFetch,
    };
  },
});
</script>
