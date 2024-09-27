<!-- Header.vue -->
<template>
    <header>
        <div class="image-container">
            <img class="header-image" :src="logo">
            <nav>
                <RouterLink to="/">Accueil</RouterLink>
                <RouterLink to="/books">Livres</RouterLink>
                <RouterLink to="/DetailsLivre">Détails</RouterLink>
                <RouterLink to="/addLivre">Ajouter un livre</RouterLink>
            </nav>
        </div>

    </header>
</template>

<script>
import logo from '../assets/logo-livre.png'

export default {
    setup() {
        return { logo }
    }
}
</script>

<style scoped>
body {
    margin: 0px;
}

.image-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header {
    background-color: #64A9CE;
    padding: 10px;
    text-align: left;
}

.header-image {
    width: 40%;
}

nav {
    display: flex;
    justify-content: space-between;
    width: 30%;
    margin-right: 20px;
    font-family: Arial, Helvetica, sans-serif;
}

.nav-link {
    text-decoration: none;
    color: black;
}


.router-link-active {
    color: lightgreen;
    text-decoration: underline;
    font-style: italic;
}
</style>