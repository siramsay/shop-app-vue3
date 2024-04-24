import { defineStore } from "pinia";

export const useShoppingList = defineStore('ShoppingList', {
    state: () => ({
        shopList: [
            {index: 'Fish', productName: 'Fish (s)', quantity: 20},
            {index: 'Burgers', productName: 'Burgers (s)', quantity: 4},
            {index: 'Potatoes', productName: 'Potatoes (s)', quantity: 10, isUrgent: true},
            {index: 'Apples', productName: 'Apples (s)', quantity: 12},
            {index: 'Pancake Mix', productName: 'Pancake Mix (s)', quantity: 1},
            {index: 'Coke', productName: 'Coke (s)', quantity: 2},
            {index: 'Nacho', productName: 'Nacho (s)', quantity: 1, isUrgent: true},
            {index: 'Almond  Milk', productName: 'Almond Milk (s)', quantity: 1},
            {index: 'Cookies', productName: 'Cookies (s)', quantity: 1}
        ],
        previousProduct: ['Chips','Fish', 'Burgers', 'Potatoes', 'Apples', 'Pancake Mix', 'Chicken', 'Chilli', 'Chocolate','Beer','Lemon Juice','Pork'],
    }),
 //   getters: {
 //       shortUserList: (state) => {
 //           return state.userList.splice(0, 5);
 //       },
 //  },
 /*   actions: {
        //async fetchUsers() {
        fetchUsers() {
            const response = this.shopList
            //const response = await fetch(
            //    "https://jsonplaceholder.typicode.com/users"
            //).then((response) => response.json());

            this.shopList = response;
        },*/
 //       updateName(id: number, newName: string){
 //           console.log('id', id)
 //           const index = this.userList.findIndex(i => i.id == id)
 //           //id = id - 1
 //           this.userList[index].name = newName
 //       }
 //  },
});
