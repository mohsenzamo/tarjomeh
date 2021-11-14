<template>
  <div v-if="soureh" class="show-box">
    <div v-if="soureh.id != 9" class="soureh-Box">
      <div v-for="(item, index) in soureh.arabic_text" :key="index">
        <p class="soureh-box-ar">
          {{ item }}
          <span v-if="index > 0">(({{ index }}))</span>
        </p>
        <p class="soureh-box-fa">
          <span v-if="store.fa == 'ansarian'">{{
            soureh.fa_ansarian_text[index - 1]
          }}</span>
          <span v-if="store.fa == 'makarem'">{{
            soureh.fa_makarem_text[index - 1]
          }}</span>
          <span v-if="store.fa == 'maleki'">{{
            soureh.fa_maleki_text[index - 1]
          }}</span>
          <span v-if="index > 0">(({{ index }}))</span>
        </p>
        <div class="soureh-box-au">
          <a @click.prevent="callAudio(soureh.id, index)" class="playBut">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
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
          <div
            v-if="shareShow"
            class="demo"
            @click="share(soureh.ar_name, index, item)"
          >
            <div class="demo__open-btn">&#9993;</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="soureh-Box">
      <div v-for="(item, index) in soureh.arabic_text" :key="index">
        <p class="soureh-box-ar">
          {{ item }}
          <span>(({{ index + 1 }}))</span>
        </p>
        <p class="soureh-box-fa">
          <span v-if="store.fa == 'ansarian'">{{
            soureh.fa_ansarian_text[index]
          }}</span>
          <span v-if="store.fa == 'makarem'">{{
            soureh.fa_makarem_text[index]
          }}</span>
          <span v-if="store.fa == 'maleki'">{{
            soureh.fa_maleki_text[index]
          }}</span>
          <span>(({{ index + 1 }}))</span>
        </p>
        <div class="soureh-box-au">
          <a @click.prevent="callAudio(soureh.id, index)" class="playBut">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
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
          <div
            v-if="shareShow"
            class="demo"
            @click="share(soureh.ar_name, index, item)"
          >
            <div class="demo__open-btn">&#9993;</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="audioSrc != null" class="audio-box">
      <div class="audio-box-audio">
        <audio
          ref="audioElement1"
          :src="audioSrc"
          @canplay="setmaxSeek"
          @error="error"
          @ended="callAudioEnded(soureh.id)"
          @timeupdate="seekUpdate"
        ></audio>
        <div class="audio-play">
          <button v-if="playValue == 1" @click="play">&#9199;</button>
          <button v-if="playValue == 0" @click="play">&#9208;</button>
          <input
            ref="seekSlider"
            type="range"
            min="0"
            :max="maxSeek"
            v-model="seekValue"
            step="1"
            @mousedown="seekDown"
            @mousemove="seekMove"
            @mouseup="seekUp"
          />
        </div>
        <div class="audio-volume">
          <button v-if="muteValue == 1" @click="muted">&#128266;</button>
          <button v-if="muteValue == 0" @click="muted">&#128264;</button>
          <input
            type="range"
            min="0"
            max="100"
            v-model="volumeValue"
            step="1"
            @mousemove="setVolume"
          />
        </div>
      </div>
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
  setup(props) {
    let shareShow = ref<boolean>(false);
    function shareTest() {
      if ('share' in navigator) {
        shareShow.value = true;
      }
    }
    shareTest();
    function share(name: string, id: number, ar_text: string) {
      if (navigator.share) {
        let url = window.location.pathname;
        navigator
          .share({
            title: `${name}/${id}`,
            url: `${url}`,
            text: `${ar_text}`,
          })
          .catch(console.error);
      } else {
        
      }
    }
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
    const store = useStore();
    const audioElement1 = ref<HTMLAudioElement>();
    const seekSlider = ref<HTMLInputElement>();
    let audioSrc = ref<string>();
    let counter = ref<number>(0);
    let playValue = ref(1);
    let muteValue = ref(1);
    let seekValue = ref(0);
    let maxSeek = ref();
    let seeking = ref();
    let volumeValue = ref(100);
    function play() {
      if (audioElement1.value!.paused) {
        audioElement1.value!.play();
        playValue.value = 0;
      } else {
        audioElement1.value!.pause();
        playValue.value = 1;
      }
    }
    function seekUp() {
      seeking.value = false;
    }
    function seekMove(event: any) {
      seek(event);
    }
    function seekDown(event: any) {
      seeking.value = true;
      seek(event);
    }
    function seek(event: any) {
      if (seeking.value == true) {
        seekValue.value = event.clientX - seekSlider.value!.offsetLeft;
        let seekto = audioElement1.value!.duration * (seekValue.value / 100);
        audioElement1.value!.currentTime = seekto;
      }
    }
    function muted() {
      if (audioElement1.value!.muted == true) {
        audioElement1.value!.muted = false;
        muteValue.value = 1;
      } else {
        audioElement1.value!.muted = true;
        muteValue.value = 0;
      }
    }
    function setmaxSeek() {
      maxSeek.value = audioElement1.value!.duration;
    }
    function setVolume() {
      audioElement1.value!.volume = volumeValue.value / 100;
      if (volumeValue.value == 0) {
        muteValue.value = 0;
      } else {
        muteValue.value = 1;
      }
    }
    function seekUpdate() {
      seekValue.value = audioElement1.value!.currentTime;
    }
    let qaValue: any = ref();
    function callAudio(id: number, aye: number) {
      qaValue.value = store.qa;
      if (id == 1 || id == 9) {
        aye++;
      }
      let z = id.toString().padStart(3, "0");
      let r = aye.toString().padStart(3, "0");
      audioSrc.value = `http://www.everyayah.com/data/${qaValue.value}/${z}${r}.mp3`;
      nextTick(() => {
        audioElement1.value!.play();
        playValue.value = 0;
      });
      counter.value = aye;
    }
    function callAudioEnded(id: number) {
      qaValue.value = store.qa;
      if (id == 1) {
        let z = id.toString().padStart(3, "0");
        counter.value!++;
        let r: any = counter.value!;
        let b = soureh.value!.arabic_text.length;
        if (r <= b) {
          r = r.toString().padStart(3, "0");
          audioSrc.value = `http://www.everyayah.com/data/${qaValue.value}/${z}${r}.mp3`;
          nextTick(() => {
            audioElement1.value!.play();
            playValue.value = 0;
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

    type mohsen = {
      id: number;
      ar_name: string;
      pa_name: string;
      part: number[];
      arabic_text: string[];
      fa_ansarian_text: string[];
      fa_makarem_text: string[];
      fa_maleki_text: string[];
      mkORmd: boolean;
    };
    const showJson = localStorage.getItem("faValue") || "ansarian";
    const faValueShow = ref(JSON.parse(showJson));
    let soureh = ref<mohsen>({
      id: 1,
      ar_name: "الحمد",
      pa_name: "ستایش",
      part: [1],
      mkORmd: true,
      arabic_text: [
        "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَـٰنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      ],
      fa_ansarian_text: [
        "همه ستایش ها، ویژه خدا، مالک و مربّی جهانیان است.",
        "رحمتش بی اندازه و مهربانی اش همیشگی است.",
        "مالک و فرمانروای روز پاداش و کیفر است.",
        "[پروردگارا!] تنها تو را می پرستیم وتنها از تو کمک می خواهیم.",
        "ما را به راهِ راست راهنمایی کن.",
        "راه کسانی [چون پیامبران، صدّیقان، شهیدان و صالحان که به خاطر لیاقتشان] به آنان نعمتِ [ایمان، عمل شایسته و اخلاق حسنه] عطا کردی، هم آنان که نه مورد خشم تواند و نه گمراه اند.",
      ],
      fa_makarem_text: [
        "ستایش مخصوص خداوندی است که پروردگار جهانیان است.",
        "(خداوندی که) بخشنده و بخشایشگر است (و رحمت عام و خاصش همگان را فرا گرفته).",
        "(خداوندی که) مالک روز جزاست.",
        "(پروردگارا!) تنها تو را می‌پرستیم؛ و تنها از تو یاری می‌جوییم.",
        "ما را به راه راست هدایت کن...",
        "راه کسانی که آنان را مشمول نعمت خود ساختی؛ نه کسانی که بر آنان غضب کرده‌ای؛ و نه گمراهان.",
      ],
      fa_maleki_text: [
        "خدا را سپاس که صاحب‌اختیار جهانیان است",
        "بزرگوارِ مهربان است",
        "صاحب روز جزاست",
        "فقط تو را بندگی می‌کنیم و در این راه فقط از تو کمک می‌خواهیم",
        "ما را به راه درست زندگی ببر:",
        "راه کسانی که به آنان نعمت ویژه ای داده ای.<br>همانانی که نه گرفتار خشم تو شده‌اند و نه راه را گم کرده‌اند.",
      ],
    });
    onMounted(() => {
      for (let i = 0; i < 114; i++) {
        if (store.all_quran[i].id == props.id) {
          soureh.value = store.all_quran[i];
        }
      }
    });
    return {
      shareShow,
      share,
      setmaxSeek,
      maxSeek,
      seekUpdate,
      seekUp,
      seekMove,
      seekDown,
      seekSlider,
      volumeValue,
      seekValue,
      setVolume,
      playValue,
      muteValue,
      muted,
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
