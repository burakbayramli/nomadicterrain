
const weightedRandom = (array, weights) => {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  return array.find((_, i) => (random -= weights[i]) <= 0);
};

const array = ['react', 'svelte', 'solid', 'qwik']

const weights = [5, 60, 20, 15] //in percentage. Total should be 100

for (var i=0;i<20;i++){
    res = weightedRandom(array, weights);
    console.log(res);
}


