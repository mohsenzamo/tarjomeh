<template>
  <div v-if="soureh" class="soureh-box">
    <h1>{{ soureh.ar_name }}</h1>
    <br />
    <h2>{{ soureh.id }}</h2>
    <br />
    {{ store.fa }}
    <div v-if="soureh.id != 9" class="mohsen1Box">
      <div
        v-for="(item, index) in soureh.arabic_text"
        :key="index"
        class="mohsen1"
      >
        <a
          v-if="soureh.id == 1"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${
            soureh.id
          }00${index + 1}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index < 10"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${soureh.id}00${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index >= 10 && index < 100"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${soureh.id}0${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index >= 100"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${soureh.id}${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >

        <a
          v-if="soureh.id < 100 && soureh.id >= 10 && index < 10"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/0${soureh.id}00${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="
            soureh.id < 100 && soureh.id >= 10 && index >= 10 && index < 100
          "
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/0${soureh.id}0${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id < 100 && soureh.id >= 10 && index >= 100"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/0${soureh.id}${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >

        <a
          v-if="soureh.id >= 100 && index < 10"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/${soureh.id}00${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id >= 100 && index >= 10 && index < 100"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/${soureh.id}0${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id >= 100 && index >= 100"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/${soureh.id}${index}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <p :ref="pAr">
          {{ item }}
          <span v-if="index > 0">(({{ index }}))</span>
        </p>
        <p class="mohsenfarsi">
          <span v-if="store.fa == 'ansarian'" style="color: green">{{
            soureh.fa_ansarian_text[index - 1]
          }}</span>
          <span v-if="store.fa == 'makarem'" style="color: blue">{{
            soureh.fa_makarem_text[index - 1]
          }}</span>
          <span v-if="store.fa == 'maleki'" style="color: red">{{
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
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index < 9"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${
            soureh.id
          }00${index + 1}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index == 9"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${
            soureh.id
          }0${index+1}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index >= 10 && index < 99"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${
            soureh.id
          }0${index + 1}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index == 99"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${
            soureh.id
          }${index+1}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <a
          v-if="soureh.id > 1 && soureh.id < 10 && index >= 100"
          @click.prevent="callaudio(index)"
          :href="`http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/00${soureh.id}${index+1}.mp3`"
          :ref="buttonhref"
          ><button>play</button></a
        >
        <p>
          {{ item }}
          <span>(({{ index + 1 }}))</span>
        </p>
        <p class="mohsenfarsi">
          <span v-if="store.fa == 'ansarian'" style="color: green">{{
            soureh.fa_ansarian_text[index]
          }}</span>
          <span v-if="store.fa == 'makarem'" style="color: blue">{{
            soureh.fa_makarem_text[index]
          }}</span>
          <span v-if="store.fa == 'maleki'" style="color: red">{{
            soureh.fa_maleki_text[index]
          }}</span>
          <span>(({{ index + 1 }}))</span>
        </p>
      </div>
    </div>
  </div>
  <div v-else class="loader-div">
    <span class="loader-div-span"></span>
  </div>
  <audio ref="audioElement1" controls style="background-color: red" onerror="alert('لطفا اتصال خود به اینترنت را بررسی کنید')"></audio>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />

  <div></div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store/index";
import Swal from "sweetalert2";

export default defineComponent({
  name: "Show",
  props: ["id"],
  components: {},
  setup() {
    function mohsen(){
alert('1wq');
    };
    const audioElement1 = ref<HTMLAudioElement>();

    let itemRefs: any = ref([]);
    const buttonhref = (el: any) => {
      if (el) {
        itemRefs.value.push(el);
      }
    };
    let pRefs: any = ref([]);
    const pAr = (el: any) => {
      if (el) {
        pRefs.value.push(el);
      }
    };
    function callaudio(aye: number) {
      let counter = aye;
      audioElement1.value!.src = itemRefs.value[aye].href;
      audioElement1.value!.play();
      // pRefs.value[aye]!.addClass("blueText")
      audioElement1.value!.addEventListener("ended", function () {
        counter++;
        if (counter <= itemRefs.value.length) {
          audioElement1.value!.src = itemRefs.value[counter].href;
          audioElement1.value!.play();
        }
      });
    }

    const store = useStore();

    const showJson = localStorage.getItem("faValue") || "ansarian";
    const faValueShow = ref(JSON.parse(showJson));

    return {
      faValueShow,
      store,
      callaudio,
      audioElement1,
      itemRefs,
      buttonhref,
      pRefs,
      pAr,
      mohsen,
    };
  },
  data() {
    return {
      soureh: null as any,
    };
  },
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
.blueText {
  color: blue !important;
}
</style>
