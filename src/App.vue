<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="container">
        <button @click="this.visiable = true">显示隐藏</button>
    </div>
    <Modal v-model="visiable" title="Modal标题" @ok="ok" :mask-closable="false" :zIndex="1001">
        <p>这是modal content部分</p>
        <p>这是modal content部分</p>
        <p>这是modal content部分</p>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "./components/modal/src/modal.vue";

export default defineComponent({
    name: "App",
    components: {
        Modal,
    },
    data() {
        return {
            visiable: false,
        };
    },
    methods: {
        ok() {
            console.log("ok");
            // this.visiable = false;
        },
    },
});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
.container {
    width: 800px;
    margin: 0 auto;
}
</style>
