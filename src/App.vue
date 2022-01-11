<template>
    <div id="app">
        <count-down :duration="duration" @countDownFinish="countDownFinish"></count-down>
        <button @click="onChangeTime">改变为一分钟</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CountDown from './components/CountDown.vue';

@Component({
    components: {
        CountDown,
    },
})
export default class App extends Vue {
    duration: number = 30
    onChangeTime() {
        this.duration = 20;
    }
    countDownFinish() {
        console.log('完成了')
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
