<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useAccountStore } from '@/store/account'

const authStore = useAuthStore()
const accountStore = useAccountStore()
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
        <a class="navbar-brand me-1 me-sm-3">
            <div class="d-flex align-items-center">
                <img class="me-2" src="/assets/logo/create/hbplay.png" width="220" />
            </div>
        </a>
        <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li class="nav-item mt-3 me-3 fs-9 text-dark">
                <span class="fas fa-dollar-sign"></span> 1,900,000
            </li>
            <li class="nav-item mt-3 me-3 fs-9 text-dark">
                <div v-if="accountStore.account.username.length > 0">
                    <span class="far fa-user"></span> {{ accountStore.account.username }}
                </div>
                <div v-else><span class="fas fa-spinner fa-spin"></span></div>
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
