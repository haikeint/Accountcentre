<template>
  <div id="liveAlertPlaceholder">
    <div
      class="alert alert-success alert-dismissible border-0 d-flex align-items-center alert-custom border-success"
      role="alert"
    >
      <div class="bg-success me-3 icon-item">
        <span class="fas fa-check-circle text-white fs-6"></span>
      </div>
      <p class="mb-0 flex-1">A simple success alert—check it out!</p>
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div
      class="alert alert-danger alert-dismissible border-0 d-flex align-items-center alert-custom border-danger"
      role="alert"
    >
      <div class="bg-danger me-3 icon-item">
        <span class="fas fa-times-circle text-white fs-6"></span>
      </div>
      <p class="mb-0 flex-1">A simple success alert—check it out!</p>
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> asdasdasd
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>
<style scoped>
#liveAlertPlaceholder {
  position: absolute;
  top: 4rem;
  right: 0;
}
.border-success {
  border: solid 1px #00d27a !important;
  color: #00d27a;
}
.border-danger {
  color: #e63757;
  border: solid 1px #e63757 !important;
}
.alert-custom {
  padding: 0.5rem;
  font-weight: bold;
  /* --falcon-bg-opacity: 1;
  background-color: rgba(var(--falcon-danger-rgb), var(--falcon-bg-opacity)) !important; */
}

.alert-custom .bg-danger svg {
  background-color: rgba(var(--falcon-danger-rgb), var(--falcon-bg-opacity)) !important;
}

.alert-custom .btn-close {
  /* border: unset; */
  margin-left: 1rem;
}
</style>
