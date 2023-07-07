<template>
  <div class="card shadow-sm">
    <span class="img" :style="{backgroundImage: `url(${i.imgPath})`}"/>
      <div class="card-body">
        <p class="card-text">{{ i.name }} &nbsp;
          <span class="discount badge bg-danger">{{ i.discountPer }} $</span></p>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-primary" @click="addToCart(i.id)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
          <small class="price text-muted">{{ lib.getNumberFormatted(i.price) }} $</small>

          <small class="discount text-danger">{{ lib.getNumberFormatted(i.price - (i.price * i.discountPer / 100)) }} $</small>
        </div>
      </div>
    </div>
</template>

<script>
import lib from "../scripts/lib.js"
import axios from 'axios';
export default {
  name : 'Card',
  props : {
    i : Object
  },
  setup() {
    const addToCart = (id)=> {
      axios.post(`/api/cart/items/${id}`).then(()=>{
        console.log("success");
      })
    }

      return {lib,addToCart}
  }

}

</script>

<style scoped>
.card > .img {
  width:100%;
  display : inline-block;
  height: 250px;
  background-size:cover;
  background-position: center;
}

.card .card-body .price {
  text-decoration: line-through;
}
</style>