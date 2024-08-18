<script lang="ts" setup>
import { reactive } from 'vue'
import InputText from '../Util/InputText.vue'
import LabelComp from '../Util/LabelComp.vue'
const password = reactive({
    old: '',
    new: '',
    repeat: ''
})
</script>
<template>
    <div class="row">
        <div
            class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
        ></div>
        <div class="col-md-6 col-sm-9">
            <div class="mb-3">
                <LabelComp to="password-current" text="Mật khẩu hiện tại"></LabelComp>
                <InputText
                    id="password-current"
                    placeholder="ABCabc@123"
                    v-model:value="password.old"
                ></InputText>
            </div>
            <div class="mb-3">
                <LabelComp to="password-new" text="Mật khẩu mới"></LabelComp>
                <InputText
                    id="password-new"
                    placeholder="ABCabc@123"
                    v-model:value="password.new"
                ></InputText>
            </div>
            <div class="mb-3">
                <LabelComp to="password-repeat" text="Nhập lại mật khẩu"></LabelComp>
                <InputText
                    id="password-repeat"
                    placeholder="ABCabc@123"
                    v-model:value="password.repeat"
                ></InputText>
            </div>
            <button class="btn btn-danger rounded-pill">Cập nhật</button>
        </div>
    </div>
</template>
