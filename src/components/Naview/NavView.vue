<script lang="ts" setup>
import NavItem from './NavItem.vue'
import NavLabel from './NavLabel.vue'
</script>
<template>
    <nav class="navbar navbar-light navbar-vertical navbar-expand-xl">
        <div class="d-flex align-items-center">
            <div class="toggle-icon-wrapper">
                <button
                    class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="Menu"
                >
                    <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
                </button>
            </div>
            <a class="navbar-brand">
                <div class="d-flex align-items-center py-3">
                    <img class="me-2" src="/assets/logo/create/hbplay.png" width="180" />
                </div>
            </a>
        </div>
        <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
            <div class="navbar-vertical-content scrollbar">
                <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                    <li class="nav-item">
                        <NavItem name="Thông tin chung" icon="fas fa-info" to="home"></NavItem>

                        <NavItem name="Bảo mật" icon="fas fa-shield-alt" to="security"></NavItem>

                        <!-- <NavLabel name="Lịch sử"></NavLabel> -->
                        <NavItem name="Lịch sử" icon="fas fa-history" to="log"></NavItem>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
