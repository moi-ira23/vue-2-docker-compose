<template>
    <button @click="onClick" class="button-like">
        <svg class ="icon-like" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path   
                :style="{'fill': likeStyle ? '#FF6633' : '#fff'}"
                fill-rule="evenodd" 
                d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" 
                clip-rule="evenodd"
            />
        </svg>
    </button>
</template>

<script>
export default {
    name: "ButtonLike",
    props: {
        likeStyle: Boolean
    },
    emits: ['click'],
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
}
</script>

<style>
.button-like {
    display: flex;
    justify-content: center;
    cursor: pointer; 
    border-radius: 5px;
    border: 0px;
    opacity: 0.8;
    padding: 2px;
}
.icon-like {
    width: 24px;
    height: 24px;
}
</style>