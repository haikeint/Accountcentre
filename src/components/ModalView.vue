<script lang="ts" setup>
import { onMounted } from 'vue'
import { Modal } from 'bootstrap'

// const props = defineProps({
//   toggle: {
//     type: Boolean,
//     required: true
//   }
// })

const emit = defineEmits(['toggle'])

onMounted(() => {
  const myModal = new Modal(document.getElementById('error-modal') as HTMLElement)
  emit('toggle', myModal)
})
</script>
<template>
  <div class="modal fade" id="error-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
          <button
            class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-0">
          <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
            <h4 class="mb-1" id="modalExampleDemoLabel">Add a new illustration</h4>
          </div>
          <div class="p-4 pb-0">
            <form>
              <div class="mb-3">
                <label class="col-form-label" for="recipient-name">Recipient:</label>

                <input class="form-control" id="recipient-name" type="text" />
              </div>
              <div class="mb-3">
                <label class="col-form-label" for="message-text">Message:</label>

                <textarea class="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>

          <button class="btn btn-primary" type="button">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>
