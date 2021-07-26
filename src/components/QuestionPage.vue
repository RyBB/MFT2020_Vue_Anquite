<template>
  <div class="question">
    <h1>kintone知ってる？</h1>
    <p>足元のフットスイッチを踏んで答えてね！</p>
    <table class="question-table">
      <tr>
        <td class="icon">
          <img :src="icon.horse" />
        </td>
        <td class="icon">
          <img :src="icon.bird" />
        </td>
        <td class="icon">
          <img :src="icon.dog" />
        </td>
      </tr>
      <tr>
        <td>
          <div>【左】</div>
          <div>使ったことある</div>
        </td>
        <td>
          <div>【中央】</div>
          <div>聞いたことならある</div>
        </td>
        <td>
          <div>【右】</div>
          <div>初めて聞いた</div>
        </td>
      </tr>
    </table>

    <h1 class="thanks-text" v-if="thanks">アンケートありがとう！</h1>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "Question",
  data() {
    return {
      key: {
        a: "使ったことある",
        b: "聞いたことならある",
        c: "初めて聞いた"
      },
      icon: {
        horse:
          "https://cy-hwg.cybozu.com/k/api/space/blob/download.do/-/steamhorse.png?hash=5D427&id=1420&.png",
        bird:
          "https://cy-hwg.cybozu.com/k/api/space/blob/download.do/-/steambird.png?hash=82120&id=1418&.png",
        dog:
          "https://cy-hwg.cybozu.com/k/api/space/blob/download.do/-/steamdog.png?hash=E0E6C&id=1419&.png"
      },
      thanks: false,
      continuous: false
    };
  },
  mounted() {
    const vueData = this;

    window.addEventListener("keydown", async function(event) {
      try {
        if (event.key !== "a" && event.key !== "b" && event.key !== "c") {
          throw new Error("違うキーだったよ");
        }
        console.log(event.key);
        const resp = await vueData.postRecord(vueData, event.key);
        console.log(resp);

        vueData.thanks = true;
        vueData.continuous = true;
        setTimeout(() => {
          location.reload();
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    });
  },
  methods: {
    async postRecord(thisData, keyword) {
      if (thisData.continuous) {
        return;
      }
      const dt = DateTime.local();
      const app = 11;
      const record = {
        question: {
          value: thisData.key[keyword]
        },
        timestamp: {
          value: dt.toFormat("yyyy-MM-dd HH:mm:ss")
        }
      };
      return kintone.api(kintone.api.url("/k/v1/record"), "POST", {
        app,
        record
      });
    }
  }
};
</script>

<style lang="scss">
.question {
  position: relative;
  top: 100px;
  h1 {
    font-size: 4em;
    margin: 0;
  }
  p {
    font-size: 1.5em;
  }
}
.question-table {
  text-align: center;
  margin: auto;
  width: 80vw;
  tr {
    td {
      margin: 10px;
      font-size: 2em;
    }
  }
}
.icon {
  height: 100px;
  img {
    width: 150px;
  }
}
.thanks-text {
  position: relative;
  top: 7vh;
  color: #33ffff;
  // font-size: ;
}
</style>
