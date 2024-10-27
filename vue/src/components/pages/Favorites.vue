<template>
    <PageLayout>
        <div class='favorites-page'>
            <CardItem v-for="item in getCatalog" :key="item.id" :item="item"/>
        </div>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout.vue';
import CardItem from '../parts/CardItem.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'FavoritesPage',
    components:{
        PageLayout,
        CardItem,
    },
    computed: {
        ...mapGetters('catalog', ['getCatalog']),
        ...mapGetters('favorites', ['getFavorites']),
    }
    
}
</script>

<style scoped lang="less">
.favorites-page {
    padding: 5%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    row-gap: 50px;
}
</style>