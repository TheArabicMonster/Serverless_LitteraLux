<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import FormAppreciation from '@/views/Partial/FormAppreciation.vue'
export default {
  components: {
    Header,
    FormAppreciation
  },
  data() {
    return {
      allLivres: [],
      livres: null,
      commentaires: null,
      moyenneA: null,
      comment: null,
      livreId: null,
      auteurs: null
    }
  },
  async mounted() {
    console.log(this.livreId)
    await this.getLivres();
    //await this.getBooksById(this.livreId)

  },
  methods: {
    async getBooksById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/livres/${id}`)
        this.livres = response.data
        /* if (this.livres != null) {
          console.log('aaaa' + this.livres.data.resume);
        } else {
          console.log('bbbb');
        }*/
        await this.getComments(id)
        await this.getAuthors(id)
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error)
      }
    },
    async getComments(commentId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/commentaires/livre/${commentId}`
        )
        const response2 = await axios.get(
          `http://localhost:3000/api/commentaires/livre/${commentId}/moyenneA`
        )
        //const response = await axios.get(`http://localhost:3000/api/livres/${commentId}/commentaires`)
        this.commentaires = response.data
        this.moyenneA = response2.data
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error)
        this.commentaires = `NoCommentaire`
        this.moyenneA = `noMoyenne`
      }
    },
    async getAuthors(authorID) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auteurs/${authorID}`

        )
        this.auteurs = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des auteuddrs :', error)
        this.auteurs = `noAuteur`
      }
    },


    async SelectionLivre(event) {
      event.preventDefault()
      this.getBooksById(this._idLivre)
      this.livreId = 3
      console.log(this.livreId)
    },
    async getLivres() {
      const response = await axios.get(`http://localhost:3000/api/livres`)
      this.allLivres = response.data.data
    }
  }
}
</script>

<template>
  <div class="firstSelection" v-if="livres == nul">
    <form @submit="SelectionLivre">
      <div>
        <label for="_idLivre">ID livre : </label>
        <select v-model="_idLivre">
          <option v-for="livre in allLivres" :key="livre.idLivre" :value="livre.idLivre">
            {{ livre.titre }}
          </option>
        </select>
        <span class="validity"></span>
      </div>
      <div>
        <input type="submit" value="Rechercher">
      </div>
    </form>
  </div>
  <section v-if="livres">
    <div class="partie1">
      <img class="imgCouverture" :src="livres?.data?.imageCouverture" alt="Image de couverture du livre" />
      <h3>Informations</h3>
      <ul>
        <li v-for="livre in livres" :key="livre.idLivre">
          <!-- Afficher chaque propriété du livre si elle a une valeur -->
          <p v-if="livre.titre">Titre : {{ livre.titre }}</p>
          <p v-if="livre.extrait">Auteur :{{ auteurs.data.prenom }} {{ auteurs.data.nom }} </p>
          <p v-if="livre.anneeEdition">Année d'édition : {{ livre.anneeEdition }}</p>
          <p v-if="livre.nbPage">Nombre de page : {{ livre.nbPage }}</p>
        </li>
      </ul>

    </div>

    <div class="partie2" v-for="livre in livres" :key="livre.idLivre">
      <h2>Résumé</h2>
      <p>{{ livres.data.resume }}</p>

      <a :href="livres?.data?.extrait" target="_blank">Extrait</a>
      <form @submit="SelectionLivre">
        <div>
          <label for="_idLivre">Sélectionnez un livre</label>
          <select v-model="_idLivre">
            <option v-for="livre in allLivres" :key="livre.idLivre" :value="livre.idLivre">
              {{ livre.titre }}
            </option>
          </select>
          <span class="validity"></span>
        </div>
        <div>
          <input type="submit" value="Rechercher" />
        </div>
      </form>
    </div>


    <div v-if="commentaires" class="partie3" v-for="commentaire in commentaires" :key="commentaire.idCommentaire">
      <h2>Appréciations des lecteurs</h2>
      <p v-if="moyenneA.moyenneAppreciation != null"> Note moyenne : {{ moyenneA.moyenneAppreciation }} avec {{
        moyenneA.nombreAppreciations }} notes</p>
      <p v-if="moyenneA.moyenneAppreciation == null"> Ce livre n'a pas de commentaires</p>

      <FormAppreciation :livreId="livres.data.idLivre"></FormAppreciation>

    </div>
  </section>
</template>
<style>
section {
  display: grid;
  grid-template-areas: 'partie1 partie2 partie3';
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: white;
  line-height: 140%;
  letter-spacing: 0.5px;
}

.partie1 {
  background-color: rgb(44, 106, 149);
  grid-area: partie1;
  display: grid;
}

.partie2 {
  background-color: rgb(37, 90, 133);
  grid-area: partie2;
}

.partie3 {
  background-color: rgb(27, 79, 121);
  grid-area: partie3;
}

.partie3 p,
h2 {
  text-align: center;
}

h3 {
  color: white;
}

.partie1 img {
  margin: auto;
}

.partie1 ul {
  list-style: none;
  text-align: left;
  margin: auto;
}

.partie1 input,
h2,
h3,
h4,
p,
ul,
form {

  margin: auto;
}

.partie form div,
input {
  margin: auto;
}

.partie1 p {
  color: white;
  font-size: medium;
}

.partie2 p {
  grid-area: partiep;
  display: grid;
  margin: auto;
  width: 33%;
  grid-template-areas: 'partiep' 'partiea' 'partieform';
}

.partie2 a {
  grid-area: partiea;
  text-decoration: underline;
  color: #007bff;
  font-size: large;
  display: block;
  text-align: center;
  margin-top: 1%;
}

.partie2 form {
  margin-top: 10%;
  grid-area: partieform;
  display: block;
  text-align: center;
}

.partie2 form label {
  display: block;
}

.partie2 form input {
  width: 30%;
  margin-top: 2%;
}

.partie3 p {
  text-decoration: underline;
}

.imgCouverture {
  min-width: 320px;
  min-width: 320px;
  max-width: 400px;
  min-height: 300px;
  max-height: 450px;
}

.firstSelection {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Form elements styling */
.firstSelection form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Label styling */
.firstSelection label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Select and input styling */
.firstSelection select,
input[type="submit"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
  box-sizing: border-box;
}

/* Select styling */
.firstSelection select {
  appearance: none;
  background-color: white;
  cursor: pointer;
}

/* Submit button styling */
.firstSelection input[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.firstSelection input[type="submit"]:hover {
  background-color: #0056b3;
}

section input {
  width: 30px;
}
</style>
