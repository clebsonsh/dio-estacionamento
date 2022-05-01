(function() {
  const $ = (query: string) => document.querySelector(query) as HTMLInputElement

  $('#cadastrar').addEventListener('click', () => {
    const nome = $('#nome').value
    const placa = $('#placa').value

    if (!nome || !placa) {
      alert("Os campos nome e placa são obrigatórios")
      return
    }
  })
})()