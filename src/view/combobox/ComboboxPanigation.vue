<template>
  <div class="scombobox">
    <input type="text" id="" class="s-combobox-input" v-model="itemSelected" />
    <button class="s-combobox-buton" @click="isShow = !isShow">
      <i class="fas fa-sort-down"></i>
    </button>
    <div class="s-combobox-data" v-show="isShow">
      <div
        v-for="(item, index) in ListItem"
        :key="index"
        class="s-combobox-item"
        :class="{ selected: item == itemSelected }"
        @click="handleClickItem(item, index)"
       
      >
      {{item}}
        
      </div>
      <!-- <div class="m-combobox-item" value="1">Hiện thị 10 trang</div>
                <div class="m-combobox-item" value="0">Hiện thị 20 trang</div>
                <div class="m-combobox-item" value="0">Hiện thị 30 trang</div>
                <div class="m-combobox-item" value="0">Hiện thị 40 trang</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      itemSelected: String,
    };
  },
  props: {
    ListItem: Array,
  },
  created() {
    this.itemSelected = this.ListItem[0];
  },
  methods: {
    handleClickItem(item, index) {
      this.itemSelected = item;
      this.isShow = false;
      let pageRecord = 10;
      if (index == 0) pageRecord = 10;
      else if (index == 1) pageRecord = 20;
      else if (index == 2) pageRecord = 30;
      else if (index == 3) pageRecord = 50;
      else if (index == 4) pageRecord = 100;
      this.$emit("handleSelect", pageRecord);
    },
  },
};
</script>

<style>
@import url("../../style/main.css");
</style>