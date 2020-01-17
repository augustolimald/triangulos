document.querySelectorAll('input[type=number]').forEach(element => {
  element.onchange = () => refresh();
});

async function makeRequest(endpoint, data) {
  try {
    const response = await axios({
      url: `/api/${endpoint}`,
      method: 'POST',
      data,
    });

    return response;
  } catch (err) {
    return err.response;
  }
}

async function refresh() {
  const lados = Array.from(document.querySelectorAll('input[type=number]')).map(element => parseFloat(element.value) || null);
  
  const verificacao = await makeRequest('verificacao', { lados })
  const status = document.getElementById('status');
  status.innerHTML = verificacao.data.mensagem || 'Erro';
  status.style = `color: ${verificacao.status === 200 ? 'green': 'red'}`;

  const area = await makeRequest('area', { lados });
  document.getElementById('area').innerHTML = area.status === 200 ? area.data.area : '-';

  const perimetro = await makeRequest('perimetro', { lados });
  document.getElementById('perimetro').innerHTML = perimetro.status === 200 ? perimetro.data.perimetro : '-';

  const tipo = await makeRequest('tipo', { lados });
  document.getElementById('tipo').innerHTML = area.status === 200 ? tipo.data.tipo : '-';
}
