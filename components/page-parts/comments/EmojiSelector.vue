<template>
  <emoji-picker class="emojiselector" @emoji="insert" :search="search" :emojiTable="emojiTable">
    <div
      slot="emoji-invoker"
      slot-scope="{ events: { click: clickEvent } }"
      @click.stop="clickEvent"
      class="emojiinvoker"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.8291 37C31.2849 37 37.3291 31.1797 37.3291 24C37.3291 16.8203 31.2849 11 23.8291 11C16.3733 11 10.3291 16.8203 10.3291 24C10.3291 31.1797 16.3733 37 23.8291 37Z"
          stroke="#5E5E5E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M31.3291 24C31.3291 27.866 27.9712 31 23.8291 31C19.687 31 16.3291 27.866 16.3291 24"
          stroke="#5E5E5E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.3334 21.3334H21.3434"
          stroke="#5E5E5E"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26.6666 21.3334H26.6766"
          stroke="#5E5E5E"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- <svg
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h48v48H0z" fill="none" />
        <path
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
        />
      </svg>-->
    </div>
    <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
      <div class="emoji-picker">
        <div class="emoji-picker__search">
          <input type="text" v-model="search" />
        </div>
        <div>
          <div v-for="(emojiGroup, category) in emojis" :key="category">
            <h5>{{ category }}</h5>
            <div class="emojis">
              <span
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                @click="insert(emoji)"
                :title="emojiName"
              >{{ emoji }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </emoji-picker>
</template>

<script>
import EmojiPicker from "vue-emoji-picker";
import EmojiTable from "./emojis";
export default {
  name: "EmojiSelector",
  data() {
    return {
      search: "",
      emojiTable: EmojiTable,
    };
  },
  components: {
    EmojiPicker,
  },
  methods: {
    insert(emoji) {
      this.$emit("emoji", emoji);
    },
  },
};
</script>

<style lang="scss" scoped>
.emojiselector {
  // position: absolute;
  // right: 130px;
  // top: 10px;
  // z-index: 1000;
  position: absolute;
  right: 90px;
  z-index: 1000;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  .emojiinvoker {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1000;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
    }
    svg {
      // fill: #b277ef;
    }
  }
  .emoji-picker {
    position: absolute;
    z-index: 1001;
    // font-family: Montserrat;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    top: -20rem;
    left: -15rem;
    overflow: auto;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
    .emoji-picker__search {
      display: flex;
      input {
        flex: 1 !important;
        border-radius: 10rem !important;
        border: 1px solid #ccc !important;
        padding: 0.5rem 1rem !important;
        outline: none !important;
      }
    }
    h5 {
      margin-bottom: 0;
      color: #b1b1b1;
      text-transform: uppercase;
      font-size: 0.8rem;
      cursor: default;
    }
    .emojis {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &:after {
        content: "";
        flex: auto;
      }
      span {
        padding: 0.2rem;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
          background: #ececec;
          cursor: pointer;
        }
      }
    }
  }
}
</style>