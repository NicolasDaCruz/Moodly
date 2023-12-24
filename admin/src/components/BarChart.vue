<template>
    <div>
      <canvas ref="barChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, watch, toRefs } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default defineComponent({
    name: 'BarChart',
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const { chartData } = toRefs(props);
      const barChart = ref(null);
      let myChart = null;
  
      const createGradient = (ctx, area) => {
        const gradient = ctx.createLinearGradient(0, 0, area.width, 0);
        gradient.addColorStop(0, '#B05DA3');
        gradient.addColorStop(1, '#785DB0');
        return gradient;
      };
  
      onMounted(() => {
        const context = barChart.value.getContext('2d');
        const gradient = createGradient(context, barChart.value);
  
        props.chartData.datasets.forEach(dataset => {
          dataset.backgroundColor = gradient;
        });
  
        myChart = new Chart(context, {
          type: 'bar',
          data: chartData.value,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
  
      watch(chartData, (newData) => {
        myChart.data = newData;
        myChart.update();
      });
  
      return {
        barChart
      };
    }
  });
  </script>
  


  /*
Dans le script setup pour faire marcher avec Strapi

axios.get('url-de-votre-endpoint-strapi').then((response) => {
  chartData.value = {
    labels: response.data.map(item => item.label),
    datasets: [{
      label: 'Humeur',
      data: response.data.map(item => item.value)
    }]
  };
});

*/