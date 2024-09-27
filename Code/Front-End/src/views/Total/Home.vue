<template>
    <section>
        <div>
            <div id="banniere">
                <Banniere />
            </div>
            <div id="recent">
                <OuvrageRecent />
            </div>
        </div>
    </section>
</template>

<script>
import Banniere from '../Partial/Banniere.vue'  
import OuvrageRecent from '../Partial/OuvrageRecent.vue'
export default {
  name: 'Home',
    components: {
        Banniere,
        OuvrageRecent
    }
}
</script>

<style scoped>
section{
    background-color: #739AAF;
}
#banniere{
    margin-top: 81px;
    width: 100%;
}
#recent{
    width: 100%;
}
</style>