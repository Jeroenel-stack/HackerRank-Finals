'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'maximumSum' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY a
 *  2. LONG_INTEGER m
 */

function maximumSum(a, m) {
    const prefix = [];
    let maxSum = 0;
    let sum = 0;

    for (let num of a) {
        sum = (sum + num % m) % m;
        prefix.push(sum);
    }

    // Balanced BST alternative simulation using sorted prefix array
    const sorted = [];
    for (let p of prefix) {
        // Find insertion index via binary search
        let index = binarySearch(sorted, p);
        if (index < sorted.length) {
            maxSum = Math.max(maxSum, (p - sorted[index] + m) % m);
        }
        maxSum = Math.max(maxSum, p);
        sorted.splice(index, 0, p);
    }

    return maxSum;
}

// Binary search to find the first index with value > target
function binarySearch(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

        const result = maximumSum(a, m);

        ws.write(result + '\n');
    }

    ws.end();
}
