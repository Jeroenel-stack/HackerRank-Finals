function longestIncreasingSubsequence(arr) {
    if (arr.length === 0) return 0;

    const tails = []; // tails[len-1] = smallest tail of an increasing subseq of length len

    for (let x of arr) {
        // find first index i such that tails[i] >= x (lower_bound)
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        if (lo === tails.length) tails.push(x);
        else tails[lo] = x;
    }

    return tails.length;
}
