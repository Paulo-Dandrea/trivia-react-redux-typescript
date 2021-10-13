export function decodeEntities(encodedString: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = encodedString;
  return txt.value;
}