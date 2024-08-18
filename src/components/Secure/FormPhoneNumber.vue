<script lang="ts" setup>
import { reactive } from 'vue'
import InputText from '../Util/InputText.vue'
import LabelComp from '../Util/LabelComp.vue'
const phoneNumber = reactive({
    old: '',
    new: ''
})
</script>
<template>
    <div class="row">
        <div
            class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
        ></div>
        <div class="col-md-6 col-sm-9">
            <div class="mb-3">
                <LabelComp to="phongnumber-current" text="Số điện thoại cũ"></LabelComp>
                <InputText
                    id="phongnumber-current"
                    placeholder="0123123123"
                    v-model:value="phoneNumber.old"
                ></InputText>
            </div>
            <div class="mb-3">
                <LabelComp to="phongnumber-new" text="Số điện thoại mới"></LabelComp>
                <InputText
                    id="phongnumber-new"
                    placeholder="0123123123"
                    v-model:value="phoneNumber.new"
                ></InputText>
            </div>
            <button class="btn btn-danger rounded-pill">Cập nhật</button>
        </div>
    </div>
</template>
