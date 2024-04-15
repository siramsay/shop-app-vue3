import { defineStore } from "pinia";

export const useShoppingList = defineStore('ShoppingList', {
    state: () => ({
        shopList: [
            {index: 'Fish', productName: 'Fish', quantity: 20},
            {index: 'Burgers', productName: 'Burgers', quantity: 4},
            {index: 'Potatoes', productName: 'Potatoes', quantity: 10, isUrgent: true},
            {index: 'Apples', productName: 'Apples', quantity: 12},
            {index: 'Pancake Mix', productName: 'Pancake Mix', quantity: 1},
            {index: 'Coke', productName: 'Coke', quantity: 2},
            {index: 'Nacho', productName: 'Nacho', quantity: 1, isUrgent: true},
            {index: 'Almond  Milk', productName: 'Almond Milk', quantity: 1},
            {index: 'Cookies', productName: 'Cookies', quantity: 1}
        ],
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
