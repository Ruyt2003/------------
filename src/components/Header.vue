<template>
    <header class="header">
        <div class="timer">
            <!-- 填充当前真实的日期和时间 -->
            <p id="date">{{ currentDate }}</p>
            <p id="time">{{ currentTime }}</p>
        </div>
        <span class="title">郑州市地下管网大数据平台</span>
        <article>
            <div class="text">
                <p v-for="(item, index) in news" :key="index">{{ item }}</p>
            </div>
        </article>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const news = ref([
    '郑州市启动地下管网改造工程，将提高城市排水能力',
    '郑州市地下管网建设取得显著成果，有效保障市民用水',
    '郑州市地下管网全面排查整治，确保城市安全运行',
    '郑州市地下管网智能化管理平台投入使用',
    '郑州市地下管网建设项目荣获全国优秀工程奖',
    '郑州市地下管网改造获批，进一步完善城市基础设施',
    '郑州市地下管网建设工程质量监督工作取得显著成效',
    '地下管网建设与环保部门紧密合作，共同保护水资源',
    '郑州市地下管网建设引入国际先进技术，提升工程质量',
]);
const text = ref(null);
const pHeight = ref(0);
const index = ref(0);

const currentDate = ref('');
const currentTime = ref('');

const updateTime = () => {
    const date = new Date();
    currentDate.value = date.toLocaleDateString();
    // 时间只显示到分
    currentTime.value = date.toLocaleTimeString().slice(0, -3);
};

onMounted(() => {
    // 获取当前日期和时间
    updateTime();
    // 每秒更新一次时间
    setInterval(updateTime, 1000);

    text.value = document.querySelector('.text');
      pHeight.value = text.value.querySelector('p').offsetHeight;

      setInterval(() => {
        index.value++;
        if (index.value >= news.value.length) {
          index.value = 0;
        }
        text.value.style.transition = 'all 1s';
        text.value.style.top = -index.value * pHeight.value + 'px';
      }, 6000);
});
</script>

<style>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-image: url('../assets/header.png');
    background-size: cover;
    background-position: center center;
    z-index: 2;
    text-align: center;
    line-height: 82px;
    font-size: 30px;
    color: #fff;
    font-family: clockicons, sans-serif, Georgia, Times, 'Times New Roman',
        serif;
    user-select: none;
}

.title {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
}

.timer {
    font-size: 20px;
    position: absolute;
    left: 90px;
    top: 37px;
    display: flex;
    flex-direction: column;
    line-height: 0;
    user-select: none;
}

.timer p:last-child {
    margin-top: 30px;
}

article {
    width: 200px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0) 000;
    font-size: 16px;
    overflow: hidden;
    position: absolute;
    top: 28px;
    right: 60px;
}
.text {
    position: absolute;
    top: 0;
}
article p {
    line-height: 25px;
    color: #ffffff;
    text-align: left;
}
</style>
