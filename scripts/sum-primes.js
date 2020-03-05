class SumPrimes {
  isPrimeNumber(num) {
    for (let n = 2; n < num; n++) {
      if (num % n === 0) {
        return false;
      }
    }
    return true;
  }
  sumFirstPrimes(num) {
    let sum = 0;
    let ctr = num;
    let n = 1;
    do {
      if (this.isPrimeNumber(n) && n > 1) {
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
  'Please enter the a number to compute the sum of the first prime numbers: '
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
