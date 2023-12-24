<template>
    <div class="feeling-page">
      <h1 class="Title">Comment-vous sentez vous aujourd'hui ?</h1>
      <div class="image-container">
        <img :src="currentImage" alt="Feeling Image"/>
      </div>
      <div class="moodStatement">
        <p class="Humeur">Humeur: {{ moodStatement }}</p>
      </div>
      <input type="range" min="1" :max="images.length" v-model="sliderValue" class="image-slider" />
      <select v-model="selectedRaison">
      <option value="Personnelles">Personnelles</option>
      <option value="Équipes">Équipes</option>
      <option value="Managers">Managers</option>
      <option value="Projets">Projets</option>
    </select>
      <button @click="sendSliderData" class="continue-button">Envoyer</button>
    </div>
  </template>
  
  <script>
  import panda1 from '@/assets/panda 1.svg';
  import panda2 from '@/assets/panda 2.svg';
  import panda3 from '@/assets/panda 3.svg';
  import panda4 from '@/assets/panda 4.svg';
  import panda5 from '@/assets/panda 5.svg';
  import axios from 'axios';
  /*export default {
    data() {
      return {
        images: [
          panda1,
          panda2,
          panda3,
          panda4,
          panda5,
        ],
        sliderValue: 1
      }
    },
    computed: {
      currentImage() {
        return this.images[this.sliderValue - 1]; // Soustrayez 1 car les indices de tableau commencent à 0
      }
    },
    methods: {
      sendSliderData() {
        console.log("Valeur du slider envoyée:", this.sliderValue);
        // Ajoutez ici votre logique d'envoi
      }
    }
  };*/
  const Home = {
    data() {
      return {
        images: [panda1, panda2, panda3, panda4, panda5],
        sliderValue: 1,
        selectedRaison: 'Personnelles'
      }
    },
    computed: {
      currentImage() {
        return this.images[this.sliderValue - 1];
      },
      moodStatement() {
        console.log("Recalcul de moodStatement pour sliderValue = ", this.sliderValue);
        // Exemple de logique pour déterminer l'humeur
        const value = Number(this.sliderValue);
        switch (value) {
          default: return "...";
          case 1: return "Mauvaise Humeur";
          case 2: return "Humeur Maussade";
          case 3: return "Humeur Neutre";
          case 4: return "Bonne Humeur";
          case 5: return "Tout va bien !";
        }
      }
    },
    watch: {
      sliderValue(newVal, oldVal) {
        console.log(`sliderValue changed from ${oldVal} to ${newVal}`);
      }
    },
    methods: {
      sendSliderData() {
        console.log("Valeur du slider envoyée:", this.sliderValue);
        console.log("Option sélectionnée:", this.selectedRaison);
  
        // URL de l'API Strapi
        const apiUrl = 'http://localhost:1337/api/mood-entries'; // Remplacez par votre URL Strapi
        const Raison = this.selectedRaison.toString();
        const Mood = this.sliderValue.toString();
        const data = {
          "data": {
            "Raison": Raison,
            "Date": new Date(),
            "MoodRate": Mood,
            "user_id": 1
          }
        };
        
        // Requête POST à Strapi
        axios.post(apiUrl, data)
        .then(response => {
          console.log("Réponse de Strapi:", response);
        })
        .catch(error => {
          console.error("Erreur lors de l'envoi à Strapi:", error);
        });
      }
    }
    /*const header = {
      "Authorization": `Bearer ${API_TOKEN_EMPLOYE}`,
      "Content-Type": "application/json"
    }*/
  }
  export default Home;
  </script>
  
  <style>
  .feeling-page {
    width: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fff; /* Couleur de fond (à ajuster selon vos besoins) */
  }
  
  .Title {
    color: #000000;
    font-weight: 700;
  }
  
  .Humeur{
    font-weight: 500;
    color: black;
  }
  
  .image-container img {
    width: 400px; /* Taille de l'image (à ajuster selon vos besoins) */
    margin-bottom: 30px; /* Espacement entre l'image et le slider */
  }
  
  .image-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 70%;
    height: 60px;
    border-radius: 60px;
    border: 4px solid #000000;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    margin-bottom: 30px; /* Espacement entre le slider et le bouton */
  }
  
  .image-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    padding-left: 12px;
    margin-right: -12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
  
  .image-slider::-moz-range-thumb {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
  
  .continue-button {
    background-color: #007BFF; /* Couleur de fond du bouton */
    border: none;
    border-radius: 20px;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
  }
  
  .continue-button:hover {
    background-color: #0016b3;
    color: white;
  }
  </style>
  