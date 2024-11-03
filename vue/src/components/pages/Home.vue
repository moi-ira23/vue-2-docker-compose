<template>
    <PageLayout>
      <section class="p-16">
        Homepage
        <button @click="() => openHelpModal()">Open modal</button>
      </section>
      <section>
        <GridLayout />
      </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import GridLayout from "../grid/GridLayout";
import { helpModal } from "@/mixins/modals";

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    GridLayout
  }
}
</script>

<style>
</style>
