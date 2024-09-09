<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RadioCmp from '@/components/Form/RadioCmp.vue'
import DataPicker from '@/components/Form/DataPicker.vue'

const router = useRouter()

import InputTextReadOnly from '@/components/Input/InputTextReadOnly.vue'
import { HttpStatusCode } from '@/Util/RequestError'

import type { IModal } from '@/interface/IModal'
import type { IAlert } from '@/interface/IAlert'
import { useAccountStore } from '@/store/account'
import { useNotifyStore } from '@/store/notify'

import { useMutation } from '@vue/apollo-composable'
import { MUTATION_UPDATE_INFO } from '@/graphql/account'
import { AccountResult } from '@/wraper/AccountResult'

const { mutate } = useMutation(MUTATION_UPDATE_INFO)

const accountStore = useAccountStore()
const notifyStore = useNotifyStore()

onMounted(() => {
    if (accountStore.account.id.length == 0) accountStore.getAccount(router)
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
    mutate({
        objectInput: {
            address: accountStore.account.address,
            birthdate: accountStore.account.birthdate,
            fullname: accountStore.account.fullname,
            gender: AccountResult.convertGender2Number(accountStore.account.gender)
        }
    })
        .then(() => {
            refAlert.value?.show('success', 'Cập nhật hoàn tất.')
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
                                            <template v-if="isReadOnly">
                                                {{ accountStore.account.gender }}
                                            </template>
                                            <div v-else class="row">
                                                <div class="col-2">
                                                    <RadioCmp
                                                        id="rd-male"
                                                        name="gender"
                                                        :checked="
                                                            accountStore.account.gender == 'Nam'
                                                        "
                                                        value="Name"
                                                        @cheked="
                                                            (event) =>
                                                                (accountStore.account.gender =
                                                                    event)
                                                        "
                                                    />
                                                </div>
                                                <div class="col-2">
                                                    <RadioCmp
                                                        id="rd-female"
                                                        name="gender"
                                                        :checked="
                                                            accountStore.account.gender == 'Nữ'
                                                        "
                                                        value="Nữ"
                                                        @cheked="
                                                            (event) =>
                                                                (accountStore.account.gender =
                                                                    event)
                                                        "
                                                    />
                                                </div>
                                                <div class="col-2">
                                                    <RadioCmp
                                                        id="rd-other"
                                                        name="gender"
                                                        :checked="
                                                            accountStore.account.gender == 'Khác'
                                                        "
                                                        value="Khác"
                                                        @cheked="
                                                            (event) =>
                                                                (accountStore.account.gender =
                                                                    event)
                                                        "
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ngày sinh:</td>
                                        <td>
                                            <template v-if="isReadOnly">
                                                {{ accountStore.account.birthdate }}
                                            </template>
                                            <DataPicker
                                                v-else
                                                v-model:value="accountStore.account.birthdate"
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
