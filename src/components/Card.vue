<script setup>
import { computed } from 'vue';
import { addItem } from '../Services/cartService';
import { useAccountStore } from "@/stores/account";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

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
    alert("이미 추가된 물품입니다.");
    return;
}
else if(confirm('장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?')) {
    router.push("/cart")
} else {
    alert("홈 화면으로 이동합니다.")
    router.push("/");
}
// 장바구니 화면으로 라우팅
    console.log("카트 담기 성공!");
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
                <b><span class="me-2">{{  props.item.name }}</span></b>
                <!-- 상품 할인율 -->
                <span class="discount badge bg-danger ">{{ props.item.discountPer }}%</span>
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <button class="btn bg-black btn-primary btn-sm" @click="put" style="border: none;">장바구니 담기</button>
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