<script>
import axios from 'axios'

export default {
    name: 'AddOuvrage',
    data() {
        return {
            categories: [],
            auteurs: []
        }
    },
    async mounted() {

        await this.getCategories();
        console.log("categorie :" + this.categories[0])
        await this.getAuthors();
        console.log("author :" + this.auteurs[0])

    },
    methods: {
        async ajouter(event) {
            event.preventDefault()

            const response = await axios.post(`http://localhost:3000/api/livres`, {
                titre: this.titre,
                id_categorie: this.categorie,
                extrait: this.extrait,
                resume: this.resume,
                nbPage: this.nbPages,
                anneeEdition: this.anneeEdition,
                imageCouverture: this.imageCouverture,
                idAuteur: this.auteur

            })
            console.log(response)
        },

        async getCategories() {
            const response = await axios.get(`http://localhost:3000/api/categories`)
            this.categories = response.data.data
        },
        async getAuthors() {
            const response = await axios.get(`http://localhost:3000/api/auteurs`)
            this.auteurs = response.data.data
        }
    }
}
</script>


<template>
    <div class="addOuvrage">
        <h3>Ajout d'ouvrages</h3>

        <form @submit="ajouter">
            <label for="titre">Titre</label>
            <input type="text" v-model="titre" placeholder="Entrez le titre de l'ouvrage">


            <label for="resume">resume</label>
            <input type="text" v-model="resume" placeholder="Entrez le résumé du livre">

            <label for="extrait">extrait</label>
            <input type="text" v-model="extrait" placeholder="Entrez un extrait du livre">

            <label for="nbPages">nbPages</label>
            <input type="number" v-model="nbPages" placeholder="Entrez  le nombre de page">

            <label for="anneeEdition">anneeEdition</label>
            <input type="number" v-model="anneeEdition" placeholder="Entrez  l'anneeEdition">

            <label for="imageCouverture">image de couverture</label>
            <input type="text" v-model="imageCouverture" placeholder="Entrez l'image de couverture">
            <label for="categorie">categorie</label>
            <select v-model="categorie">
                <option v-for="categorie in categories" :key="categorie.idCategorie" :value="categorie.idCategorie">
                    {{ categorie.nom }}
                </option>
            </select>
            <select v-model="auteur">
                <option v-for="auteur in auteurs" :key="auteur.idAuteur" :value="auteur.idAuteur">
                    {{ auteur.nom }} {{ auteur.prenom }}
                </option>
            </select>
            <input class="ajouter" type="submit" value="Ajouter" />
        </form>
    </div>
</template>

<style scoped>
.addOuvrage {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

.addOuvrage h3 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.addOuvrage form {
    display: flex;
    flex-direction: column;
}

.addOuvrage label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.addOuvrage input[type="text"],
.addOuvrage input[type="number"],
.addOuvrage select {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
}

.addOuvrage input[type="text"]:focus,
.addOuvrage input[type="number"]:focus,
.addOuvrage select:focus {
    border-color: #007bff;
    outline: none;
}

.addOuvrage input[type="submit"] {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
}

.addOuvrage input[type="submit"]:hover {
    background-color: #0056b3;
}

.addOuvrage input[type="submit"]:active {
    background-color: #004494;
}
</style>
