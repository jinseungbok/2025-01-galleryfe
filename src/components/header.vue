<script setup>
import { useAccountStore } from "@/stores/account";
import { logout } from "@/Services/accountService";

const account = useAccountStore();
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
          <strong>Gallery</strong>
        </router-link>
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

strong {
  color: white;
}

.custom-navbar {
  background-color: darkblue; /* 원하는 색상 (보라색 예시) */
  color: #fff;
}

header {
  .menus {
    a {
      cursor: pointer;
      color: #fff;
      text-decoration: none;
      color: white;

      &:hover {
        color: yellow;
    }
  }
}
}
</style>
