<script lang="ts" setup>
import EmptyView from '@/components/Layout/EmptyView.vue'
</script>
<template>
    <EmptyView>
        <a class="d-flex flex-center mb-4" href="../../index.html">
            <img
                class="me-2"
                src="/assets/logo/own/fulllogo_transparent_nobuffer.png"
                alt=""
                width="150"
            />
        </a>
        <div class="card">
            <div class="card-body p-4 p-sm-5">
                <div class="fw-black lh-1 text-300 fs-error">404</div>
                <p class="lead mt-4 text-800 font-sans-serif fw-semi-bold w-md-75 w-xl-100 mx-auto">
                    The page you're looking for is not found.
                </p>
                <hr />
                <p>
                    Make sure the address is correct and that the page hasn't moved. If you think
                    this is a mistake, <a href="mailto:info@exmaple.com">contact us</a>.
                </p>
                <RouterLink :to="{ name: 'home' }" class="btn btn-primary btn-sm mt-3"
                    ><span class="fas fa-home me-2"></span>Take me home</RouterLink
                >
            </div>
        </div>
    </EmptyView>
</template>
