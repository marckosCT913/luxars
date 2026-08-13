const photographers = require('../data/photographers');

// Normaliza para comparar sin tildes: "Gastronomia" == "Gastronomia" (de "Gastronomia")
function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function list(req, res) {
  const { specialty, maxPrice } = req.query;
  let result = photographers;

  if (specialty) {
    const wanted = normalize(specialty);
    result = result.filter(p => normalize(p.specialty) === wanted);
  }
  if (maxPrice !== undefined && maxPrice !== '') {
    const price = Number(maxPrice);
    if (!Number.isNaN(price)) {
      result = result.filter(p => p.price <= price);
    }
  }

  return res.json(result);
}

function detail(req, res) {
  const id = Number(req.params.id);
  const photographer = photographers.find(p => p.id === id);
  if (!photographer) {
    return res.status(404).json({ error: 'Fotografo no encontrado.' });
  }
  return res.json(photographer);
}

module.exports = { list, detail };
