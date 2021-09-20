<template>
  <div ref="gradientElement" class="app" :class="{ 'dark-back': darkValue }">
    <div id="myNav" class="overlay" :style="{ transform: overlayValue }">
      <a class="closebtn" @click="closeNav">&times;</a>
      <div class="overlay-content">
        <form class="setting-box">
          <div class="toggle-box">
            <div class="dark-box">
              <label class="dark-label" v-if="darkValue == false" for="toggle"
                >حالت روز:</label
              >
              <label class="dark-label" v-if="darkValue == true" for="toggle"
                >حالت شب:</label
              >
              <input type="checkbox" id="toggle" v-model="darkValue" />
              <label class="dark-checkbox" for="toggle"></label>
            </div>
            <div class="fa-box">
              <label class="fa-label">ترجمه:</label>
              <span class="fa-sapn">
                <input
                  type="radio"
                  id="ansarian"
                  name="fa"
                  value="ansarian"
                  v-model="faValue"
                />
                <label for="ansarian">انصاریان</label>
                <div class="check"></div>
              </span>
              <span class="fa-sapn">
                <input
                  type="radio"
                  id="makarem"
                  name="fa"
                  value="makarem"
                  v-model="faValue"
                />
                <label for="makarem">مکارم</label>
                <div class="check"></div>
              </span>
              <span class="fa-sapn">
                <input
                  type="radio"
                  id="maleki"
                  name="fa"
                  value="maleki"
                  v-model="faValue"
                />
                <label for="maleki">مالکی</label>
                <div class="check"></div>
              </span>
              <span class="select">
                <select v-model="faValue">
                  <option value="ansarian">انصاریان</option>
                  <option value="makarem">مکارم</option>
                  <option value="maleki">مالکی</option>
                </select>
              </span>
            </div>
            <div class="fa-box">
              <label class="fa-label">قاری:</label>
              <span class="fa-sapn">
                <input
                  type="radio"
                  id="AbdulBasit"
                  name="qa"
                  value="Abdul_Basit_Murattal_192kbps"
                  v-model="qaValue"
                />
                <label for="AbdulBasit">عبدالباسط</label>
                <div class="check"></div>
              </span>
              <span class="fa-sapn">
                <input
                  type="radio"
                  id="AbdullahBasfar"
                  name="qa"
                  value="Abdullah_Basfar_192kbps"
                  v-model="qaValue"
                />
                <label for="AbdullahBasfar">عبدالله بصفر</label>
                <div class="check"></div>
              </span>
              <span class="fa-sapn">
                <input
                  type="radio"
                  id="MuhammadAyyub"
                  name="qa"
                  value="Muhammad_Ayyoub_128kbps"
                  v-model="qaValue"
                />
                <label for="MuhammadAyyub">محمد ایوب</label>
                <div class="check"></div>
              </span>
              <span class="select">
                <select v-model="qaValue">
                  <option value="Abdul_Basit_Murattal_192kbps">عبدالباسط</option>
                  <option value="Abdullah_Basfar_192kbps">عبدالله بصفر</option>
                  <option value="Muhammad_Ayyoub_128kbps">محمد ایوب</option>
                </select>
                </span>
            </div>
          </div>
        </form>
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
import { useStore } from "./store/index";

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

    const store = useStore();
    let faJson = localStorage.getItem("faValue") || '"ansarian"';
    let faValue = ref(JSON.parse(faJson));
    watchEffect(() => {
      localStorage.setItem("faValue", JSON.stringify(faValue.value));
      store.fa = faValue.value;
    });

    let qaJson =
      localStorage.getItem("qaValue") || '"Abdul_Basit_Murattal_192kbps"';
    let qaValue = ref(JSON.parse(qaJson));
    watchEffect(() => {
      localStorage.setItem("qaValue", JSON.stringify(qaValue.value));
      store.qa = qaValue.value;
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
      qaValue,
      openNav,
      closeNav,
      overlayValue,
    };
  },
});
</script>
