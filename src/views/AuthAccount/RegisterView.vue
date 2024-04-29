<script lang="ts" setup>
import RegisterForm from '@/components/AuthAccount/RegisterForm.vue'
</script>
<template>
  <div class="row min-vh-100 bg-100">
    <div class="col-6 d-none d-lg-block position-relative">
      <div class="bg-holder" style="background-image: url(../src/assets/img/generic/19.jpg)"></div>
      <!--/.bg-holder-->
    </div>
    <div class="col-sm-10 col-md-6 px-sm-0 align-self-center mx-auto py-5">
      <div class="row justify-content-center g-0">
        <div class="col-lg-9 col-xl-8 col-xxl-6">
          <div class="card">
            <div class="card-header bg-circle-shape bg-shape text-center p-2">
              <a
                class="font-sans-serif fw-bolder fs-5 z-1 position-relative link-light"
                href="../../../index.html"
                data-bs-theme="light"
                >falcon</a
              >
            </div>
            <div class="card-body p-4">
              <div class="row flex-between-center">
                <div class="col-auto">
                  <h3>Đăng ký</h3>
                </div>
                <div class="col-auto fs-10 text-600">
                  <span class="mb-0 fw-semi-bold">Đã có tài khoản?</span>
                  <span>
                    <!-- <a href="../../../pages/authentication/split/login.html">Login</a> -->
                    <RouterLink :to="{ name: 'login' }"> Đăng nhập</RouterLink>
                  </span>
                </div>
              </div>
              <RegisterForm />
              <div class="position-relative mt-4">
                <hr />
                <div class="divider-content-center">hoặc đăng ký bằng</div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-sm-6">
                  <a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"
                    ><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span>
                    google</a
                  >
                </div>
                <div class="col-sm-6">
                  <a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"
                    ><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span>
                    facebook</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
