<template>
  <div class="home">
    <img
      @mousemove="mousemove"
      @mouseleave="mouseleave"
      @mouseenter="mouseenter"
      class="logo"
      alt="بسم الله الرحمن رحیم"
      src="../assets/img/Allah.png"
      :style="{ transform: imgtransform, transition: imgtransition }"
    />
    <form class="form-wrapper">
      <input v-model="input_value" type="text" placeholder="اسم سوره ..." />
      <button type="button" @click="search">
        <span class="button-icon">&#128269;</span>
        <span class="button-text">جستجو</span>
      </button>
    </form>
    <p class="popularity-title">«سوره های پربازدید»</p>
    <div class="popularity-box">
      <div
        class="popularity-div"
        @click="push(max1Popularity.id, max1Popularity.ar_name)"
      >
        <p class="popularity-name">
          سوره : <span>{{ max1Popularity.ar_name }}</span>
        </p>
        <p class="popularity-number">
          شماره : <span>{{ max1Popularity.id }}</span>
        </p>
      </div>
      <div
        class="popularity-div"
        @click="push(max2Popularity.id, max2Popularity.ar_name)"
      >
        <p class="popularity-name">
          سوره : <span>{{ max2Popularity.ar_name }}</span>
        </p>
        <p class="popularity-number">
          شماره : <span>{{ max2Popularity.id }}</span>
        </p>
      </div>
      <div
        class="popularity-div"
        @click="push(max3Popularity.id, max3Popularity.ar_name)"
      >
        <p class="popularity-name">
          سوره : <span>{{ max3Popularity.ar_name }}</span>
        </p>
        <p class="popularity-number">
          شماره : <span>{{ max3Popularity.id }}</span>
        </p>
      </div>
      <div
        class="popularity-div"
        @click="push(max4Popularity.id, max4Popularity.ar_name)"
      >
        <p class="popularity-name">
          سوره : <span>{{ max4Popularity.ar_name }}</span>
        </p>
        <p class="popularity-number">
          شماره : <span>{{ max4Popularity.id }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";

export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    let input_x = ref(0);
    const store = useStore();
    let input_value = ref("");
    let quran_name = ref(store.all_quran);
    function push(id: number, ar_name: string) {
      router.push({
        name: "Show",
        params: {
          id: id,
        },
      });
    }
    const stringifyQuranName = JSON.stringify(store.quran_name);
    let nameValue = localStorage.getItem("quran_name") || stringifyQuranName;
    let name = ref(JSON.parse(nameValue));
    function search() {
      if (input_value.value == "") {
        Swal.fire({
          icon: "warning",
          title: "خطا!",
          text: "لطفا اسم سوره را وارد کنید",
          showCloseButton: true,
          showConfirmButton: false,
        });
      } else {
        for (let i = 0; i < 114; i++) {
          if (
            input_value.value == quran_name.value[i].ar_name ||
            input_value.value == quran_name.value[i].pa_name
          ) {
            input_x.value = 1;
            name.value[i].popularity++;
            router.push({
              name: "Show",
              params: {
                id: quran_name.value[i].id,
                name: quran_name.value[i].ar_name,
              },
            });
          }
        }
        if (input_x.value == 0) {
          Swal.fire({
            icon: "error",
            title: "خطا!",
            text: "اسم مورد نظر یافت نشد",
            showCloseButton: true,
            showConfirmButton: false,
          });
        }
      }
    }
    watchEffect(() => {
      localStorage.setItem("quran_name", JSON.stringify(name.value));
      store.quran_name = name.value;
    });
    let imgtransform = ref("");
    let imgtransition = ref("");
    function mousemove(event: any) {
      let x = window.innerWidth / 10;
      let y = window.innerHeight / 10;
      let x1 = x - event.pageX;
      let y1 = y - event.pageY;
      imgtransform.value = `translate(${x1 / 20}px,${y1 / 20}px)`;
    }
    function mouseleave() {
      imgtransform.value = `translate(0px,0px)`;
      imgtransition.value = "all 1s ease";
    }
    function mouseenter() {
      imgtransition.value = "none";
    }
    const stringifymax1Popularity = JSON.stringify(store.quran_name[0]);
    let max1PopularityJSON =
      localStorage.getItem("max1Popularity") || stringifymax1Popularity;
    let max1Popularity = ref(JSON.parse(max1PopularityJSON));

    const stringifymax2Popularity = JSON.stringify(store.quran_name[1]);
    let max2PopularityJSON =
      localStorage.getItem("max2Popularity") || stringifymax2Popularity;
    let max2Popularity = ref(JSON.parse(max2PopularityJSON));

    const stringifymax3Popularity = JSON.stringify(store.quran_name[2]);
    let max3PopularityJSON =
      localStorage.getItem("max3Popularity") || stringifymax3Popularity;
    let max3Popularity = ref(JSON.parse(max3PopularityJSON));

    const stringifymax4Popularity = JSON.stringify(store.quran_name[3]);
    let max4PopularityJSON =
      localStorage.getItem("max4Popularity") || stringifymax4Popularity;
    let max4Popularity = ref(JSON.parse(max4PopularityJSON));
    watchEffect(() => {
      localStorage.setItem("max1Popularity", JSON.stringify(name.value[113]));
      localStorage.setItem("max2Popularity", JSON.stringify(name.value[112]));
      localStorage.setItem("max3Popularity", JSON.stringify(name.value[111]));
      localStorage.setItem("max4Popularity", JSON.stringify(name.value[110]));
    });
    function selectionSort() {
      let n = 114;
      for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
          if (name.value[j].popularity < name.value[min].popularity) {
            min = j;
          }
        }
        if (min != i) {
          let tmp = name.value[i];
          name.value[i] = name.value[min];
          name.value[min] = tmp;
        }
      }
    }

    selectionSort();
    return {
      selectionSort,
      push,
      max1Popularity,
      max2Popularity,
      max3Popularity,
      max4Popularity,
      mouseenter,
      mouseleave,
      imgtransform,
      imgtransition,
      search,
      input_x,
      input_value,
      quran_name,
      mousemove,
    };
  },
});
</script>
<style lang="scss">
@import "../assets/scss/__home.scss";
</style>
