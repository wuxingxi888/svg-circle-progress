<template>
    <div class="progress">
        <svg :style="{ transform: clockWise ? 'rotateY(0deg)' : 'rotateY(180deg)' }" xmlns="http://www.w3.org/2000/svg"
            width="100%" height="100%" viewBox="0 0 400 400">
            <!-- 定义渐变色 -->
            <defs v-if="showGradient">
                <linearGradient :id="gradient.id" :x1="gradient.x1" :y1="gradient.y1" :x2="gradient.x2"
                    :y2="gradient.y2">
                    <stop v-for="(item, index) in gradient.colorStops" :key="index" :offset="item.offset"
                        :stop-color="item.color" />
                </linearGradient>
            </defs>
            <defs>
                <radialGradient id="c_center" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.2" />
                    <stop offset="0%" style="stop-color:rgb(254,236,242);stop-opacity:0.44" />
                    <stop offset="100%" style="stop-color:#FCC3D7;stop-opacity:1" />
                </radialGradient>
            </defs>
            <!-- 底部背景圆环 -->
            <circle cx="200" cy="200" :r="radius" :stroke="bgRingColor" :stroke-width="strokeWidth" fill="none" />
            <!-- 进度条圆环 -->
            <circle class="progress-bar" cx="200" cy="200" :r="radius"
                :stroke="showGradient ? `url(#${gradient.id})` : ringColor" :stroke-width="strokeWidth"
                :stroke-linecap="strokeLinecap" fill="none" transform="rotate(-90, 200, 200)"
                :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" />

            <circle cx='200' cy='200' :r='radius - 25' fill="url(#c_center)"></circle>
            <!-- 环形分割细线 -->
            <circle cx="200" cy="200" :r="radius" stroke="#ffffff" fill="transparent" :stroke-width="strokeWidth + 2"
                :stroke-dasharray="strokeDasharray1" transform="rotate(-90, 200, 200)"></circle>
        </svg>
        <!-- 中间描述文字 -->
        <div class="progress-desc">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "Progress",
    props: {
        rate: { // 进度百分比
            type: Number,
            default: 0,
        },
        bgRingColor: { // 进度背景颜色
            type: String,
            default: "#25b489",
        },
        ringColor: { // 中间进度条颜色
            type: String,
            default: "#67C23A",
        },
        centerColor: {  // 中间颜色
            type: String,
            default: "#67C23A",
        },
        strokeLinecap: { // 描边符号
            type: String,
            default: "round",
        },
        strokeWidth: { // 进度块的宽度
            type: Number,
            default: 20,
        },
        part: { // 进度块的长度
            type: Number,
            default: 20,
        },
        partGap: {  // 进度块的间隔
            type: Number,
            default: 12,
        },
        showGradient: { // 是否显示渐变
            type: Boolean,
            default: false,
        },
        clockWise: {  // 是否旋转
            type: Boolean,
            default: true,
        },
        gradient: { // 渐变色
            type: Object,
            default: () => {
                return {
                    id: "svg-linear-gradient",
                    x1: "0%",
                    y1: "10%",
                    x2: "70%",
                    y2: "100%",
                    colorStops: [
                        {
                            offset: "0%",
                            color: "yellow",
                        },
                        {
                            offset: "100%",
                            color: "red",
                        },
                    ],
                };
            },
        },
    },
    computed: {
        radius() {
            return 200 - this.strokeWidth / 2;
        },
        strokeDasharray() {
            let value = 0;
            /* 
              当stroke-linecap的值为round时，结尾处会向外延伸描边宽度的一半
              首尾两个端点，所以就是描边的宽度
            */
            if (this.strokeLinecap === "round") {
                value = 2 * Math.PI * this.radius + this.strokeWidth;
            } else {
                value = 2 * Math.PI * this.radius;
            }
            return value;
        },
        strokeDashoffset() {
            let val = 0;
            let rate = this.rate;
            if (rate > 1) {
                rate = 1;
            } else if (rate < 0) {
                rate = 0;
            }
            if (this.strokeLinecap === "round") {
                val = 2 * Math.PI * this.radius * (1 - rate) + this.strokeWidth;
            } else {
                val = 2 * Math.PI * this.radius * (1 - rate);
            }
            return val;
        },
        strokeDasharray1() {
            var partLength = (2 * Math.PI * this.radius) / this.part;
            return `${this.partGap} ${partLength - this.partGap}`;
        },
    },
};
</script>
<style scoped>
.progress {
    position: relative;
    width: 100%;
    height: 100%;
}

.progress-desc {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #F44A7A;
}

.progress-bar {
    transition: stroke-dashoffset 2s ease;
}
</style>