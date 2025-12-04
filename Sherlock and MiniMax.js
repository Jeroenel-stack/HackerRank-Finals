function sherlockAndMinimax(arr, p, q) {
    arr.sort((a, b) => a - b);

    let bestM = p;
    let bestVal = 0;

    function evalCandidate(M) {
        // binary search closest value in arr to M
        let lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < M) lo = mid + 1;
            else hi = mid - 1;
        }

        let closest = Infinity;
        if (lo < arr.length) closest = Math.min(closest, Math.abs(arr[lo] - M));
        if (lo - 1 >= 0) closest = Math.min(closest, Math.abs(arr[lo - 1] - M));

        if (closest > bestVal || (closest === bestVal && M < bestM)) {
            bestVal = closest;
            bestM = M;
        }
    }

    // Always check ends
    evalCandidate(p);
    evalCandidate(q);

    // Check midpoints between neighbors
    for (let i = 0; i < arr.length - 1; i++) {
        const mid = Math.floor((arr[i] + arr[i + 1]) / 2);
        if (mid >= p && mid <= q) {
            evalCandidate(mid);
        } else if (mid < p && p <= arr[i + 1]) {
            evalCandidate(p);
        } else if (mid > q && q >= arr[i]) {
            evalCandidate(q);
        }
    }

    return bestM;
}
