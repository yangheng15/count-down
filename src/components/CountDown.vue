<template>
    <div>
        <div>倒计时: {{ hours }}: {{ mins }}: {{ seconds }}</div>
        <button @click="stopCountDown">停止计时器</button>
    </div>
</template>

<script lang="ts">
/**
 * props 接受参数 duration（秒）isMilliSecond 是否是毫秒 默认是秒
 */
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
interface DurationFormatter {
    hh?: number;
    mm?: number;
    ss: number;
}
@Component
export default class CountDown extends Vue {
    private hours: number = 0;
    private mins: number = 0;
    private seconds: number = 0;
    private stop: boolean = false; // 切换tab 暂停定时器
    private startTime: number = 0;
    private endTime: number = 0;
    private finishStatus: boolean = false; // 默认未完成
    @Prop({ default: 60, type: Number }) duration!: number;
    @Prop({ default: false, type: Boolean }) isMilliSecond!: boolean; // 是否是毫秒

    private timer!: any;
    private resetTime: number = 0;

    get time() {
        return this.isMilliSecond ? Math.round(+this.duration / 1000) : this.duration; // 转换为毫秒
    }

    mounted(): void {
        // 第一次执行
        this.countDown();
        // 监听tab切换事件
        window.addEventListener('visibilitychange', this.onVisibilityChange);
    }

    unmounted(): void {
        window.removeEventListener('visibilitychange', this.onVisibilityChange);
    }

    /** 切换浏览器tab 暂定定时器 切换回来时减去时间差 继续继续倒计时 */
    private onVisibilityChange() {
        this.stop = !this.stop;
        if (this.stop) { //关闭状态
            this.startTime = Date.now();
        } else if(this.resetTime) {
            // 打开定时器
            this.endTime = Date.now();
            const time = this.resetTime - Math.round((this.endTime - this.startTime) / 1000);
            console.log(this.resetTime,  Math.round((this.endTime - this.startTime) / 1000));
            this.getTime(time);
        }
    }

    private countDown() {
        this.getTime(this.time);
    }

    private getTime(time: number) {
        time && clearTimeout(this.timer);
        const { hh, mm, ss } = this.durationFormatter(time);
        this.hours = hh ?? 0;
        this.mins = mm ?? 0;
        this.seconds = ss;
        if (this.stop) {
            this.resetTime = time;
            clearTimeout(this.timer);
            this.timer = null;
            return;
        }
        time = time - 1;
        if (time < 0 && this.time !== 0) {
            this.hours = this.mins = this.seconds = 0;
            !this.finishStatus && this.$emit('countDownFinish');
            this.finishStatus = true;
            return;
        }
        this.timer = setTimeout(() => {
            this.getTime(time);
        }, 1000);
    }

    private stopCountDown() {
        this.stop = !this.stop;
    }

    @Watch('time')
    onTimeChange(newVal: number, oldVal: number) {
        // clearTimeout(this.timer);
        this.getTime(newVal);
    }

    private durationFormatter(time: number): DurationFormatter {
        if (!time) return { ss: 0 };
        const resetS = time % 60; // 剩余多少秒
        const allM = (time - resetS) / 60; // 当前时间 减去多出来的秒 等于整数的分钟
        if (allM < 1) return { ss: time };
        const resetM = allM % 60;
        const allH = (allM - resetM) / 60;
        if (allH < 1) return { mm: resetM, ss: resetS };
        else return { hh: allH, mm: resetM, ss: resetS };
    }
}
</script>

<style scoped></style>
