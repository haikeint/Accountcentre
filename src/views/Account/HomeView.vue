<script lang="ts" setup>
import { ref, toRaw, onMounted } from 'vue'

import InputTextReadOnly from '@/components/Input/InputTextReadOnly.vue'

import type { IModal } from '@/interface/IModal'
import type { IAlert } from '@/interface/IAlert'
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()

onMounted(() => {
    if (accountStore.account.id.length == 0) accountStore.getAccount()
})

interface RefInput {
    focus: () => void
}

const placeholder = '( chưa có thông tin )'

const refModal = ref<IModal>()
const refAlert = ref<IAlert>()
const isReadOnly = ref(true)

const refFullname = ref<RefInput>()
const refGender = ref<RefInput>()
const refBirthdate = ref<RefInput>()
const refAddress = ref<RefInput>()

const actionEdit = () => {
    if (!isReadOnly.value) {
        refModal.value?.show()
        return
    }

    isReadOnly.value = !isReadOnly.value

    if (!accountStore.account.fullname) {
        refFullname.value?.focus()
        return
    }
    if (!accountStore.account.gender) {
        refGender.value?.focus()
        return
    }
    if (!accountStore.account.birthdate) {
        refBirthdate.value?.focus()
        return
    }
    if (!accountStore.account.address) {
        refAddress.value?.focus()
        return
    }
    refFullname.value?.focus()
}

const confirmedModal = () => {
    isReadOnly.value = !isReadOnly.value
    refModal.value?.hide()
    refAlert.value?.show('success', 'Cập nhật hoàn tất.')
    console.log(toRaw(accountStore.account))
}
</script>
<template>
    <div
        v-if="accountStore.account.id.length == 0"
        class="spinner-border text-info"
        role="status"
        style="margin-left: 50vh; margin-top: 10vh"
    >
        <span class="visually-hidden">Loading...</span>
    </div>
    <template v-else>
        <div class="card mb-3">
            <div
                class="bg-holder d-none d-lg-block bg-card"
                style="background-image: url(/assets/img/icons/spot-illustrations/corner-4.png)"
            ></div>
            <!--/.bg-holder-->
            <div class="card-body position-relative">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-responsive scrollbar">
                            <table id="table1" class="table">
                                <colgroup>
                                    <col />
                                    <col />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th colspan="2" class="text-first" scope="col">
                                            THÔNG TIN TÀI KHOẢN
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tên đăng nhập:</td>
                                        <td>{{ accountStore.account.username }}</td>
                                    </tr>
                                    <tr>
                                        <td>Mã tài khoản:</td>
                                        <td>{{ accountStore.account.id }}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đăng ký:</td>
                                        <td>{{ accountStore.account.createdat }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div
                class="bg-holder d-none d-lg-block bg-card"
                style="background-image: url(/assets/img/icons/spot-illustrations/corner-4.png)"
            ></div>
            <!--/.bg-holder-->
            <div class="card-body position-relative">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-responsive scrollbar">
                            <table id="table2" class="table">
                                <colgroup>
                                    <col />
                                    <col />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th class="text-first" scope="col">THÔNG TIN CÁ NHÂN</th>
                                        <th class="text-end" scope="col">
                                            <div>
                                                <button
                                                    class="btn btn-link p-0"
                                                    type="button"
                                                    @click="actionEdit"
                                                >
                                                    <template v-if="isReadOnly">
                                                        <span class="text-500 fas fa-edit"></span>
                                                        Cập nhật
                                                    </template>
                                                    <template v-if="!isReadOnly">
                                                        <span class="text-500 far fa-save"></span>
                                                        Lưu
                                                    </template>
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Họ và tên:</td>
                                        <td>
                                            <InputTextReadOnly
                                                v-model:value="accountStore.account.fullname"
                                                :isReadOnly="isReadOnly"
                                                :placeholder="placeholder"
                                                ref="refFullname"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Giới tính:</td>
                                        <td>
                                            <InputTextReadOnly
                                                v-model:value="accountStore.account.gender"
                                                :isReadOnly="isReadOnly"
                                                :placeholder="placeholder"
                                                ref="refGender"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ngày sinh:</td>
                                        <td>
                                            <InputTextReadOnly
                                                v-model:value="accountStore.account.birthdate"
                                                :isReadOnly="isReadOnly"
                                                :placeholder="placeholder"
                                                ref="refBirthdate"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ:</td>
                                        <td>
                                            <InputTextReadOnly
                                                v-model:value="accountStore.account.address"
                                                :isReadOnly="isReadOnly"
                                                :placeholder="placeholder"
                                                ref="refAddress"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <ModalView ref="refModal" @confirmedModal="confirmedModal"></ModalView>
    <AlertView ref="refAlert"></AlertView>
</template>
<style scoped>
.form-control-plaintext {
    padding: unset;
}

#table1 colgroup col:first-child {
    width: 30%;
}
#table1 colgroup col:last-child {
    width: 70%;
}

/* #table2 colgroup col:first-child {
    width: 30%;
}
#table2 colgroup col:nth-child(2) {
    width: 50%;
}
#table2 colgroup col:last-child {
    width: 20%;
} */

#table2 colgroup col:first-child {
    width: 30%;
}
#table2 colgroup col:last-child {
    width: 70%;
}
</style>
