function matrixRotation(matrix, r) {
    const m = matrix.length;
    const n = matrix[0].length;
    const k = Math.min(m, n) / 2;
    const rotated = [];

    // Extract layers
    for (let i = 0; i < k; i++) {
        const arr = [];
        for (let j = i; j < n - 1 - i; j++) arr.push(matrix[i][j]);
        for (let j = i; j < m - 1 - i; j++) arr.push(matrix[j][n - 1 - i]);
        for (let j = n - 1 - i; j > i; j--) arr.push(matrix[m - 1 - i][j]);
        for (let j = m - 1 - i; j > i; j--) arr.push(matrix[j][i]);
        rotated.push(arr);
    }

    // Rotate layers and copy back to matrix
    for (let i = 0; i < k; i++) {
        const layer = rotated[i];
        let idx = r % layer.length, curr = 0;
        for (let j = i; j < n - 1 - i; j++) matrix[i][j] = layer[idx++ % layer.length];
        for (let j = i; j < m - 1 - i; j++) matrix[j][n - 1 - i] = layer[idx++ % layer.length];
        for (let j = n - 1 - i; j > i; j--) matrix[m - 1 - i][j] = layer[idx++ % layer.length];
        for (let j = m - 1 - i; j > i; j--) matrix[j][i] = layer[idx++ % layer.length];
    }

    // Print result as required by HackerRank
    matrix.forEach(row => console.log(row.join(' ')));
}
