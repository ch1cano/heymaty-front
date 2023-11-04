<template>
  <div>
    <div class="bundle" :class="{ other: bundle.type !== 'limited' }">
      <div v-if="bundle.type === 'limited'" class="limited">
        <span>LIMITED</span>
        {{ $t("bundle.limitedLeft", { amount: bundle.amount }) }}
      </div>
      <div class="bundle-name">{{ $t("bundle.messageBundle") }}</div>
      <div class="bundle-price">
        <span>{{ toMoney(bundle.price) }}</span> HDC
      </div>
      <div class="bundle-info">
        <div class="info-item">
          <p>{{ $t("bundle.messages") }}</p>
          <span>{{ bundle.qty }}</span>
        </div>
        <div class="info-item">
          <p>{{ $t("bundle.pricePerOne") }}</p>
          <span>{{ pricePerMessage }} HDC</span>
        </div>
      </div>
      <p class="descr">{{ bundle.description }}</p>
      <div class="slot">
        <slot></slot>
      </div>
      <!-- <button>Купить</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Bundle",
  props: {
    bundle: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pricePerMessage() {
      return (this.toMoney(this.bundle.price) / this.bundle.qty).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.bundle {
  // width: 100%;
  margin: 0 12px;
  color: #fff;
  border: 0;
  position: relative;
  // background: #5171e4;
  background: #5171e4 url("~/assets/img/unlim.svg") no-repeat 50% 32px;
  border-radius: 16px;
  padding: 76px 32px 32px 32px;
}
.bundle.other {
  color: #000;
  // background: #fbf9fe;
  background: #fbf9fe url("~/assets/img/unlim2.svg") no-repeat 50% 32px;
}
.bundle.other .bundle-name {
  color: #a3b2cc;
}
.bundle.other .bundle-price {
  color: #a3b2cc;
}
.bundle.other .bundle-price span {
  color: #000;
}
.bundle.other .bundle-info .info-item p {
  background: #fbf9fe;
}
.bundle.other .bundle-info .info-item span {
  background: #fbf9fe;
}
.bundle.other .slot button {
  color: #fff;
  background: #5171e4;
}
.bundle .limited {
  text-align: center;
  position: absolute;
  top: 24px;
  left: 32px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 150%;
}
.bundle .limited span {
  display: block;
  background: #fff;
  font-weight: 700;
  text-transform: uppercase;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  color: #5171e4;
}
.bundle .bundle-name {
  text-align: center;
  margin-bottom: 7px;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  text-transform: uppercase;
  color: #ffffff;
  opacity: 0.7;
}
.bundle .bundle-price {
  text-align: center;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.7);
}
.bundle .bundle-price span {
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}
.bundle .bundle-info {
  padding-bottom: 6px;
}
.bundle .bundle-info .info-item {
  margin-bottom: 12px;
  position: relative;
}
.bundle .bundle-info .info-item:before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  border-top: 1px dotted #fff;
}
.bundle .bundle-info .info-item p {
  display: inline-block;
  position: relative;
  z-index: 2;
  padding-right: 5px;
  background: #5171e4;
  font-size: 14px;
  line-height: 120%;
  margin: 0;
  opacity: 1;
}
.bundle .bundle-info .info-item span {
  float: right;
  position: relative;
  z-index: 2;
  padding-left: 5px;
  background: #5171e4;
  font-weight: bold;
  font-size: 14px;
  line-height: 120%;
}
.bundle .descr {
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 150%;
  opacity: 0.7;
}
.bundle .slot button {
  font-size: 18px;
  font-weight: 400;
  color: #5171e4;
  background: #fff;
  width: 100%;
  height: 51px;
  -webkit-border-radius: 36px;
  -moz-border-radius: 36px;
  border-radius: 36px;
}

// .bundle {
//   overflow: hidden;
//   // width: 305px;
//   // width: 100%;
//   margin: 0px 0.45% 5px;
//   position: relative;
//   background: hsl(227, 47%, 89%);
//   // border: 2px solid #99abeb;
//   color: #4c5165;
//   // color: #fff;
//   padding: 15px 20px;
//   border-radius: 10px;
//   font-weight: 500;
//   font-size: 1rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   .promobadge {
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     width: 60px;
//     height: 60px;
//     background-color: pink;
//     transform: rotateZ(45deg);
//     // background-image: url(~assets/img/sale.png);
//     // background-size: cover;
//   }
//   .cont {
//     div {
//       margin-bottom: 6px;
//     }
//     .main {
//       text-align: right;
//     }
//     .ppm {
//       text-align: right;
//     }
//     .descr {
//       text-align: center;
//     }
//     .lim {
//       font-size: 1.1rem;
//     }
//   }
//   .slot {
//   }
// }
// .ribbon {
//   margin: 0;
//   padding: 0;
//   background: #b277ef;
//   color: white;
//   padding: 0.5em 0;
//   position: absolute;
//   top: 0;
//   left: 0;
//   transform: translateX(-10%) translateY(70%) rotate(-45deg);
//   transform-origin: top left;
// }
// .ribbon:before,
// .ribbon:after {
//   content: "";
//   position: absolute;
//   top: 0;
//   margin: 0 -1px; /* tweak */
//   width: 100%;
//   height: 100%;
//   background: #b277ef;
// }
// .ribbon:before {
//   right: 100%;
// }

// .ribbon:after {
//   left: 100%;
// }
</style>
