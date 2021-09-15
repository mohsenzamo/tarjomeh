<template>
  <div v-if="soureh" class="soureh-box">
    <h1>{{ soureh.ar_name }}</h1>
    <br />
    <h2>{{ soureh.id }}</h2>
    <br />
    <div v-if="soureh.id != 9" class="mohsen1Box">
      <div
        v-for="(item, index) in soureh.arabic_text"
        :key="index"
        class="mohsen1"
      >
        <p>
          {{ item }}
          <span v-if="index > 0">(({{ index }}))</span>
        </p>
        {{ faValueShow }}
        <p class="mohsenfarsi">
          <span v-if="faValueShow == 'ansarian'" style="color:green">{{
            soureh.fa_ansarian_text[index - 1]
          }}</span>
          <span v-if="faValueShow == 'makarem'" style="color:blue">{{
            soureh.fa_makarem_text[index - 1]
          }}</span>
          <span v-if="faValueShow == 'maleki'" style="color:red">{{
            soureh.fa_maleki_text[index - 1]
          }}</span>
          <span v-if="index > 0">(({{ index }}))</span>
        </p>
      </div>
    </div>
    <div v-else class="mohsen2Box">
      <div
        v-for="(item, index) in soureh.arabic_text"
        :key="index"
        class="mohsen2"
      >
        <p>
          {{ item }}
          <span>(({{ index + 1 }}))</span>
        </p>
        <p class="mohsenfarsi">
          {{ soureh.fa_ansarian_text[index] }}
          <span>(({{ index + 1 }}))</span>
        </p>
      </div>
    </div>
  </div>
  <div v-else class="loader-div">
    <span class="loader-div-span"></span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
// import { useStore } from '../store/index';

export default defineComponent({
  name: "Show",
  props: ["id"],
  components: {},
  setup() {
    // const store = useStore()

    const showJson = localStorage.getItem("faValue") || "ansarian";
    const faValueShow = ref(JSON.parse(showJson));
    return {
      faValueShow,
      // store,
    };
  },
  data() {
    return {
      soureh: null as any
    };
  },
  methods: {},
  mounted() {
    fetch("http://localhost:3000/all_quran/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.soureh = data))
      .catch((err) => console.log(err.message));
  },
});
</script>
<style lang="scss">
@import "../assets/scss/__show.scss";
</style>
