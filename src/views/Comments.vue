<template>
  <div>
    <h1>Comments</h1>
    <button @click="fetchComments">Fetch Comments</button>
    <button @click="cancelFetch">Cancel Fetch</button>
    <table v-if="!loading && comments.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Post ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td>{{ comment.id }}</td>
          <td>{{ comment.postId }}</td>
          <td>{{ comment.name }}</td>
          <td>{{ comment.email }}</td>
          <td>{{ comment.body }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useComments from '../composables/useComments';

export default defineComponent({
  name: 'CommentsView',
  setup() {
    const { comments, loading, error, fetchComments, cancelFetch } = useComments();

    onMounted(() => {
      fetchComments();
    });

    return {
      comments,
      loading,
      error,
      fetchComments,
      cancelFetch,
    };
  },
});
</script>
