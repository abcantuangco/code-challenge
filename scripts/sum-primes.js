class SumPrimes {
  isPrimeNumber(num) {
    for (let c = 2, n = Math.sqrt(num); c <= n; c++)
      if (num % c === 0) return false;
    return num > 1;
  }
  sumFirstPrimes(num) {
    let sum = 0;
    let ctr = num;
    let n = 1;
    do {
      if (this.isPrimeNumber(n)) {
        sum += n;
        ctr--;
      }
      n++;
    } while (ctr > 0);

    return sum;
  }
}

const input = process.stdin;

console.log(
  'Enter a number to compute the sum of the first prime numbers of that number: '
);

input.on('data', function(data) {
  if (data === 'exit\n') {
    process.exit();
  } else {
    let sumPrimes = new SumPrimes();
    console.time('Execution Time');
    let sum = sumPrimes.sumFirstPrimes(data);
    console.log('------------------------------------');
    console.log(`Summation of the first ${data} prime numbers:`, sum);
    console.timeEnd('Execution Time');
    console.log('------------------------------------');
    process.exit();
  }
});
