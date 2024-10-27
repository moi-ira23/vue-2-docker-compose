<template>
    <PageLayout>
        <section class="catalog-page">
            <CardItem v-for="(item) in getCatalog" :key="item.id" :item="item" />
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import CardItem from '../parts/CardItem'
import { mapGetters } from 'vuex';

export default {
    name: 'CatalogPage',
    components: {
        PageLayout,
        CardItem,
    },
    computed: {
        ...mapGetters('catalog', [
            'getCatalog'
        ]),
    },
}
</script>

<style scoped lang="less">
.catalog-page {
    padding: 5%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    row-gap: 50px;
}
</style>