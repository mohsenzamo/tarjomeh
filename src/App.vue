<template>
  <div ref="gradientElement" class="app" :class="{ 'dark-back': darkValue }">
    <div id="myNav" class="overlay" :style="{ transform: overlayValue }">
      <a class="closebtn" @click="closeNav">&times;</a>
      <div class="overlay-content">
        <form class="setting-box">
          <div class="dark-toggle">
            <input type="checkbox" id="toggle" v-model="darkValue" />
            <label for="toggle"></label>
            ansarian<input
              type="radio"
              name="fa"
              id="ansarian"
              value="ansarian"
              v-model="faValue"
            />
            makarem<input
              type="radio"
              name="fa"
              id="makarem"
              value="makarem"
              v-model="faValue"
            />
            maleki<input
              type="radio"
              name="fa"
              id="maleki"
              value="maleki"
              v-model="faValue"
            />
          </div>
        </form>
        <span class="fa">fa:{{ faValue }}</span>
      </div>
    </div>
    <div class="setting-icon">
      <span class="setting-icon-text" @click="openNav">[تنظیمات]</span>
      <span class="setting-icon-arrow">&#128314;</span>
    </div>
    <router-view />
    <div id="nav">
      <router-link to="/"
        ><button class="link-button">صفحه نخست</button></router-link
      >
      <router-link to="/list"
        ><button class="link-button">فهرست</button></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";


export default defineComponent({
  name: "App",
  setup() {
    

    let darkJson = localStorage.getItem("darkMode") || "false";
    const darkValue = ref(JSON.parse(darkJson));
    
    const gradientElement = ref<HTMLDivElement>();
    function liveGradient() {
      const colors = new Array(
        [62, 35, 255],
        [60, 255, 60],
        [255, 35, 98],
        [45, 175, 230],
        [255, 0, 255],
        [255, 128, 0]
      );
      let step = 0;
      let colorIndices = [0, 1, 2, 3];
      let gradientSpeed = 0.002;
      function updateGradient() {
        let c0_0 = colors[colorIndices[0]];
        let c0_1 = colors[colorIndices[1]];
        let c1_0 = colors[colorIndices[2]];
        let c1_1 = colors[colorIndices[3]];
        let istep = 1 - step;
        let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

        let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
        gradientElement.value!.style.background =
          "-webkit-gradient(linear, left top, right top, from(" +
          color1 +
          "), to(" +
          color2 +
          "))";
        gradientElement.value!.style.background =
          "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)";
        step += gradientSpeed;
        if (step >= 1) {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          colorIndices[1] =
            (colorIndices[1] +
              Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
          colorIndices[3] =
            (colorIndices[3] +
              Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
        }
      }
      return {
        interval: setInterval(updateGradient, 10),
      };
    }
    watchEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkValue.value));
    });
    watchEffect((onInvalidate) => {
      if (gradientElement.value != null && !darkValue.value) {
        const { interval } = liveGradient();
        onInvalidate(() => {
          clearInterval(interval);
        });
      }
    });

    let faJson = localStorage.getItem("faValue") || '"ansarian"';
    let faValue = ref(JSON.parse(faJson));
    watchEffect(() => {
      localStorage.setItem("faValue", JSON.stringify(faValue.value));
    });

    let overlayValue = ref("translateX(-100%)");
    function openNav() {
      overlayValue.value = "translateX(0%)";
    }
    function closeNav() {
      overlayValue.value = "translateX(-100%)";
    }
    return {
      darkValue,
      gradientElement,
      faValue,
      openNav,
      closeNav,
      overlayValue,
    };
  },
});
</script>
