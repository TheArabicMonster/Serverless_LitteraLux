<script>
import axios from 'axios'

export default {
  name: 'FormAppreciation',
  data() {
    return {
      commentaireValue: null,
      appreciationValue: null
    }
  },
  methods: {
    async envoyer(event) {
      event.preventDefault() // Empêche le formulaire de se soumettre normalement

      axios.post(`http://localhost:3000/api/commentaires`, {
        contenu: this.contenu,
        appreciation: this.appreciation,
        idLivre: this.livreId
      })
    }
  },
  props:{
    livreId:{
        type:Boolean,
        required:true,
    }
  }
}
</script>

<!-- Formulaire d'appréciation -->
<template>
  <div>
    <h3>Formulaire d'appréciation</h3>

    <form @submit="envoyer">
      <div>
        <label for="commentaire">Qu'avez-vous pensé de ce livre ?</label>
        <textarea
          name="commentaire"
          id="commentaire"
          cols="20"
          rows="3"
          v-model="contenu"
          placeholder="Je trouve ce livre ...."
        ></textarea>
        <label for="appreciation">Entrez un nombre entre 0 et 5</label>
        <input
          v-model="appreciation"
          placeholder=""
          class="appreciation"
          id="appreciation"
          type="number"
          name="appreciation"
          step="1"
          min="0"
          max="5"
          required
        />
        <span class="validity"></span>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
div {
  background-color: rgb(77, 122, 73);
  border-radius: 10px;
  width: 80%;
 max-height: 70%;
 min-height: 50%;

  margin: auto;
}
div input,
.appreciation {
  background-color: rgb(169, 194, 167);
  display: block;
  margin: 20px auto 10px auto;
  width: 60%;
  padding: 2%;
  border: none;
}
.appreciation {
  background-color: rgb(217, 217, 217);
}
h3 {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  padding-top: 5%;
  text-align: center;
}
textarea {
  display: block;
  margin: auto;
  background-color: rgb(217, 217, 217);
}
</style>
