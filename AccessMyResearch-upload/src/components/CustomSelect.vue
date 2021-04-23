<template>
  <div class="custom-select1" :tabindex="tabindex" @blur="open = false">
    <div class="selected1" :class="{ open: open }" @click="open = !open">
      {{Selector}}{{ selected }}<i style="padding-left:3px" :class="Icon"/>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    Selector: {
        type: String,
        required: false,
    },
    Icon: {
        type: String,
        required: true,
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped>
.custom-select1 {
  position: relative;
  width: 100%;
  text-align: right;
  outline: none;
  height: 15x;
  line-height: 25px;
  font-family:Roboto; 
  font-size: 16px;
}

.custom-select1 .selected1 {
  background-color: white;
  border-radius: 0px;
  color: #8898AA;
  user-select: none;
}

.custom-select1 .selected1.open {
  border: 0px solid #ad8225;
  border-radius: 0px 0px 0px 0px;
}

.custom-select1 .selected1:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select1 .items {
  color: #8898AA;
  overflow: hidden;
  box-shadow: 0 3px 5px #8898AA;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select1 .items div {
  color: #8898AA;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select1 .items div:hover {
  background-color: #F78626;
  color: #555ABF;
}

.selectHide {
  display: none;
}
</style>
