/*
Filename: sophisticated_code.js

This code implements a sophisticated algorithm for finding prime numbers within a given range using the Sieve of Eratosthenes. It generates a list of prime numbers up to a given maximum limit and provides utility functions for checking primality and finding prime factors of a number. The code also includes an example usage section at the end.

Author: [Your Name]
Date: [Current Date]
*/

// Sieve of Eratosthenes algorithm
function sieveOfEratosthenes(limit) {
    // Initialize an array with all numbers from 2 to limit
    let numbers = [];
    for (let i = 2; i <= limit; i++) {
        numbers.push(i);
    }

    // Find prime numbers
    for (let i = 0; i < numbers.length; i++) {
        let currentNumber = numbers[i];
        if (currentNumber === null) continue;
        let multiple = currentNumber;
        while (multiple <= limit) {
            multiple += currentNumber;
            if (numbers.indexOf(multiple) !== -1) {
                numbers[numbers.indexOf(multiple)] = null;
            }
        }
    }
    
    // Filter out null (non-prime) values
    let primes = numbers.filter(n => n !== null);
    
    return primes;
}

// Check if a number is prime
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    let divisor = 5;
    while (divisor * divisor <= number) {
        if (number % divisor === 0 || number % (divisor + 2) === 0) {
            return false;
        }
        divisor += 6;
    }
    
    return true;
}

// Get prime factors of a number
function getPrimeFactors(number) {
    let factors = [];
    
    while (number % 2 === 0) {
        factors.push(2);
        number /= 2;
    }
    
    let factor = 3;
    while (factor * factor <= number) {
        if (number % factor === 0) {
            factors.push(factor);
            number /= factor;
        } else {
            factor += 2;
        }
    }
    
    if (number > 2) {
        factors.push(number);
    }
    
    return factors;
}

// Example usage
let maximumLimit = 100;
let primes = sieveOfEratosthenes(maximumLimit);
console.log(`Prime numbers up to ${maximumLimit}:`, primes);

let numberToCheck = 57;
console.log(`${numberToCheck} is prime:`, isPrime(numberToCheck));

let numberToFactorize = 84;
console.log(`Prime factors of ${numberToFactorize}:`, getPrimeFactors(numberToFactorize));

// ... rest of the code exceeding 200 lines