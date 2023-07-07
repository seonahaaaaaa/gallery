<template>
  <div class="orders">
    <div class="container">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>번호</th>
          <th>주문자명</th>
          <th>주소</th>
          <th>결제수단</th>
          <th>구입항목</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i,idx) in state.orders" :key="idx">
          <td>{{i.id}}</td>
          <td>{{i.name}}</td>
          <td>{{i.address}}</td>
          <td>{{i.payment}}</td>
          <td>
            <div v-for="(d,idx) in i.items" :key="idx">{{d.name}}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import lib from "../scripts/lib";
export default {
  name: "Orders",
  setup() {
    const state = reactive({
      orders: [],
    });

    axios.get("/api/orders").then(({data})=>{
      console.log(data)
      state.orders = [];

      for(let d of data){
        d.items = JSON.parse(d.items);
        state.orders.push(d);
        console.log("d.items : " + d.items);
        console.log("d : " + d);
      }
    })

    return { state, lib};
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.table > tbody {
  border-top : 1px solid #eee;
}

table {
  margin-top : 30px;
}
</style>
