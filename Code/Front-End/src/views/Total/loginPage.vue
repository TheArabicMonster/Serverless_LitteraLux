<script>
import axios from 'axios'
export default {
    components: {

    },
    data() {
        return {

        }

    },
    methods: {
        async Connexion(event) {
            event.preventDefault() // Empêche le formulaire de se soumettre normalement
            try 
            {
                const response = await axios.post(`http://localhost:3000/api/login`, {
                    pseudo: this.username,
                    motDePasse: this.password
                })
                console.log("response :", response)
            } 
            catch (error) 
            {
                console.error(error)
            }
        }
    }
}
</script>

<template>
    <section class="section1">
        <img src="../../assets/logoLogin.png" alt="Logo">
        <h1>Connectez-vous</h1>
        <form @submit="Connexion()">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" v-model="username" placeholder="Entrez votre nom d'utilisateur">
            <label for="password">Mot de passe</label>
            <input type="password" v-model="password" placeholder="Entrez votre mot de passe">
            <input class="btnConnexion" type="submit" />
        </form>
    </section>
</template>

<style scoped>
body {
    background-color: aqua;
}

.section1 {
    background-color: rgb(115, 154, 175);
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    color: black;
}

label {
    display: block;
}

input {
    width: 15%;
    height: 30px;
}

h1 {
    margin-top: 5%;
    margin-bottom: 2%;

}

.btnConnexion {
    display: block;
    margin: auto;
    width: 10%;
    margin-top: 1%;

}
</style>