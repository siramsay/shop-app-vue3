
<script>
// script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'

import ItemCard from "./components/ItemCard.vue";
export default {
  components: {
    ItemCard,
  },
  data() {
    return {
      currentList: true,
      inputItem: '',
      newItem: [],
      selectNums: [],
      shopListArray: [],
      shopList: [
        {index: 'Fish', product: 'Fish', quantity: 20},
        {index: 'Burgers', product: 'Burgers', quantity: 4},
        {index: 'Potatoes', product: 'Potatoes', quantity: 10, isUrgent: true},
        {index: 'Apples', product: 'Apples', quantity: 12},
        {index: 'Pancake Mix', product: 'Pancake Mix', quantity: 1},
        {index: 'Coke', product: 'Coke', quantity: 2},
        {index: 'Nacho', product: 'Nacho', quantity: 1, isUrgent: true},
        {index: 'Almond  Milk', product: 'Almond Milk', quantity: 1},
        {index: 'Cookies', product: 'Cookies', quantity: 1}
      ],
      //selected: undefined,
      placeHolder: '',
      previousProduct: ['Fish', 'Burgers', 'Potatoes', 'Apples', 'Pancake Mix', 'Chicken', 'Chilli', 'Chocolate','Beer','Lemon Juice','Pork'],
      preFilter: [],
      edit: false,
      //
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
    editItem() {
      this.edit = true;
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
          this.newItem.push({index: this.inputItem, itemName: this.inputItem, num: 1});
          this.inputItem = '';
        } else {
          //alert('Item is already in list, you already have ' + this.shopList[newStrIndex].quantity  +  ' ' + this.inputItem);
          this.newItem.push({
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
    addPreviousItem(item) {

      this.createShopListArray();
      const newStrIndex = this.shopListArray.indexOf(item);
      console.log(newStrIndex)

      //this.newItem.push({index: item, itemName: item, num: 1});

      // Same block as aadItem()
      // if not in shop list add num is 1 : else item in shop list index is >= 0 then get quantity to add to num
      if (newStrIndex === -1) {
        this.newItem.push({index: item, itemName: item, num: 1});
        //this.inputItem = '';
      } else {
        //alert('Item is already in list, you already have ' + this.shopList[newStrIndex].quantity  +  ' ' + this.inputItem);
        this.newItem.push({
          index: item,
          itemName: item,
          num: 0,
          currentQuantity: this.shopList[newStrIndex].quantity,
          message: `Item is already in list, you already have ${this.shopList[newStrIndex].quantity} ${item}`
        });
      }

      this.inputItem = '';
    },
    cancelNewItem() {
      this.newItem.pop();
    },
    createShopListArray() {
      this.shopListArray = [];
      for (let i = 0; i < this.shopList.length; i++) {
        this.shopListArray.push(this.shopList[i].index);
      }
    },
    addToShopList(index, itemName, num, urgent, currentQuantity ) {
      if (num > 0 || currentQuantity  > 0) {
        console.log(itemName);

        // Check for white space
        const stringLength = itemName.length;
        const lastChar = itemName.charAt(stringLength - 1);
        const inValid = /\s/;
        // str.replace(/\s+/g, '');  // removes all white space
        const k = inValid.test(lastChar);

        // Burger or Burgers
        // Make Add button focus after enter

        if (k) {
          itemName = itemName.slice(0, -1); // trims last character
        }

        const trimNewStr = itemName.trim();

        const newStr = trimNewStr.replace(/\b\w/g, l => l.toUpperCase());
        console.log('NS:', newStr);


        // This could be moved and created again if a new item is added instead of each time.
        this.createShopListArray();
        const newStrIndex = this.shopListArray.indexOf(newStr);

        if (newStrIndex === -1) {
          this.shopList.push({index: newStr, product: newStr, quantity: num, isUrgent: urgent}) //add the new task an object: property
          // check is already in the shopping and offer to merge
          console.log('test urgent',this.shopList);
          this.newItem.splice(index, 1);
        } else {
          this.shopList[newStrIndex].quantity = this.shopList[newStrIndex].quantity + num;
          this.shopList[newStrIndex].isUrgent = urgent;
          this.newItem.splice(index, 1); //use to remove from add to list
        }

        // check is already in the shopping and offer to merge
        this.previousProduct.includes(newStr) ? console.log('Already in the list') : this.previousProduct.push(newStr);
        // if includes then push a mark to say it has been add before, removed, bought.
        //document.querySelector("input.add-item").setAttribute('placeholder', "&#xF044");
        //document.querySelector("input").style.fontSize = '2em';
        document.querySelector("input").classList.remove('add-item');
      } else {
        alert("You need to add more than 0")
      }
    },

    /* Sorts */
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


  },
  computed: {
    filteredFood() {
      let filter = new RegExp(this.filterText, 'i')
      return this.ratingsInfo.filter(el => el.title.match(filter))
    },

    urgentItems(){
      return this.shopList.filter(e => e.isUrgent === true)
    },
    notUrgentItems(){
      return this.shopList.filter(e => e.isUrgent === false)
    },



    filterPre() {

      /* Filter
  * Array.prototype.filter()
  * String.prototype.match()
  * */

      let filter = new RegExp(this.inputItem, 'i')
      return this.previousProduct.filter(el => el.match(filter));

    }
  },
  created() {
    this.makeSequence();
  }
}

</script>

<template>

  <section class="input">
      <input
          type="text"
          v-model="inputItem"
          v-on:keyup.enter="addItem"
          placeholder="&#xf055 "
          style="font-family:Arial, FontAwesome; font-size: 1em"
      >
    </section>

  <!-- Start Screen -->
  <div class="suggestion-outer-wrapper" v-if="newItem.length === 0 && !inputItem">
    <h4>Suggested Regularly Bought</h4>
    <div class="suggestion-wrapper">
      <ul id="suggestion">
        <li v-for="(item, index) in previousProduct" v-on:click="addPreviousItem(item)">{{ item }}</li>
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
              v-on:click="addPreviousItem(item)">{{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Add Item(S) -->

  <div style="position: relative;" class="suggestion-outer-wrapper add-item" v-if="newItem.length > 0 && !inputItem.length">
    <span style="position: absolute; top:0;" v-if="newItem[0].message">{{ newItem[0].message }}</span>
    <div v-if="newItem.length > 0" >
      <div v-for="(item, index) in newItem" class="add-outer-wrapper" >
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
          <button v-on:click="cancelNewItem" class="button-round">Cancel</button>
          <button v-on:click="addToShopList(index, item.itemName, item.num, item.urgent = false, 4); currentList = false" class="button-round">Add</button>
          <button v-on:click="addToShopList(index, item.itemName, item.num, item.urgent = true, item.currentQuantity); currentList = true" class="button-round">Urgent</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Lists -->

  <div class="tabs">
    <h3 v-on:click="currentList = false" v-bind:class="(currentList === true)?'blue':''">Shopping List</h3>
    <h3 v-on:click="currentList = true" v-bind:class="(currentList === false)?'orange':''">Urgent</h3>
  </div>

  <!-- isUrgent -->
  <section v-if="currentList === true" class="sl-wrapper">
    <div class="sl-inner-wrapper">
      <div class="sl">
        <ul>
          <!-- Not working v-if="item.isUrgent" with v-for-->
          <!-- <template v-for="(item, index) in urgentItems.slice().reverse()" :key="index"> -->


          <!--<li v-for="(item, index) in urgentItems.slice().reverse()" :key="index">-->
        <ItemCard
            v-for="item in urgentItems.slice().reverse()"
            :item="item"
            :key="`item-${item.index}`"
            v-on:edit-item="editItem"
        />

        </ul>
      </div>
    </div>
  </section>

  <section v-else class="sl-wrapper">
    <div class="sl-inner-wrapper">
      <div class="sl">
        <ul>
          <li v-for="(item, index) in shopList.slice().reverse()" :key="index">

            <span class="item" v-if="!item.edit">
              <span class="product-title">{{ item.product }}</span>
              <span class="wrapper-button">
                <span>{{ item.quantity }}</span>
              </span>
              <button v-on:click="item.edit = 'edit'" class="button-round">Edit</button> <!-- v-on:click="$set(item, 'edit', !item.edit)" -->
            </span>

            <!--<div class="item" v-if="item.edit"> use v-else so the HTML v-if markup isn't rendered-->
            <div class="item" v-else>
              <span class="product-title">{{ item.product }}</span>

              <span class="wrapper-button">
                   <button :disabled="item.quantity <= 1" v-on:click="item.quantity = item.quantity-1">
                     <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                   </button>
                  <input v-model="item.quantity" class="edit-input">
                   <button v-on:click="item.quantity = item.quantity+1">
                     <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                     <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                     <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                     </svg>
                   </button>
                </span>

              <button v-on:click="item.edit = false" class="button-round">Save</button>

            </div>

          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- End Lists -->

  <nav>
  <menu>
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
            d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z"/>
      </svg>
    </li>
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
      </svg>
    </li>
    <li v-on:click="focusInput">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
      </svg>
    </li>
  </menu>
  </nav>

</template>

