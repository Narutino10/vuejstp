<template>
  <div>
    <h1>Photos</h1>
    <button @click="fetchPhotos">Fetch Photos</button>
    <button @click="cancelFetch">Cancel Fetch</button>
    <table v-if="!loading && photos.length">
      <thead>
        <tr>
          <th>Album ID</th>
          <th>ID</th>
          <th>Title</th>
          <th>Photo</th>
          <th>Thumbnail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in photos" :key="photo.id">
          <td>{{ photo.albumId }}</td>
          <td>{{ photo.id }}</td>
          <td>{{ photo.title }}</td>
          <td><img :src="photo.url" :alt="photo.title" width="150" /></td>
          <td><img :src="photo.thumbnailUrl" :alt="photo.title" width="150" /></td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import usePhotos from '../composables/usePhotos';

export default defineComponent({
  name: 'PhotosView',
  setup() {
    const { photos, loading, error, fetchPhotos, cancelFetch } = usePhotos();

    onMounted(() => {
      fetchPhotos();
    });

    return {
      photos,
      loading,
      error,
      fetchPhotos,
      cancelFetch,
    };
  },
});
</script>
