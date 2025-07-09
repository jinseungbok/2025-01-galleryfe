<script setup>
import { computed } from 'vue';
import { addItem } from '../Services/cartService';
import { useAccountStore } from "@/stores/account";

const account = useAccountStore();

const props = defineProps({
    item: {
        id: Number,
        imgPath: String,
        name: String,
        price: Number,
        discountPer: Number
    }
});
//const computedItemDiscountPrice = computed(() => (props.item.price - (props.item.price * props.item.discountPer / 100)).toLocaleString() + '원');
const computedItemDiscountPrice = computed(() => (props.item.price * ((100 - props.item.discountPer) * 0.01)).toLocaleString() + '원');

const put = async () => {
    if(!account.state.loggedIn) {
    alert("로그인을 해주시길 바랍니다.");
    return;
    }
const res = await addItem(props.item.id);
    if(res === undefined || res.status !== 200) {
    alert("장바구니에 담았습니다.");
    return;
}
    console.log('카트 담기 성공!');
}

</script>

<template>
    <div class="card shadow-sm">
        <!-- 상품 사진 aria-label은 영역에 대한 설명 -->
         <span class="img" :style="{backgroundImage: `url(/pic/item/${props.item.imgPath})`}" 
                           :aria-label="`상품사진(${props.item.name})`"></span>                           
         <div class="card-body">
            <p class="card-text">
                <!-- 상품 이름 -->
                <span class="me-2">{{  props.item.name }}</span>
                <!-- 상품 할인율 -->
                <span class="discount badge bg-danger">{{ props.item.discountPer }}%</span>
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary btn-sm" @click="put">장바구니 담기</button>
                <!-- 상품 정가 (숫자 데이터에 3자리마라 쉼표 표기 >> 천단위 콤마) -->
                <small class="price text-muted">{{ props.item.price.toLocaleString() }}원</small>
                <!-- 상품 할인가 -->
                <small class="real text-danger">{{ computedItemDiscountPrice }}</small>
            </div>
         </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    .img {
        display: inline-block;
        width: 100%;
        height: 250px;
        background-size: cover;
        background-position: center;
    }

    .card-body .price {
        text-decoration: line-through;
    }
}
</style>