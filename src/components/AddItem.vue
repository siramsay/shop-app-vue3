<script lang="ts">

export default {
  props: {
    // If you have this prop. you will get a warning in console it is missing
    // you  need to add :item="newItems" to the AddItem component in the App.vue
    //item: {
    //  type: Object,
    //  required: true,
    //},
    newItems: {
      type: Object,
      required: true,
    }
  },
  emits: ["cancel-item","add-to-shop-list"],
  data: () => ({
    selectNums: [] as number[]
  }),
  methods: {
    addToShopList(currentList:boolean, num:number) {
      this.$emit('add-to-shop-list', {
        index: 'index',
        //
        itemName: this.newItems[0].itemName,
        num: num,
        urgent: false,
        currentQuantity: 4,
        currentList: currentList
      })
    },
    addToUrgentShopList(currentList:boolean, num:number) {
      this.$emit('add-to-shop-list', {
        index: 'index',
        //
        itemName: this.newItems[0].itemName,
        num: num,
        urgent: true,
        currentQuantity: 4,
        currentList: currentList
      })
    },
    cancelNewItem() {
      this.$emit("cancel-item");
    },
    makeSequence() { this.selectNums = [...Array(101).keys()] }
        //makeSequence(): Array<number> {
        //  return this.selectNums = [...Array(101).keys()]  //  todo: slice/pop 0 off the front
        //},
  },
  // Created cycle hook
  created() {
    this.makeSequence();
  }
}
</script>
<template>
    <span style="position: absolute; top:0;" v-if="newItems[0].message">{{ newItems[0].message }}</span>
    <div v-if="newItems.length > 0" >
      <div v-for="(item, index) in newItems" class="add-outer-wrapper" >
        <div class="add-wrapper">
          <ul id="add">
            <li>{{ item.itemName }} - {{ item.currentQuantity }}  -
              <select v-model.number="item.num">
                <option v-for="selectNum in selectNums">{{ selectNum }}</option>
              </select>
            </li>
          </ul>

          <span class="wrapper-button">
          <button :disabled="item.num <= 1"  v-on:click="item.num = item.num-1" class="button-circle">
             <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
          </button>
          <button v-on:click="item.num = item.num+1" class="button-circle">
             <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
          </svg>
          </button>
        </span>
        </div>
        <div class="add-wrapper">
          <button @click="cancelNewItem" class="button-round">Cancel</button>
          <button @click="addToShopList(false, item.num)" class="button-round">Add</button>
          <button @click="addToUrgentShopList(true, item.num)" class="button-round">Urgent</button>
        </div>
      </div>
    </div>
</template>