<script>
export default {
    name: 'Banniere',
}
</script>

<template>
    <section class="banniere">
        <div class="rec rec1"></div>
        <div class="rec rec2">
            <h2 class="text1">Qui sommes-nous ?</h2>
            <p class="text2">Ce site offre une plateforme conviviale pour les passionnés de lecture. Les utilisateurs peuvent découvrir de nouveaux ouvrages, ajouter, modifier ou supprimer des livres, et partager leurs appréciations.</p>
        </div>
        <div class="rec rec3"></div>
    </section>
</template>

<style scoped>
.banniere {
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 4fr 5fr;
    gap: 20px; /* Ajout d'un espacement entre les colonnes */
    margin-bottom: 100px;
}

.rec {
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease; /* Ajout d'une transition */
}

.rec2:hover {
    transform: scale(1.05); /* Effet au survol */
}

.rec1, .rec3 {
    background-color: #269968;
}

.rec2 {
    background-color: #4BCC95;
    padding: 20px;
    display: flex;
    flex-direction: column; /* Disposition en colonne */
    justify-content: flex-start; /* Alignement en haut */
    align-items: flex-start; /* Alignement à gauche */
    height: auto;
}

.text1 {
    font-size: 30px;
    margin-bottom: 10px; /* Espacement réduit entre le titre et le paragraphe */
    color: black;
}

.text2 {
    color: black;
    font-size: 18px; /* Taille de police ajustée pour une meilleure lisibilité */
    text-align: left; /* Alignement à gauche du texte */
}

@media (max-width: 768px) {
    .banniere {
        grid-template-columns: 1fr;
    }

    .rec {
        height: auto;
        margin-bottom: 20px;
    }

    .text1 {
        font-size: 24px;
    }

    .text2 {
        font-size: 16px;
    }
}
</style>
