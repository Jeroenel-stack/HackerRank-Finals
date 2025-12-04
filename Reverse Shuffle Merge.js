function reverseShuffleMerge(s) {
    const n = s.length;
    const freq = Array(26).fill(0);

    // total frequency of each char
    for (let ch of s) freq[ch.charCodeAt(0) - 97]++;

    const need = freq.map(f => f / 2);      // how many we must take
    const remain = [...freq];              // how many still left to see

    const stack = [];

    // traverse from end so we actually build A (not reverse(A))
    for (let i = n - 1; i >= 0; i--) {
        const c = s[i];
        const idx = c.charCodeAt(0) - 97;
        remain[idx]--;

        // if we don't need this char anymore, skip it
        if (need[idx] === 0) continue;

        // maintain lexicographically smallest stack
        while (
            stack.length > 0 &&
            stack[stack.length - 1] > c
        ) {
            const topIdx = stack[stack.length - 1].charCodeAt(0) - 97;
            // can we put this popped char later? only if some remain
            if (remain[topIdx] <= need[topIdx]) break;
            stack.pop();
            need[topIdx]++;
        }

        stack.push(c);
        need[idx]--;
    }

    return stack.join('');
}
