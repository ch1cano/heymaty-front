<template>
  <div class="info">
    <div>
      Oh, you have no matys <br />
      Let’s start to <span class="span_info">search</span> together!
    </div>
  </div>
</template>

<script>
export default {
  name: "NoMatys",
};
</script>

<style>
.info {
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px;
  margin: auto;
  height: 100vh;
}
.span_info {
  color: var(--accent-primary, #2554f3);
}
</style>
