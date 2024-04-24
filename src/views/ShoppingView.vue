<script lang="ts">
//lang="ts"
import { mapStores } from 'pinia'
//import { mapActions } from 'pinia'
// Note: long store name ShoppingListStore seems to break the underlying functionality
// [Vue Router warn]: Unexpected error when starting the router: ReferenceError: can't access lexical declaration 'useShoppingListStore' before initialization
import { useShoppingList } from '@/stores/ShoppingList'

//const ShoppingList = useShoppingList();
//console.log('store', ShoppingList);
//console.log('store.state', ShoppingList.shopList);

export default {
  computed: {
    ...mapStores(useShoppingList),
  },
  created() {
    console.log("hello");

    //if (this.UserStoreStore.userList === 0) {
      //userStore.fetchUsers();
    //}

  }
}


</script>

<template>
  <div class="shopping-outer-wrapper">
    <h1>Shopping Now</h1>
    <ul>
      <li v-for="item in ShoppingListStore.shopList" :key="item.index">
        {{ item.productName }} - {{ item.quantity }}
        <!--
        {{ item.product }}
         .product gives Deprecated symbol used, consult docs for better alternative
          see https://developer.mozilla.org/en-US/docs/web/api/navigator/product
        -->
      </li>
    </ul>
  </div>
</template>