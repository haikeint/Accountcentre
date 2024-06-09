const InitValidation = () => {
  const form = document.querySelector('.needs-validation') as HTMLInputElement
  form?.addEventListener(
    'submit',
    function (event: any) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    },
    false
  )
  // })
}

export default InitValidation
