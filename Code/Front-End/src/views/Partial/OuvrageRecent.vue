<template>
  <p>Ouvrage ajouté récemment</p>
  <div class="livres-container">
    <div class="livre" v-for="livre in livres" :key="livre.idLivre">
      <img :src="livre.imageCouverture" :alt="livre.titre" />
      <h2>{{ livre.titre }}</h2>
      <p>{{ findAuthor(livre.idAuteur).nom }}</p>
      <p>{{ findUser(livre.idUser).nom }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OuvrageRecent',
  data() {
    return {
      livres: [],
      authors:[],
      users:[]
    }
  },
  methods: {
    findAuthor(idAuteur) {
      return this.authors.find(author => author.idAuteur === idAuteur);
    },
    findUser(idUser) {
      return this.users.find(user => user.idUser === idUser);
    }
  },
  mounted() {
    // Effectuer une requête GET pour récupérer la liste des livres depuis ton API
    axios
      .get('http://localhost:3000/api/livres')
      .then((response) => {
        this.livres = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livres :', error)
      })
    axios
      .get('http://localhost:3000/api/auteurs')
      .then((response) => {
        this.authors = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des auteurs :', error)
      })

    axios
      .get('http://localhost:3000/api/users')
      .then((response) => {
        this.users = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error)
      })
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/livres/recent')
      console.log('Livres récupérés :', response.data)
      this.livres = response.data.data
    } catch (error) {
      console.error('Erreur lors de la récupération des livres :', error)
    }
  }
}
</script>

<style scoped>
p{
  font-size: 34px;
  margin-left: 28px;
  margin-bottom: 63px;
}
.livre img {
  width: 200px;
  height: 300px;
  object-fit: cover;
}
.livre{
  padding: 5px;
}
.livres-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>