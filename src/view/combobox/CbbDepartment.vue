<template>
  <div class="scombobox">
    <input type="text" class="s-combobox-input" :value="showText(value)" />
    <div @click="showData" class="s-combobox-buton">
      <i class="fas fa-sort-down"></i>
    </div>
    <div class="s-combobox-data" v-show="isShow">
      <div
        class="s-combobox-item"
      
        v-for="(option, index) in options"
        :key="index"
        @click="select(option)"
      >
        {{ option.DepartmentName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * phần này tham khảo chiến
   */
  props: {
    options: Array,
    value: String,
    
  },
  data() {
    return {
      Department: [],
      isShow: false,
    };
  },
  methods: {
    /**
     * Hiện cbb department
     * Author: LT Ngoc (10/12/2021)
     */
    showData() {
      this.isShow = !this.isShow;
    },
    /**
     * lấy ra dữ liệu và gọi lên cha
     * Author: LT Ngoc (10/12/2021)
     */
    select(option) {
      this.isShow = false;
      this.$emit("select", option);
    },

    showText(id) {
      for (let i = 0; i < this.options.length; i++) {
        if (id == this.options[i].DepartmentId)
          return this.options[i].DepartmentName;
      }
      return "";
    },
  },
};
</script>

<style>
</style>