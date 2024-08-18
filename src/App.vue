<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView></RouterView>
</template>

<style>
@import 'simplebar/dist/simplebar.min.css';
@import '@assets/css/theme.min.css';

.center {
    display: block;
    text-align: -webkit-center;
    unicode-bidi: isolate;
}

.valid-txt {
    border-color: var(--falcon-form-valid-border-color);
    padding-right: calc(1.5em + 0.625rem);
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='%2300d27a' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.15625rem) center;
    background-size: calc(0.75em + 0.3125rem) calc(0.75em + 0.3125rem);
}
.valid-txt:focus {
    border-color: var(--falcon-form-valid-border-color);
    -webkit-box-shadow:
        var(--falcon-box-shadow-inset),
        0 0 0 0.25rem rgba(var(--falcon-success-rgb), 0.25);
    box-shadow:
        var(--falcon-box-shadow-inset),
        0 0 0 0.25rem rgba(var(--falcon-success-rgb), 0.25);
}

.invalid-txt {
    border-color: var(--falcon-form-invalid-border-color);
    padding-right: calc(1.5em + 0.625rem);
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23e63757'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='%23e63757' stroke='none'/></svg>");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.15625rem) center;
    background-size: calc(0.75em + 0.3125rem) calc(0.75em + 0.3125rem);
}

.invalid-txt:focus {
    border-color: var(--falcon-form-invalid-border-color);
    -webkit-box-shadow:
        var(--falcon-box-shadow-inset),
        0 0 0 0.25rem rgba(var(--falcon-danger-rgb), 0.25);
    box-shadow:
        var(--falcon-box-shadow-inset),
        0 0 0 0.25rem rgba(var(--falcon-danger-rgb), 0.25);
}

.invalid-feedback {
    font-weight: bold;
    display: unset;
}
.valid-feedback {
    font-weight: bold;
    display: unset;
}

/* .form-label {
  margin-bottom: 0rem;
} */

.mg-15vh {
    margin: 15vh;
}

.mg-10vh {
    margin: 10vh;
}

.disabled {
    pointer-events: none;
    color: #333333;
}

.no-scroll {
    overflow: hidden;
}

.btn-info {
    background-color: #17a2b8;
}
.navbar-vertical .navbar-nav .nav-item .nav-link.active {
    color: #17a2b8;
}
/* .grecaptcha-badge {
    visibility: hidden;
} */
.bg-shape {
    background-color: gray;
}
.bg-shape:after {
    background-image: unset;
    background-color: #001c2b;
}
.bg-shape:before {
    background-image: unset;
    background-color: #001c2b;
}
a {
    color: #17a2b8;
}
.form-check-input:checked {
    background-color: #17a2b8;
    border-color: #17a2b8;
}
body {
    overflow-y: scroll;
}

/* body {
    overflow: hidden; 
    padding-right: 15px; 
} */

/* body::-webkit-scrollbar {
    display: none; 
} */
::-webkit-scrollbar {
    width: 8px; /* Chiều rộng của thanh cuộn dọc */
    height: 8px; /* Chiều cao của thanh cuộn ngang */
}

/* Tùy chỉnh track của thanh cuộn */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Tùy chỉnh thumb của thanh cuộn */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

/* Tùy chỉnh thumb khi hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

p {
    margin-bottom: 0rem;
}
hr {
    margin: 0.5rem 0;
}
.txt-info {
    color: #17a2b8;
}
</style>
