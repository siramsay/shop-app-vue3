new Vue({
  //import urgentList from 'urgentList.vue'
  el: '#app',
  //data: {

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
    addItem() {
      if (this.inputItem.length > 0) {
        //this.newItem2 = this.newItem;
        this.newItem.push({index: this.inputItem, itemName: this.inputItem, num: 1});
        this.inputItem = '';
        document.querySelector("input").blur();
      } else {
        alert("You need to add an item")
      }
    },
    addPreviousItem(item) {
      this.newItem.push({index: item, itemName: item, num: 1});
      this.inputItem = '';
    },
    createShopListArray() {
      this.shopListArray = [];
      for (let i = 0; i < this.shopList.length; i++) {
        this.shopListArray.push(this.shopList[i].index);
      }
    },
    addToShopList(index, itemName, num, urgent) {
      if (num > 0) {
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
        console.log('SL: ',this.shopListArray)
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
});

//console.log(vmTodo);
/*
 methods: {
    sortLowest() {
      this.ratingsInfo.sort((a, b) => a.rating > b.rating ? 1 : -1);
    },
    sortHighest() {
      this.ratingsInfo.sort((a, b) => a.rating < b.rating ? 1 : -1);
    }
  },
  computed: {
    filteredFilms() {
      let filter = new RegExp(this.filterText, 'i')
      return this.ratingsInfo.filter(el => el.title.match(filter))
    }
  }

 */
