function insertionSort(arr) {
    // returns number of shifts (inversions)
    function mergeCount(a) {
        const n = a.length;
        if (n <= 1) return { arr: a, inv: 0n };

        const mid = Math.floor(n / 2);
        const left = mergeCount(a.slice(0, mid));
        const right = mergeCount(a.slice(mid));

        const merged = [];
        let i = 0, j = 0;
        let inv = left.inv + right.inv;

        while (i < left.arr.length && j < right.arr.length) {
            if (left.arr[i] <= right.arr[j]) {
                merged.push(left.arr[i++]);
            } else {
                merged.push(right.arr[j++]);
                inv += BigInt(left.arr.length - i); // all remaining left elements form inversions
            }
        }
        while (i < left.arr.length) merged.push(left.arr[i++]);
        while (j < right.arr.length) merged.push(right.arr[j++]);

        return { arr: merged, inv };
    }

    const result = mergeCount(arr);
    return Number(result.inv);
}
