export function decodeEntities(encodedString) {
  const txt = document.createElement("textarea");
  txt.innerHTML = encodedString;
  return txt.value;
}

// Função indicada por Rafael Quinteiro (t05) para decodificar entidade do HTML, por que o react não tá decodando, misteriosamente 