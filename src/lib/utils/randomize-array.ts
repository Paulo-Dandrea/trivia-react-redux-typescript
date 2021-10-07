// ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function randomizeArray(array: string[]){
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = a;
  }
  return arrayCopy;
}
