<template>
  <div class="book">
    <h1>Liste des Livres</h1>
    <div v-for="category in categories" :key="category.idCategorie">
      <h2>{{ category.nom }}</h2>
      <ul class="book-list">
        <li v-for="book in filteredBooks(category.idCategorie)" :key="book.idLivre">
          <img class="book-cover" :src="book.imageCouverture" alt="Couverture du livre">
          <div class="book-info">
            <h3>{{ book.titre }}</h3>
            <p>{{ findAuthor(book.idAuteur).nom }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: [],
      categories: [],
      authors: []
    }
  },
  methods: {
    filteredBooks(idCategorie) {
      return this.books.filter(book => book.id_categorie === idCategorie);
    },
    findAuthor(idAuteur) {
      return this.authors.find(author => author.idAuteur === idAuteur);
    }
  },
  mounted() {
    // Effectuer une requête GET pour récupérer la liste des livres depuis ton API
    axios
      .get('http://localhost:3000/api/livres')
      .then((response) => {
        this.books = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livres :', error)
      })

    axios
      .get('http://localhost:3000/api/categories')
      .then((response) => {
        this.categories = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories :', error)
      })
    
    axios
      .get('http://localhost:3000/api/auteurs')
      .then((response) => {
        this.authors = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des auteurs :', error)
      })
  }
}
</script>

<style scoped>
.book{
  background-color: #739AAF;
  padding: 10px;
}
.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  list-style: none;
  padding: 0;
}
.book-list li {
  flex: 1 0 200px; /* This means that each book will take up at least 200px, but will grow to take up remaining space if available */
}
.book-cover {
  width: 200px;
  height: 300px;
  object-fit: cover; /* This will ensure that the image covers the entire space of the img element without distorting the aspect ratio */
}
h2{
  font-size: 45px;
  font-family: Arial, Helvetica, sans-serif;
}
h3{
  font-family: Arial, Helvetica, sans-serif;
  color: chocolate;
}
</style>