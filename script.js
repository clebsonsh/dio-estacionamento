(function () {
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
            render();
        }
        function adicionar(veiculo) {
            salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa == placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
        }
        function render() {
            $('#patio').innerHTML = '';
            const patio = ler();
            patio.forEach(veiculo => {
                const row = document.createElement("tr");
                row.innerHTML = `
          <td>${veiculo.nome}</td>
          <td>${veiculo.placa}</td>
          <td>${veiculo.entrada}</td>
          <td>
            <button class="delete" data-placa="${veiculo.placa}">X</button>
          </td>
        `;
                row.querySelector('.delete').addEventListener('click', function () {
                    remover(this.dataset.placa);
                });
                $('#patio').appendChild(row);
            });
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    $('#cadastrar').addEventListener('click', () => {
        const nome = $('#nome').value;
        const placa = $('#placa').value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() });
    });
})();
