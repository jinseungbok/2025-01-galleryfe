<script setup>
import { useAccountStore } from "@/stores/account";
import { logout } from "@/Services/accountService";
import { ref, onMounted, onUnmounted, computed } from 'vue';

const account = useAccountStore(); // 먼저 선언

const name = computed( () => account.state.name || "사용자"); // 반응형으로 상태를 계속 바라봄

const isBlink = ref(true);
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    isBlink.value = !isBlink.value; // 1초마다 토글
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// 로그아웃
const logoutAccount = async () => {
  if (!confirm("로그아웃 하시겠습니까?")) {
    return;
  }
  const res = await logout();
  if (res === undefined || res.status !== 200) {
    return;
  }
  account.setLoggedIn(false);
  alert("로그아웃 되었습니다.");
};
</script>

<template>
  <header>
    <div class="navbar custom-navbar text-white shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <strong>Atelier Works</strong>
        </router-link>
        <div>
          <span :class="['blinking', { off: !isBlink }]">{{ name }}님 환영합니다.</span>
        </div>
        <div class="menus d-flex gap-3">
          <template v-if="account.state.loggedIn">
            <a @click="logoutAccount">로그아웃</a>
            <router-link to="/orders">주문 내역</router-link>
            <router-link to="/cart">장바구니</router-link>
          </template>
          <template v-else>
            <router-link to="/login">로그인</router-link>
            <router-link to="/join">회원가입</router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.blinking {
  color: gray;
  transition: color 0.5s ease;
}
.blinking.off {
  color: transparent;
  transition: color 0.5s ease;
}

strong {
  color: #ffcbcd;
}

.custom-navbar {
  background-color: #313131; /* 원하는 색상 (보라색 예시) */
  color: #fff;
}

header {
  .menus {
    a {
      cursor: pointer;
      color: white;
      text-decoration: none;

      &:hover {
        color: yellow;
      }
    }
  }
}
</style>
