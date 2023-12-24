<template>
    <div class="login-container">
      <form @submit.prevent="login">
        <div>
            <label for="username">Pseudo:</label>
            <input type="text" id="username" v-model="username">
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
      data() {
          return {
              username: '',
              password: ''
          };
      },
      methods: {
          async login() {
            try {
                const apiUrl = 'http://localhost:1337/api/auth/local';
                const data = {
                    identifier: this.username,
                    password: this.password
                };
                console.log(data)
                const response = await axios.post(apiUrl, data);
                console.log("Réponse de Strapi:", response);
                localStorage.setItem('jwt', response.data.jwt);
                this.$router.push({ name: 'Home' });
            } catch (error) {
                console.error("Erreur lors de l'envoi à Strapi:", error);
            }
          }
      }
  };
  </script>

  
  <style>
  .login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.login-container h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
}

.login-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container label {
  font-weight: bold;
  margin-bottom: 10px;
  align-self: flex-start;
}

.login-container input[type='text'],
.login-container input[type='password'] {
  width: 90%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;
}

.login-container button {
  width: 90%;
  background-color: #0053a4; /* Couleur bleue - ajustez selon la charte graphique */
  color: white;
  padding: 12px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-container button:hover {
  background-color: #003974; /* Couleur bleue plus foncée - ajustez selon la charte graphique */
}

  </style>
  