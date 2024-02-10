<script lang="ts">
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    edit: false
  }),
}
</script>
<template>
  <li>
    <!-- <span class="item" v-if="!item.edit">  -->
    <span class="item" v-if="!item.edit">
      <span class="product-title">{{ item.product }}</span>
      <span class="wrapper-button">
        <span>{{ item.quantity }}</span>
      </span>
      <button v-on:click="item.edit = 'edit'" class="button-round">Edit</button>
      <!-- v-on:click="$set(item, 'edit', !item.edit)" -->
      <!-- @click="tellParentEditItem" -->
    </span>
    <!--<div class="item" v-if="item.edit"> use v-else so the HTML v-if markup isn't rendered-->
    <div class="item" v-else>
     <span class="product-title">{{ item.product }}</span>
       <span class="wrapper-button">
         <button :disabled="item.quantity <= 1" v-on:click="item.quantity = item.quantity-1">
           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
             <!-- Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
             <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
           </svg>
         </button>
         <input v-model="item.quantity" class="edit-input">
         <button v-on:click="item.quantity = item.quantity+1">
           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
             <!-- Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
             <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
           </svg>
         </button>
       </span>
      <button v-on:click="item.edit = false" class="button-round">Save</button>
    </div>
  </li>
</template>