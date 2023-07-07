<template>
  <div class="order">
    <div class="container">
      <main>
        <div class="py-5 text-center">
          <h2>주문하기</h2>
          <p class="lead">
            Below is an example form built entirely with Bootstrap’s form
            controls. Each required form group has a validation state that can
            be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-primary">구입 목록</span>
              <span class="badge bg-primary rounded-pill"> {{state.item.length}}</span>
            </h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(i,idx) in state.item" :key="idx">
                <div>
                  <h6 class="my-0">{{i.name}}</h6>
                </div>
                <span class="text-muted">{{lib.getNumberFormatted(i.price - (i.price * i.discountPer / 100))}} $</span>
              </li>
            </ul>
            <h3 class="text-center total-price">{{ lib.getNumberFormatted(computedPrice) }} $</h3>
          </div>
          <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">주문자 정보</h4>
            <div class="needs-validation" novalidate="">
              <div class="row g-3">
                <div class="col-12">
                  <label for="username" class="form-label">이름</label>
                  <input type="text" class="form-control" id="username" v-model="state.form.name"/>
                </div>
                <div class="col-12">
                  <label for="address" class="form-label">주소</label>
                  <input type="text" class="form-control" id="address" v-model="state.form.address" />
                </div>
              </div>
              <hr class="my-4" />
              <h4 class="mb-3">결제 수단</h4>
              <div class="my-3">
                <div class="form-check">
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    class="form-check-input"
                    value="card"
                    v-model="state.form.payment"
                  />
                  <label class="form-check-label" for="card">신용카드 </label>
                </div>
                <div class="form-check">
                  <input
                    id="bank"
                    name="paymentMethod"
                    type="radio"
                    class="form-check-input"
                    value="bank"
                    v-model="state.form.payment"
                  />
                  <label class="form-check-label" for="bank">무통장입금</label>
                </div>
              </div>
              <label for="cc-name" class="form-label">카드 번호</label>
              <input type="text" class="form-control" id="cc-name" v-model="state.form.cardNumber" />
              <hr class="my-4" />
              <button class="w-100 btn btn-primary btn-lg" @click="submit()">결제하기</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed ,reactive } from "vue";
import lib from "../scripts/lib";
import router from "../scripts/router"
export default {
  name: "Order",
  setup() {
    const state = reactive({
      item: [],
      form : {
        name : "",
        address : "",
        payment : "",
        cardNumber : "",
        items : ""
      }
    });

    const load = () => {
      axios.get("/api/cart/items").then(({ data }) => {
        console.log(data);
        state.item = data;
      });
    };   // end of load

    const computedPrice = computed(()=>{
      let result = 0;

      for(let i of state.item) {
        result += i.price - (i.price * i.discountPer / 100);
      }
      return result;
    })  // end of computedPrice

    const submit = () => {
      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.item);
      axios.post("/api/orders" , args).then(()=>{
       router.push({path:'/orders'})
      })
    }; // end of submit()

    load();
    return { state, lib ,computedPrice, submit};
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
</style>
