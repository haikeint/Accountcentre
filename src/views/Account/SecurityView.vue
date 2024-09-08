<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import ButtonChangeAndClose from '@/components/Util/ButtonChangeAndClose.vue'
import FormPassword from '@/components/Secure/FormPassword.vue'
import FormPhoneNumber from '@/components/Secure/FormPhoneNumber.vue'
import FormEmail from '@/components/Secure/FormEmail.vue'
import { HttpStatusCode } from '@/Util/RequestError'
import { useRouter } from 'vue-router'
const router = useRouter()

import type { IAlert } from '@/interface/IAlert'

import { useAccountStore } from '@/store/account'
import { useNotifyStore } from '@/store/notify'

import { useMutation } from '@vue/apollo-composable'
import { MUTATION_UPDATE_SECURE } from '@/graphql/account'

const { mutate } = useMutation(MUTATION_UPDATE_SECURE)

const accountStore = useAccountStore()
const notifyStore = useNotifyStore()

onMounted(() => {
    if (accountStore.account.id.length == 0) accountStore.getAccount(router)
})

const refAlert = ref<IAlert>()

const expandStatus = reactive<any>({
    authen_gg: false,
    password: false,
    phoneNumber: false,
    email: false,
    idCode: false
})

const updateSecure = (object: object) => {
    mutate({
        objectInput: object
    })
        .then((res) => {
            if (res?.data.updateSecure) refAlert.value?.show('success', 'Cập nhật thành công.')
            if (!res?.data.updateSecure) refAlert.value?.show('danger', 'Cập nhật thất bại.')
        })
        .catch(({ graphQLErrors }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ extensions }: any) => {
                    if (extensions.statusCode == HttpStatusCode.Unauthorized) {
                        notifyStore.setNotify('Phiên đăng nhập hết hạn')
                        router.push({ name: 'login' })
                    }
                })
            } else {
                refAlert.value?.show('danger', 'Cập nhật thất bại.')
            }
        })
}

const handleButtonChangeAndClose = (event: string) => {
    for (const key in expandStatus) {
        if (key != event) {
            expandStatus[key] = false
        }
    }
    expandStatus[event] = !expandStatus[event]
}
</script>

<template>
    <div class="card mb-3">
        <div
            class="bg-holder d-none d-lg-block bg-card"
            style="
                background-image: url(/assets/img/icons/spot-illustrations/corner-4.png);
                background-repeat: repeat;
            "
        ></div>
        <div class="card-body position-relative">
            <!-- <div class="row bg-card">
                <div
                    class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
                >
                    <span class="fas fa-shield-alt c-fa-25x"></span>
                </div>
                <div class="col-md-6 col-sm-9">
                    <h5>Google Authenticator</h5>
                    <p>
                        Ứng dụng điện thoại này có thể tạo mã xác nhận mà không cần có mạng
                        internet, nhằm tạo thêm 1 lớp bảo mật cho tài khoản của bạn.
                    </p>
                </div>
                <div class="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
                    <ButtonChangeAndClose
                        name="authen_gg"
                        :status="expandStatus.authen_gg"
                        @click="handleButtonChangeAndClose"
                    ></ButtonChangeAndClose>
                </div>
            </div>
            <hr /> -->
            <div class="row">
                <div
                    class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
                >
                    <span class="fas fa-lock c-fa-25x"></span>
                </div>
                <div class="col-md-6 col-sm-9">
                    <h5>Mật khẩu</h5>
                    <p>
                        Mật khẩu cần được kết hợp bởi nhiều chữ cái, số và ký tự đặc biệt để bảo mật
                        tài khoản.
                    </p>
                </div>
                <div class="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
                    <ButtonChangeAndClose
                        name="password"
                        :status="expandStatus.password"
                        @click="handleButtonChangeAndClose"
                    ></ButtonChangeAndClose>
                </div>
            </div>
            <Transition name="slide">
                <FormPassword v-if="expandStatus.password" @update="updateSecure" />
            </Transition>
            <hr />
            <div class="row">
                <div
                    class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
                >
                    <span class="fas fa-mobile-alt c-fa-25x"></span>
                </div>
                <div class="col-md-6 col-sm-9">
                    <h5 v-if="accountStore.account.phone || false">
                        Số điện thoại: {{ accountStore.account.phone }}
                    </h5>
                    <h5 v-else>Số điện thoại: <i>(chưa có thông tin)</i></h5>
                    <p>
                        Số điện thoại này có thể sử dụng để đăng nhập, và nhận Mã xác nhận cho nhưng
                        hoạt động tài khoản như đổi mật khẩu.
                    </p>
                </div>
                <div class="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
                    <ButtonChangeAndClose
                        name="phoneNumber"
                        :status="expandStatus.phoneNumber"
                        @click="handleButtonChangeAndClose"
                    ></ButtonChangeAndClose>
                </div>
            </div>
            <Transition name="slide">
                <FormPhoneNumber
                    v-if="expandStatus.phoneNumber"
                    :isExisted="accountStore.account.phone.length > 0"
                    @update="updateSecure"
                />
            </Transition>
            <hr />
            <div class="row">
                <div
                    class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
                >
                    <span class="fas fa-envelope c-fa-25x"></span>
                </div>
                <div class="col-md-6 col-sm-9">
                    <h5 v-if="accountStore.account.email || false">
                        Email: {{ accountStore.account.email }}
                    </h5>
                    <h5 v-else>Email: <i>(chưa có thông tin)</i></h5>
                    <p>
                        Địa chỉ Email này có thể sử dụng để đăng nhập. Nếu đã được xác nhận, nó cũng
                        có thể được sử dụng để thay đổi mật khẩu khi không có công cụ bảo mật nào
                        khác được bật.
                    </p>
                </div>
                <div class="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
                    <ButtonChangeAndClose
                        name="email"
                        :status="expandStatus.email"
                        @click="handleButtonChangeAndClose"
                    ></ButtonChangeAndClose>
                </div>
            </div>
            <Transition name="slide">
                <FormEmail
                    v-if="expandStatus.email"
                    :isExisted="accountStore.account.email.length > 0"
                    @update="updateSecure"
                ></FormEmail>
            </Transition>
            <!-- <hr />
            <div class="row">
                <div
                    class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
                >
                    <span class="fas fa-passport c-fa-25x"></span>
                </div>
                <div class="col-md-6 col-sm-9">
                    <h5>Số Căn cước công dân</h5>
                    <p>
                        Thông tin này có thể được dùng để xác minh bạn là chủ sở hữu tài khoản nhằm
                        thiết lập lại mật khẩu
                    </p>
                </div>
                <div class="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
                    <ButtonChangeAndClose
                        name="idCode"
                        :status="expandStatus.idCode"
                        @click="handleButtonChangeAndClose"
                    ></ButtonChangeAndClose>
                </div>
            </div> -->
        </div>
    </div>
    <AlertView ref="refAlert"></AlertView>
</template>
<style>
/* CSS để điều khiển hiệu ứng slide */
.slide-enter-active,
.slide-leave-active {
    transition: all 1s ease;
}

.slide-enter-from, .slide-leave-to /* Đoạn này áp dụng cho trạng thái ban đầu khi vào và kết thúc khi ra */ {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.slide-enter-to, .slide-leave-from /* Đoạn này áp dụng cho trạng thái cuối cùng khi vào và ban đầu khi ra */ {
    max-height: 1000px; /* Bạn có thể điều chỉnh max-height để phù hợp với nội dung của bạn */
    opacity: 1;
}

.c-fa-25x {
    font-size: 2.5em;
}
</style>
