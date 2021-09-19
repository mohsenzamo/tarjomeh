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
        <div class="container">
          <a @click.prevent="callAudio(soureh.id, index)" class="playBut">
            <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In  -->
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
              x="0px"
              y="0px"
              width="213.7px"
              height="213.7px"
              viewBox="0 0 213.7 213.7"
              enable-background="new 0 0 213.7 213.7"
              xml:space="preserve"
            >
              <polygon
                class="triangle"
                id="XMLID_18_"
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                points="
	73.5,62.5 148.5,105.8 73.5,149.1 "
              />

              <circle
                class="circle"
                id="XMLID_17_"
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                cx="106.8"
                cy="106.8"
                r="103.3"
              />
            </svg>
          </a>
        </div>
        <p>
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
        <div class="container">
          <a @click.prevent="callAudio(soureh.id, index)" class="playBut">
            <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In  -->
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
              x="0px"
              y="0px"
              width="213.7px"
              height="213.7px"
              viewBox="0 0 213.7 213.7"
              enable-background="new 0 0 213.7 213.7"
              xml:space="preserve"
            >
              <polygon
                class="triangle"
                id="XMLID_18_"
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                points="
	73.5,62.5 148.5,105.8 73.5,149.1 "
              />

              <circle
                class="circle"
                id="XMLID_17_"
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                cx="106.8"
                cy="106.8"
                r="103.3"
              />
            </svg>
          </a>
        </div>
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

    <div class="audio-box">
      <div>
        <audio
          ref="audioElement1"
          controls
          :src="audioSrc"
          @error="error"
          @ended="callAudioEnded(soureh.id)"
        ></audio>
        <button @click="play">play</button>
      </div>
      <img
        src="https://i.picsum.photos/id/15/200/300.jpg?hmac=lozQletmrLG9PGBV1hTM1PnmvHxKEU0lAZWu8F2oL30"
        alt=""
      />
    </div>
  </div>
  <div v-else class="loader-div">
    <span class="loader-div-span"></span>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { useStore } from "../store/index";
import Swal from "sweetalert2";

export default defineComponent({
  name: "Show",
  props: ["id"],
  components: {},
  setup(props) {
    function error() {
      Swal.fire({
        icon: "warning",
        title: "خطا!",
        text: "اتصال خود را به اینترنت بررسی کنید",
        showCloseButton: true,
        showConfirmButton: false,
        background: "#999",
      });
    }
    const audioElement1 = ref<HTMLAudioElement>();

    let audioSrc = ref<string>(
      
    );
    let counter = ref<number>(0);
    function play() {
      audioElement1.value!.play();
    }
    function callAudio(id: number, aye: number) {
      if (id == 1 || id == 9) {
        aye++;
      }
      let z = id.toString().padStart(3, "0");
      let r = aye.toString().padStart(3, "0");
      audioSrc.value = `http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/${z}${r}.mp3`;
      nextTick(() => {
        audioElement1.value!.play();
      });
      counter.value = aye;
    }
    function callAudioEnded(id: number) {
      if (id == 1) {
        let z = id.toString().padStart(3, "0");
        counter.value!++;
        let r: any = counter.value!;
        let b = soureh.value!.arabic_text.length;
        if (r <= b) {
          r = r.toString().padStart(3, "0");
          audioSrc.value = `http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/${z}${r}.mp3`;
          nextTick(() => {
            audioElement1.value!.play();
          });
        }
      } else {
        let z = id.toString().padStart(3, "0");
        counter.value!++;
        let r: any = counter.value!;
        let b = soureh.value!.arabic_text.length;
        if (r < b) {
          r = r.toString().padStart(3, "0");
          audioSrc.value = `http://www.everyayah.com/data/Abdul_Basit_Murattal_192kbps/${z}${r}.mp3`;
          nextTick(() => {
            audioElement1.value!.play();
          });
        }
      }
    }
    const store = useStore();
    const showJson = localStorage.getItem("faValue") || "ansarian";
    const faValueShow = ref(JSON.parse(showJson));
    let soureh: any = ref(null);
    onMounted(() => {
      for (let i = 0; i < 114; i++) {
        if (store.all_quran[i].id == props.id) {
          soureh.value = store.all_quran[i];
          console.log(soureh.value);
        }
      }
    });
    return {
      play,
      audioSrc,
      faValueShow,
      store,
      callAudio,
      audioElement1,
      error,
      callAudioEnded,
      soureh,
    };
  },
});
</script>
<style lang="scss">
@import "../assets/scss/__show.scss";
.blueText {
  color: blue !important;
}
</style>
