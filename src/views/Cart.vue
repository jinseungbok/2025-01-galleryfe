<script setup>
import { reactive, onMounted } from 'vue';
import { getItems, removeItem } from '../Services/cartService';

// 반응형 상태
const state = reactive({
    items: []
});

// 장바구니 상품 조회
const load = async () => {
    const res = await getItems();
    console.log("상태: ", res.status);
    if (res === undefined || res.status !== 200) {
        return;
    }
    state.items = res.data;
}

// 장바구니 상품 삭제
const remove = async cart_id => {
    const res = await removeItem(cart_id);
    if(res === undefined || res.status !== 200) {
        return;
    }
        load();
    // 다시 리로딩 or 방금 삭제한 객체만 state.items에서 삭제
}

onMounted( () => {
    load();
});
</script>

<template>
    <div class="cart">
        <div class="container">
            <template v-if="state.items.length">
                <ul class="items">
                    <li v-for="item in state.items">
                        <img :alt="`상품 사진(${item.name})`" :src="`/pic/item/${item.imgPath}`" />
                        <b class="name">{{ item.name }}</b>
                        <span class="price">
                            {{ (item.price - item.price * item.discountPer / 100).toLocaleString() }}원
                        </span>
                        <span class="remove float-end" @click="remove(item.id)" title="삭제">&times;</span>
                    </li>
                </ul>
                <div class="act">
                    <router-link to="/order" class="btn btn-primary">주문하기</router-link>
                </div>
            </template>
            <template v-else>
                <div class="text-center py-5">장바구니가 비어있습니다.</div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart {
    li { border: 1px solid #eee; margin-top: 25px; margin-bottom: 25px; }
    img { width: 150px; height: 150px; }

    .items { list-style: none; margin: 0; padding: 0; }
    .name { margin-left: 25px; }
    .price { margin-left: 25px; }
    .remove { cursor: pointer; font-size: 30px; padding: 5px 15px; }    
}

.act .btn { width: 300px; display: block; margin: 0 auto; padding: 30px 50px; font-size: 20px; }
</style>