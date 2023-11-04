<template>
  <div class="container">
    <div class="line" :style="lineStyle"></div>
    <div class="textcont">
      <div class="text" :style="textStyle">
        {{ $t("remainTimeLine.waitingForPayment", { timestr: timeStr }) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemainTimeLine",
  props: {
    totalTime: Number,
    remainTime: Number,
  },
  computed: {
    lineStyle() {
      const perc =
        100 - (parseInt(this.remainTime) / parseInt(this.totalTime)) * 100;
      return {
        width: perc + "%",
      };
    },
    textStyle() {
      const perc =
        100 - (parseInt(this.remainTime) / parseInt(this.totalTime)) * 100;
      return {
        color: perc < 90 ? "#fff" : "#fa0",
      };
    },
    timeStr() {
      const h = Math.floor(this.remainTime / 3600);
      const m = Math.floor((this.remainTime - h * 3600) / 60);
      const ss = this.remainTime - h * 3600 - m * 60;
      return `${h.toString().padStart(2, 0)}:${m.toString().padStart(2, 0)}:${ss
        .toString()
        .padStart(2, 0)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 2rem;
  position: relative;
  // background-color: #dd94f9;
  background: #5171e4;
  .line {
    height: 100%;
    // background-color: #b277ef;
    background: hsl(227, 73%, 41%);
    position: absolute;
    left: 0;
    top: 0;
  }
  .textcont {
    height: 100%;
    width: 100%;
    // color: #fff;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1rem;
  }
}
</style>