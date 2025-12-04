function morganAndString(a, b) {
    // Sentinel '{' is after 'Z' in ASCII, so it's larger than any uppercase letter
    a += '{';
    b += '{';

    let i = 0, j = 0;
    const out = [];

    while (i < a.length - 1 || j < b.length - 1) { // ignore trailing sentinels
        if (a[i] < b[j]) {
            out.push(a[i++]);
        } else if (a[i] > b[j]) {
            out.push(b[j++]);
        } else {
            // Same char: compare suffixes a[i..] and b[j..]
            let ii = i, jj = j;
            while (a[ii] === b[jj]) {
                ii++;
                jj++;
            }
            if (a[ii] < b[jj]) {
                out.push(a[i++]);
            } else {
                out.push(b[j++]);
            }
        }
    }

    return out.join('');
}
