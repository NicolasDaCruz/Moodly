<template>
    <div class="container">
      <div class="bar-chart">
        <BarChart :chart-data="chartData" />
      </div>
      <div class="reason-card">
        <Card v-for="(item, index) in cardData" :key="index" :cardData="item" />
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import BarChart from '../components/BarChart.vue';
  import Card from '../components/MoodCard.vue';
  
  export default {
  components: {
    BarChart,
    Card
  },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: []
    });
    const cardData = ref([]);

    const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/mood-entries');
    const groupedData = {};

    // Regrouper les données par label et calculer les sommes et les comptes
    response.data.data.forEach(item => {
      const label = item.attributes.Raison;
      const moodRate = item.attributes.MoodRate;

      if (!groupedData[label]) {
        groupedData[label] = { sum: 0, count: 0 };
      }

      groupedData[label].sum += moodRate;
      groupedData[label].count += 1;
    });

    // Calculer les moyennes
    const labels = Object.keys(groupedData);
    const averages = labels.map(label => groupedData[label].sum / groupedData[label].count);

    // Mettre à jour chartData
    chartData.value = {
      labels: labels,
      datasets: [{
        label: 'Moyenne Humeur',
        data: averages
      }]
    };

    cardData.value = response.data.data.map(item => ({
      title: item.attributes.Raison,
      description: `Date: ${item.attributes.Date}, Mood Rate: ${item.attributes.MoodRate}`
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
};



    onMounted(fetchData);

    return { chartData, cardData };
  }
};
  </script>
  
  /*
  Dans le script setup pour faire marcher avec Strapi
  
  
  */
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100vh;
  }
  .chart-container {
    width: 100%;
  }
  
  .chart-container canvas {
    width: 100% !important;
    height: auto !important;
  }
  
  .cards-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  </style>
  