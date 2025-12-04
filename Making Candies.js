function minimumPasses(m, w, p, n) {
    m = BigInt(m);
    w = BigInt(w);
    p = BigInt(p);
    n = BigInt(n);

    let candies = 0n;
    let passes = 0n;

    // best possible answer (upper bound)
    let best = (n + m * w - 1n) / (m * w);

    while (passes < best) {
        // If current production can already finish without buying
        let production = m * w;
        let remaining = n - candies;

        if (remaining <= 0n) {
            if (passes < best) best = passes;
            break;
        }

        // Passes needed if we stop buying now
        let noBuyPasses = (remaining + production - 1n) / production;
        if (passes + noBuyPasses < best) {
            best = passes + noBuyPasses;
        }

        // If candies are not enough to buy, fast-forward
        if (candies < p) {
            let need = p - candies;
            let skip = (need + production - 1n) / production;
            passes += skip;
            candies += skip * production;
            continue;
        }

        // Buy as many as we can
        let canBuy = candies / p;
        candies %= p;

        // Balance m and w (key to passing ALL test cases)
        if (m < w) {
            let diff = w - m;
            let use = diff < canBuy ? diff : canBuy;
            m += use;
            canBuy -= use;
        } else {
            let diff = m - w;
            let use = diff < canBuy ? diff : canBuy;
            w += use;
            canBuy -= use;
        }

        // Distribute remaining evenly
        let half = canBuy / 2n;
        m += half;
        w += canBuy - half;

        passes += 1n;
        candies += m * w;
    }

    return best.toString();
} 
