<script lang="ts">
import { mapStores } from 'pinia'
import { useShoppingList } from '@/stores/ShoppingList'

import ItemCard from "../components/ItemCard.vue";
import ItemStoreCard from "../components/ItemStoreCard.vue";
import AddItem from "../components/AddItem.vue";
export default {
  components: {
    ItemCard,
    AddItem,
    ItemStoreCard
  },
  data() {
    return {
      currentList: true,
      inputItem: '',
      newItems: [],
      selectNums: [],
      shopListArray: [],
      /*shopList: [
        {index: 'Fish', product: 'Fish (data)', quantity: 20},
        {index: 'Burgers', product: 'Burgers', quantity: 4},
        {index: 'Potatoes', product: 'Potatoes', quantity: 10, isUrgent: true},
        {index: 'Apples', product: 'Apples', quantity: 12},
        {index: 'Pancake Mix', product: 'Pancake Mix', quantity: 1},
        {index: 'Coke', product: 'Coke', quantity: 2},
        {index: 'Nacho', product: 'Nacho', quantity: 1, isUrgent: true},
        {index: 'Almond  Milk', product: 'Almond Milk', quantity: 1},
        {index: 'Cookies', product: 'Cookies', quantity: 1}
      ],*/
      placeHolder: '',
      previousProduct: ['Fish', 'Burgers', 'Potatoes', 'Apples', 'Pancake Mix', 'Chicken', 'Chilli', 'Chocolate','Beer','Lemon Juice','Pork'],
      preFilter: [],
      filterText: ''
    }
  },
  methods: {
    focusInput() {
      document.querySelector("input").focus();
    },
    makeSequence() {
      this.selectNums = [...Array(101).keys()]  //  todo: slice/pop 0 off the front
    },
    clearPlaceholder () {
      //if (this.inputItem.length === 0) {
      //document.querySelector("input").removeAttribute('placeholder');
      //document.querySelector("input").classList.add('add-item');
      //}
    },
    addItem() {
      if (this.inputItem.length > 0) {

        // Need to remove white space and capitalize before checking if the input item is in the list

        const trimmedInputItem = this.inputItem.trim();
        const capitalizedTrimmedInputItem = trimmedInputItem.replace(/\b\w/g, l => l.toUpperCase());

        this.createShopListArray();
        const newStrIndex = this.shopListArray.indexOf(capitalizedTrimmedInputItem);

        // if not in shop list add num is 1 : else item in shop list index is >= 0 then get quantity to add to num
        if (newStrIndex === -1) {
          this.newItems.push({index: this.inputItem, itemName: this.inputItem, num: 1});
          this.inputItem = '';
        } else {
          this.newItems.push({
            index: this.inputItem,
            itemName: this.inputItem,
            num: 0,
            currentQuantity: this.shopList[newStrIndex].quantity,
            message: `Item is already in list, you already have ${this.shopList[newStrIndex].quantity} ${this.inputItem}`
          });
          this.inputItem = '';
        }

        document.querySelector("input").blur();

      } else {
        alert("You need to add an item")
      }
    },
    addPreviousItem(item:any, index:any) {

      this.createShopListArray();
      const newStrIndex = this.shopListArray.indexOf(item);
      console.log(newStrIndex)

      // Same block as addItem()
      // if not in shop list add num is 1 : else item in shop list index is >= 0 then get quantity to add to num
      if (newStrIndex === -1) {
        this.newItems.push({index: index, itemName: item, num: 1});
      } else {
        this.newItems.push({
          index: index,
          itemName: item,
          num: 0,
          currentQuantity: this.shopList[newStrIndex].quantity,
          message: `Item is already in list, you already have ${this.shopList[newStrIndex].quantity} ${item}`
        });
      }

      this.inputItem = '';
    },
    cancelNewItem() {
      this.newItems.pop();
    },
    createShopListArray() {
      this.shopListArray = [];
      for (let i = 0; i < this.shopList.length; i++) {
        this.shopListArray.push(this.shopList[i].index);
      }
    },
    //addToShopList(index, itemName, num, urgent, currentQuantity ) {
    addToShopList(payload:object) {
      if (payload.num > 0 || payload.currentQuantity  > 0) {
        console.log(payload.itemName);

        this.currentList = payload.currentList;
        // Check for white space
        const stringLength = payload.itemName.length;
        const lastChar = payload.itemName.charAt(stringLength - 1);
        const inValid = /\s/;
        // str.replace(/\s+/g, '');  // removes all white space
        const k = inValid.test(lastChar);

        // Burger or Burgers
        // Make Add button focus after enter

        if (k) {
          payload.itemName = payload.itemName.slice(0, -1); // trims last character
        }

        const trimNewStr = payload.itemName.trim();

        const newStr = trimNewStr.replace(/\b\w/g, l => l.toUpperCase());
        console.log('NS:', newStr);


        // This could be moved and created again if a new item is added instead of each time.
        this.createShopListArray();
        const newStrIndex = this.shopListArray.indexOf(newStr);

        if (newStrIndex === -1) {
          this.shopList.push({
            index: newStr,
            product: newStr,
            quantity: payload.num,
            isUrgent: payload.urgent
          })
          //add the new task an object: property
          // check is already in the shopping and offer to merge
          console.log('test urgent',this.shopList);
          this.newItems.splice(payload.index, 1);
        } else {
          this.shopList[newStrIndex].quantity = this.shopList[newStrIndex].quantity + payload.num;
          this.shopList[newStrIndex].isUrgent = payload.urgent;
          this.newItems.splice(payload.index, 1); //use to remove from add to list
        }

        // check is already in the shopping and offer to merge
        this.previousProduct.includes(newStr) ? console.log('Already in the list') : this.previousProduct.push(newStr);
        // if includes then push a mark to say it has been added before, removed, bought.
        //document.querySelector("input.add-item").setAttribute('placeholder', "&#xF044");
        //document.querySelector("input").style.fontSize = '2em';
        document.querySelector("input").classList.remove('add-item');
      } else {
        alert("You need to add more than 0")
      }
    },

    /* Sorts
    sortLowest() {
      this.shopList.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
    },
    sortHighest() {
      this.shopList.sort((a, b) => a.quantity < b.quantity ? 1 : -1);
    },
    sortA() {
      this.shopList.sort((a, b) => {
        let pa = a.product.toLowerCase(),
            pb = b.product.toLowerCase();

        if (pa < pb) {
          return -1;
        }
        if (pa > pb) {
          return 1;
        }
        return 0;
      });
    },
    */

  },
  computed: {
    ...mapStores(useShoppingList),

    // data computed
    /*
    filteredFood() {
      let filter = new RegExp(this.filterText, 'i')
      return this.ratingsInfo.filter(el => el.title.match(filter))
    },*/

    urgentItems(){
      return this.ShoppingListStore.shopList.filter(e => e.isUrgent === true)
    },
    /*
    notUrgentItems(){
      return this.shopList.filter(e => e.isUrgent === false)
    },
*/
    filterPre() {

      /* Filter
  * Array.prototype.filter()
  * String.prototype.match()
  * */

      let filter = new RegExp(this.inputItem, 'i')
      return this.previousProduct.filter(el => el.match(filter));

    }
  },
  // Moved to component
  /*created() {
    this.makeSequence();
  } */
}

