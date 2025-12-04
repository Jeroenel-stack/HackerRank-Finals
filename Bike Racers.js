'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the bikeRacers function below.
 */
function bikeRacers(bikers, bikes, K) {

    function maxBipartiteMatch(matrix, isConnected) {
        function hasMatch(u) {
            for (var v = 0; v < M; v++) {
                if (isConnected(matrix[u][v]) && !visited[v]) {
                    visited[v] = 1;

                    if (matches[v] === -1 || hasMatch(matches[v])) {
                        matches[v] = u;
                        return true;
                    }
                }
            }
            return false;
        }
        var N = matrix.length;
        var M = matrix[0].length;
        var visited = new Array(M);
        var matches = new Array(M);
        var res = 0;
        isConnected = isConnected || function (x) { return x };
        for (var i = 0; i < M; i++) {
            matches[i] = -1;
        }
        for (var u = 0; u < N; u++) {
            for (var k = 0; k < M; k++) {
                visited[k] = 0;
            }
            if (hasMatch(u)) {
                res++;
            }
        }
        return res;
    }

    var origMatrix = [];
    var workMatrix = [];
    var sortArr = [];

    for (var i = 0; i < bikers.length; i++) {
        origMatrix[i] = [];
        workMatrix[i] = [];
        for (var j = 0; j < bikes.length; j++) {
            var v = Math.pow(Math.abs(bikers[i][0] - bikes[j][0]), 2) + Math.pow(Math.abs(bikers[i][1] - bikes[j][1]), 2)
            origMatrix[i][j] = v;
            workMatrix[i][j] = v;
            sortArr.push(v);
        }
    }
    sortArr.sort((a, b) => a - b);
    var left = 0;
    var mid = 0;
    var right = sortArr.length - 1;
    var ans = sortArr[right];
    while (left <= right) {
        mid = left + Math.ceil((right - left) / 2);
        for (var i = 0; i < bikers.length; i++) {
            for (var j = 0; j < bikes.length; j++) {
                if (origMatrix[i][j] <= sortArr[mid]) {
                    workMatrix[i][j] = 0;
                } else {
                    workMatrix[i][j] = origMatrix[i][j];
                }
            }
        }
        var matchN = maxBipartiteMatch(workMatrix, (x) => !x);
        if (matchN < K) {
            left = mid + 1;
        } else {
            right = mid - 1;
            ans = Math.min(ans, sortArr[mid]);
        }
    }
    return ans;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nmk = readLine().split(' ');

    const n = parseInt(nmk[0], 10);

    const m = parseInt(nmk[1], 10);

    const k = parseInt(nmk[2], 10);

    let bikers = Array(n);

    for (let bikersRowItr = 0; bikersRowItr < n; bikersRowItr++) {
        bikers[bikersRowItr] = readLine().split(' ').map(bikersTemp => parseInt(bikersTemp, 10));
    }

    let bikes = Array(m);

    for (let bikesRowItr = 0; bikesRowItr < m; bikesRowItr++) {
        bikes[bikesRowItr] = readLine().split(' ').map(bikesTemp => parseInt(bikesTemp, 10));
    }

    let result = bikeRacers(bikers, bikes, k);

    ws.write(result + "\n");

    ws.end();
}
