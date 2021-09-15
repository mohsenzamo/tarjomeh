<template>
  <div v-if="quran_name.length" class="box">
    <table class="box-table">
      <thead class="box-table-thead">
        <tr>
          <th>شماره</th>
          <th>اسم عربی</th>
          <th>اسم فارسی</th>
          <th>مکیه یا مدینه</th> 
          <th>آیات</th>
          <th>جزء</th>
        </tr>
      </thead>
      <tbody class="box-table-tbody">
        <tr
          v-for="item in quran_name"
          :key="item.id"
          @click="showLink(item.id, item.ar_name)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.ar_name }}</td>
          <td>{{ item.pa_name }}</td>
          <td v-if="item.mkORmd">مکیه</td>
          <td v-else>مدینه</td>
          <td>{{ item.ayats }}</td>
          <td>{{ item.part }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="loader-div">
    <span class="loader-div-span"></span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "List",
  components: {},
  data() {
    return {
      input_x: 0,
      input_value: "",
      quran_name: [] as any,
    };
  },
  methods: {
    showLink(soureh_id: number, soureh_name: string) {
      this.$router.push({
        name: "Show",
        params: { id: soureh_id, name: soureh_name },
      });
    },
  },
  mounted() {
    fetch("http://localhost:3000/quran_name")
      .then((res) => res.json())
      .then((data) => (this.quran_name = data))
      .catch((err) => console.log(err.message));
  },
});
</script>
<style lang="scss">
@import "../assets/scss/__list.scss";
</style>