</script>

<template>

  <section class="input">
    <input
        type="text"
        v-model="inputItem"
        v-on:keyup.enter="addItem"
        placeholder="&#xf055 "
        style="font-family:Arial, FontAwesome, 'sans-serif'; font-size: 1em"
    >
  </section>

  <!-- Start Screen -->
  <div class="suggestion-outer-wrapper" v-if="newItems.length === 0 && !inputItem">
    <h4>Suggested Regularly Bought</h4>
    <div class="suggestion-wrapper">
      <ul id="suggestion">
        <li v-for="(item, index) in previousProduct"
            v-on:click="addPreviousItem(item, index)">{{ item }}</li>
      </ul>
    </div>
  </div>

  <!-- Suggestion: Preemptive Previous Product Suggestion -->
  <div v-if="inputItem.length > 0" class="suggestion-outer-wrapper preemptive-suggestions">
    <div class="suggestion-wrapper" v-if="previousProduct">
      <div v-if="inputItem" class="previous-wrapper">
        <ul id="previous">
          <li id="prev"
              v-for="(item, index) in filterPre"
              v-on:click="addPreviousItem(item, index)">{{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Add Item(S) -->

  <!-- v-for="newItem in newItems" :item="newItems"-->
  <div style="position: relative;" class="suggestion-outer-wrapper add-item" v-if="newItems.length > 0 && !inputItem.length">
    <AddItem
        :new-items="newItems"
        v-on:cancel-item="cancelNewItem"
        v-on:add-to-shop-list="addToShopList"
    />
  </div>
  <!-- :key="`newItem-${newItems.id}`" key only need in v-for  -->

  <!-- Lists -->

  <div class="tabs">
    <h3 v-on:click="currentList = false" v-bind:class="(currentList)?'blue':''">Shopping List</h3>
    <h3 v-on:click="currentList = true" v-bind:class="(!currentList)?'orange':''">Urgent</h3>
  </div>

  <!-- isUrgent -->
  <section v-if="currentList" class="sl-wrapper">
    <div class="sl-inner-wrapper">
      <div class="sl">
        <ul>
          <ItemStoreCard
              v-for="item in urgentItems.slice().reverse()"
              :item="item"
              :key="`item-${item.index}`"
          />
        </ul>
      </div>
    </div>
  </section>
  <!-- all -->
  <section v-else class="sl-wrapper">
    <div class="sl-inner-wrapper">
      <div class="sl">
        <ul>
          <ItemStoreCard
              v-for="item in ShoppingListStore.shopList.slice().reverse()"
              :item="item"
              :key="`item-${item.index}`"
          />
        </ul>
      </div>
    </div>
  </section>

  <!-- End Lists -->

</template>
