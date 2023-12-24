<template>
    <div class="register-container">
      <h1>Inscription</h1>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email">
        </div>
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="user.username">
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="user.password">
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          email: '',
          username: '',
          password: ''
        }
      };
    },
    methods: {
      async register() {
        try {
          const apiUrl = 'http://localhost:1337/api/auth/local/register';
          const response = await axios.post(apiUrl, this.user);
          console.log("Réponse de Strapi:", response);
          localStorage.setItem('jwt', response.data.jwt);
          this.$router.push({ name: 'Home' });
        } catch (error) {
          console.error("Erreur lors de l'enregistrement:", error);
        }
      }
    }
  };
  </script>
  
  <style>
    .register-container {
  max-width: 350px;
  margin: 50px auto;
  padding: 25px;
  background-color: #f8f8f8; /* Fond clair */
  border-radius: 10px; /* Bords arrondis */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre subtile */
  text-align: center;
}

.register-container h1 {
  color: #0053a4; /* Bleu CGI ou autre couleur principale */
  margin-bottom: 20px;
}

.register-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-container label {
  font-size: 14px;
  color: #333; /* Texte foncé */
  margin-bottom: 5px;
}

.register-container input[type='text'],
.register-container input[type='email'],
.register-container input[type='password'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd; /* Bordure subtile */
  border-radius: 5px; /* Bords légèrement arrondis */
  box-sizing: border-box;
}

.register-container button {
  width: 100%;
  background-color: #007bff; /* Bleu primaire */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.register-container button:hover {
  background-color: #0056b3; /* Bleu un peu plus foncé */
}

  </style>
  