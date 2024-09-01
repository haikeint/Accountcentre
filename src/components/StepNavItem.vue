<script lang="ts" setup>
defineProps({
    icon: { type: String, required: true },
    className: { type: String, required: true }
})
</script>

<template>
    <li class="nav-item">
        <a :class="className" class="nav-link fw-semi-bold">
            <span class="nav-item-circle-parent">
                <span class="nav-item-circle">
                    <span :class="icon"></span>
                </span>
            </span>
            <span class="d-none d-md-block mt-1 fs-10"><slot></slot></span>
        </a>
    </li>
</template>
<style scoped>
.card-header {
    padding: unset;
}

.card-body .theme-wizard .nav-link.active .nav-item-circle {
    background-color: #17a2b8 !important;
    border-color: #17a2b8;
}
.theme-wizard .nav-link.active {
    color: #17a2b8 !important;
}
</style>
