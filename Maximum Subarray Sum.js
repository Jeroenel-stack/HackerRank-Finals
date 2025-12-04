function maximumSum(a, m) {
    const M = BigInt(m);
    const n = a.length;

    let prefix = 0n;
    let best = 0n;
    const S = [];

    for (let i = 0; i < n; i++) {
        const raw = typeof a[i] === 'bigint' ? a[i] : BigInt(a[i]);
        const val = ((raw % M) + M) % M;
        prefix = (prefix + val) % M;

        if (prefix > best) best = prefix;

        let lo = 0, hi = S.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (S[mid] > prefix) hi = mid;
            else lo = mid + 1;
        }

        if (lo < S.length) {
            const cand = (prefix - S[lo] + M) % M;
            if (cand > best) best = cand;
        }

        let l = 0, r = S.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (S[mid] < prefix) l = mid + 1;
            else r = mid;
        }
        S.splice(l, 0, prefix);
    }

    return Number(best);
}
