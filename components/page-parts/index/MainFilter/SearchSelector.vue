<template>
  <div class="container">
    <input
      class="v-input styled-search"
      v-model="name"
      @input="searchModels"
      @keyup="checkIsEnterPress"
      placeholder="Search"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { debounce } from "lodash";

export default {
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapState("models", [
      "models",
      "selectedCountry",
      "selectedCities",
      "selectedAges",
      "selectedLanguages",
    ]),
  },
  methods: {
    ...mapActions("models", ["getModels", "resetModels"]),
    searchModels: debounce(async function () {
      if (this.name.trim() === "") {
        this.resetModels()
        await this.getModels({});
        return;
      }
      try {
        this.resetModels();

        const data = {
          name: this.name,
          ages: this.selectedAges,
          languages: this.selectedLanguages.map(item => item?.value),
          cities: this.selectedCities.map(item => item?.value),
          country: this.selectedCountry?.value
        };

        await this.getModels(data);
      } catch (error) {
        console.error("Error searching models:", error);
      }
    }, 300), // Adjust the delay as needed
    checkIsEnterPress: function (e) {
      if (e.keyCode === 13) {
        this.$parent.onClick();
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

input {
  z-index: 20;
  font-size: 18px;
  color: #4c5165;
  border: 1px solid #d5dbe7;
  padding: 0 5px 0 15px;
  margin-bottom: 25px;
  display: flex;
  max-width: 100%;
  width: 1280px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../../../../assets/img/search3.svg") no-repeat 15px center;
  background-size: 15px 15px;
  border: none;
  border-radius: 36px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  box-sizing: border-box; // added for responsive design
}

.item {
  width: 100%; // make it responsive
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  box-sizing: border-box; // added for responsive design
}

.search {
  cursor: pointer;
}

.error {
  //background-color: tomato;
}

// Media queries for responsive design
@media (max-width: 1530px) {
  input,
  .item {
    width: 1280px;
    margin: 20px auto;
  }
}

@media (max-width: 1377px) {
  input,
  .item {
    width: 1090px;
    padding: 10px; // reduce padding for mobile screens
  }

  input {
    padding-left: 35px; // adjust the padding for the search icon
  }
}

@media (max-width: 1199px) {
  input,
  .item {
    width: 900px;
    padding: 10px; // reduce padding for mobile screens
  }

  input {
    padding-left: 35px; // adjust the padding for the search icon
  }
}

@media (max-width: 991px) {
  input,
  .item {
    width: 680px;
    padding: 10px; // reduce padding for mobile screens
  }

  input {
    padding-left: 35px; // adjust the padding for the search icon
  }
}

@media (max-width: 850px) {
  input,
  .item {
    width: 685px;
    padding: 10px; // reduce padding for mobile screens
  }

  input {
    padding-left: 35px; // adjust the padding for the search icon
  }
}

@media (max-width: 767px) {
  input,
  .item {
    width: 490px;
    padding: 10px; // reduce padding for mobile screens
  }

  input {
    padding-left: 35px; // adjust the padding for the search icon
  }
}

@media (max-width: 575px) {
  input,
  .item {
    width: 500px;
    padding: 10px; // reduce padding for mobile screens
  }

  input {
    padding-left: 35px; // adjust the padding for the search icon
  }
}
</style>
