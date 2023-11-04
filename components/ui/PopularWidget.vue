<template>
  <div class="popular">
    <div class="content">
      <div class="name">{{ $t("popularWidget.popular") }}</div>
      <div v-swiper:mediaSwiper="swiperOptions" class="slider">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide">
            <img src="~/assets/img/photo5.png" />
            <div class="flex">
              <div class="author">
                <span>
                  Елена,
                  {{ $tc("popularWidget.userAge", 21) }}
                </span>
                @helen
              </div>
              <a href="#" class="link"></a>
            </div>
            <img src="~/assets/img/photo5.png" />
            <div class="flex">
              <div class="author">
                <span>Елена, {{ $tc("popularWidget.userAge", 21) }}</span>
                @helen
              </div>
              <a href="#" class="link"></a>
            </div>
          </div>
          <div class="swiper-slide slide">
            <img src="~/assets/img/photo5.png" />
            <div class="flex">
              <div class="author">
                <span>Елена, {{ $tc("popularWidget.userAge", 21) }}</span>
                @helen
              </div>
              <a href="#" class="link"></a>
            </div>
            <img src="~/assets/img/photo5.png" />
            <div class="flex">
              <div class="author">
                <span>Елена, {{ $tc("popularWidget.userAge", 21) }}</span>
                @helen
              </div>
              <a href="#" class="link"></a>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <!-- <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularWidget",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        // Some Swiper option/callback...
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>