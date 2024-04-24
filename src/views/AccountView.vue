<script lang="ts" setup>
import { Modal } from 'bootstrap'

import Init from '../ts/theme'
import { onMounted } from 'vue'
import NavView from './Account/NavView.vue'
import HeaderView from './Account/HeaderView.vue'
import FooterView from './Account/FooterView.vue'
import ModalView from './Account/ModalView.vue'

onMounted(() => {
  Init()
  if (JSON.parse(localStorage.getItem('isFluid') as string)) {
    var container = document.querySelector('[data-layout]')
    container?.classList.remove('container')
    container?.classList.add('container-fluid')
  }
  let navbarStyle = localStorage.getItem('navbarStyle')
  if (navbarStyle && navbarStyle !== 'transparent') {
    document.querySelector('.navbar-vertical')?.classList.add(`navbar-${navbarStyle}`)
  }

  // let boostrap = new Modal(document.querySelector('#authentication-modal') as HTMLElement)
  // boostrap.show()
})
</script>

<template>
  <main class="main" id="top">
    <div class="container-fluid" data-layout="container">
      <NavView />
      <!-- CONTENT------------------- -->
      <div class="content">
        <HeaderView />
        <RouterView />
        <FooterView />
      </div>

      <div
        class="modal fade"
        id="authentication-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="authentication-modal-label"
        aria-hidden="true"
      >
        <ModalView />
      </div>
    </div>
  </main>
</template>
