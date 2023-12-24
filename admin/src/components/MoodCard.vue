<template>
    <div class="card">
      <h3>{{ cardData.title }}</h3>
      <p>{{ cardData.description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cardData: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  </style>
  