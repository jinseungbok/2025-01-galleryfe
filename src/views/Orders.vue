<script setup>
import { reactive, onMounted } from 'vue';
import { getOrders } from '@/Services/orderService';

const state = reactive({
    orders: []
});

const load = async () => {
    const res = await getOrders();
    if(res === undefined || res.status !== 200) {
        alert("오류가 발생하였습니다. 다시 시도해 주십시오.");
        return;
    }
    state.orders = res.data;
}

onMounted( async () => {
    await load();
});
</script>

<template>
    <div class="orders">
        <div class="container">
            <table class="table table-bordered my-4">
                <thead>
                    <tr>
                        <th class="text-center">번호</th>
                        <th>주문자명</th>
                        <th>결제 수단</th>
                        <th>결제 금액</th>
                        <th>결제 일시</th>
                        <th>자세히 보기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in state.orders" :key="item.id">
                        <td class="text-center">{{ state.orders.length - idx }}</td>
                        <td>{{  item?.name }}</td>
                        <td>{{  item?.payment === 'card' ? '카드' : '무통장입금' }}</td>
                        <td>{{  item?.amount.toLocaleString() }}원</td>
                        <td>{{  item?.created.toLocaleString() }}</td>
                        <td>
                            <router-link :to="`/orders/${item.id}`">자세히 보기</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>