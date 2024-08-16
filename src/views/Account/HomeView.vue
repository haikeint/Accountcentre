<script lang="ts" setup>
import { ref, reactive, computed, toRaw, onMounted, watch } from 'vue'
import InputTextReadOnly from '@/components/Input/InputTextReadOnly.vue'
import type { IModal } from '@/interface/IModal'
import type { IAlert } from '@/interface/IAlert'
// fetch('http://localhost:3000/verify', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//   }
// })
//   .then((res) => res.json())
//   .then((body) => {
//     console.log(body)
//   })
const refModal = ref<IModal>()
const refAlert = ref<IAlert>()

const isReadOnly = ref(true)

const personInfo = reactive({
    name: 'Trần Văn Cảnh',
    genre: 'Nam',
    birthdate: '10/11/1995',
    address: 'Đ. Hoàng Văn Thụ, Phường 2, Tân Bình, Hồ Chí Minh'
})

const loginInfo = reactive({
    username: 'haikeint',
    id: '1000525133266026496',
    regDate: '01/02/2024'
})

const actionEdit = () => {
    if (isReadOnly.value) {
        isReadOnly.value = !isReadOnly.value
        return
    }
    refModal.value?.show()
}

const confirmedModal = () => {
    isReadOnly.value = !isReadOnly.value
    refModal.value?.hide()
    refAlert.value?.show('success', 'Cập nhật hoàn tất.')
    console.log(1)
}
</script>
<template>
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
                                    <td>{{ loginInfo.username }}</td>
                                </tr>
                                <tr>
                                    <td>Mã tài khoản:</td>
                                    <td>{{ loginInfo.id }}</td>
                                </tr>
                                <tr>
                                    <td>Ngày đăng ký:</td>
                                    <td>{{ loginInfo.regDate }}</td>
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
                                                    <span class="text-500 far fa-save"></span> Lưu
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
                                            v-model:value="personInfo.name"
                                            :isReadOnly="isReadOnly"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giới tính:</td>
                                    <td>
                                        <InputTextReadOnly
                                            v-model:value="personInfo.genre"
                                            :isReadOnly="isReadOnly"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày sinh:</td>
                                    <td>
                                        <InputTextReadOnly
                                            v-model:value="personInfo.birthdate"
                                            :isReadOnly="isReadOnly"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ:</td>
                                    <td>
                                        <InputTextReadOnly
                                            v-model:value="personInfo.address"
                                            :isReadOnly="isReadOnly"
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
