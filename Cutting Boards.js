function boardCutting(cost_y, cost_x) {
    const MOD = 1000000007n;

    // Sort descending
    cost_y.sort((a, b) => b - a);
    cost_x.sort((a, b) => b - a);

    let i = 0; // index in cost_y (horizontal cuts)
    let j = 0; // index in cost_x (vertical cuts)

    let hSeg = 1n; // current horizontal segments
    let vSeg = 1n; // current vertical segments
    let total = 0n;

    while (i < cost_y.length && j < cost_x.length) {
        if (cost_y[i] >= cost_x[j]) {
            // take horizontal cut
            const c = BigInt(cost_y[i]);
            total = (total + c * vSeg) % MOD;
            hSeg += 1n;
            i++;
        } else {
            // take vertical cut
            const c = BigInt(cost_x[j]);
            total = (total + c * hSeg) % MOD;
            vSeg += 1n;
            j++;
        }
    }

    // remaining horizontal cuts
    while (i < cost_y.length) {
        const c = BigInt(cost_y[i]);
        total = (total + c * vSeg) % MOD;
        hSeg += 1n;
        i++;
    }

    // remaining vertical cuts
    while (j < cost_x.length) {
        const c = BigInt(cost_x[j]);
        total = (total + c * hSeg) % MOD;
        vSeg += 1n;
        j++;
    }

    return Number(total % MOD);
}
