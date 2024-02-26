<template>
    <div>
        <SmartCity />
        <MapControl />
        <G2Charts v-if="G2Visible" />
        <WaterCharts v-if="WatVisible" />
        <BottomTools @controlCenter="controlCenter" />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';

import SmartCity from '../components/SmartCity.vue';
import MapControl from '../components/MapControl.vue';
import G2Charts from './G2Charts.vue';
import WaterCharts from './WaterCharts.vue';
import BottomTools from '../components/BottomTools.vue';

const G2Visible = ref(true);
const WatVisible = ref(false);

const controlCenter = () => {
    G2Visible.value = !G2Visible.value;
};
provide('controlCenter', controlCenter);

const waterCenter = () => {
    WatVisible.value = !WatVisible.value;
}
provide('waterCenter', waterCenter);

</script>

<style>
.openCity {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    position: fixed;
    bottom: 0px;
    right: 269px;
    z-index: 999;
    background-color: #fff;
    border:0;
    margin: 0;
    padding: 0 10px;
    cursor: pointer;
}
</style>
