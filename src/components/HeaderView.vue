<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
    await authStore.logout()
    router.push({ name: 'login' })
}
</script>
<template>
    <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">
        <button
            class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarVerticalCollapse"
            aria-controls="navbarVerticalCollapse"
            aria-expanded="false"
            aria-label="Toggle Navigation"
        >
            <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
        </button>
        <a class="navbar-brand me-1 me-sm-3" href="index.html">
            <div class="d-flex align-items-center">
                <img
                    class="me-2"
                    src="/assets/img/icons/spot-illustrations/falcon.png"
                    alt=""
                    width="40"
                /><span class="font-sans-serif text-primary">falcon</span>
            </div>
        </a>
        <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li class="nav-item mt-3 me-3 fs-9 text-dark">
                <span class="fas fa-dollar-sign"></span> 1,900,000
            </li>
            <li class="nav-item mt-3 me-3 fs-9 text-dark">
                <span class="far fa-user"></span> haikeint
            </li>
            <li class="nav-item">
                <button
                    @click="logout"
                    id="btnLogin"
                    class="btn btn btn-light d-block w-100 mt-3 mb-1 rounded-pill"
                    type="button"
                >
                    <span class="fas fa-sign-out-alt"></span> Đăng xuất
                </button>
            </li>
        </ul>
    </nav>
</template>
