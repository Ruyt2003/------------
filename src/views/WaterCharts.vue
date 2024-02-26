<template>
    <div class="wa-left" style="margin-top: 10px">
        <Panel2 style="margin-bottom: 25px">
            <template v-slot:header>彩虹桥西排水泵站</template>
            <template v-slot:number>2.55</template>
        </Panel2>
        <Panel2 style="margin-bottom: 25px">
            <template v-slot:header>科学大道西排水泵站</template>
            <template v-slot:number>3.89</template>
        </Panel2>
        <Panel2 style="margin-bottom: 25px">
            <template v-slot:header>紫荆山排水泵站</template>
            <template v-slot:number>2.31</template>
        </Panel2>
        <Panel2 style="margin-bottom: 25px">
            <template v-slot:header>农业路西排水泵站</template>
            <template v-slot:number>3.12</template>
        </Panel2>
        <Panel2 style="margin-bottom: 25px">
            <template v-slot:header>东风立交排水泵站</template>
            <template v-slot:number>1.78</template>
        </Panel2>
        <Panel2 style="margin-bottom: 25px">
            <template v-slot:header>科学大道东排水泵站</template>
            <template v-slot:number>2.96</template>
        </Panel2>
        <img src="../assets/0036.png" alt="" class="next" />
    </div>

    <!-- <div class="wa-right">
        <Panel3 style="margin-bottom: 25px">
            <template v-slot:site>彩虹桥西泵站</template>
            <template v-slot:number>18.55</template>
        </Panel3>
    </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Panel2 from '../components/Panel2.vue';
import Panel3 from '../components/Panel3.vue';
</script>

<style scoped>
.wa-left {
    position: absolute;
    left: 35px;
    top: 100px;
    width: 25vw;
}

.wa-right {
    position: absolute;
    left: 285px;
    top: 110px;
    width: 25vw;
}

.next {
    width: 50px;
    position: relative;
    left: 6vw;
    top: -2vh;
}
</style>
