function shortestReach(n, edges, s) {
    // Build adjacency list (1-based nodes)
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    const INF = 1e18;
    const dist = Array(n + 1).fill(INF);
    const visited = Array(n + 1).fill(false);
    dist[s] = 0;

    // Min-heap priority queue: [distance, node]
    const heap = [];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        if (heap.length === 0) return null;
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                let l = 2 * i + 1, r = 2 * i + 2, smallest = i;
                if (l < heap.length && heap[l][0] < heap[smallest][0]) smallest = l;
                if (r < heap.length && heap[r][0] < heap[smallest][0]) smallest = r;
                if (smallest === i) break;
                [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
                i = smallest;
            }
        }
        return top;
    };

    push([0, s]);

    while (heap.length) {
        const [d, u] = pop();
        if (visited[u]) continue;
        visited[u] = true;

        for (const [v, w] of adj[u]) {
            if (!visited[v] && d + w < dist[v]) {
                dist[v] = d + w;
                push([dist[v], v]);
            }
        }
    }

    const ans = [];
    for (let i = 1; i <= n; i++) {
        if (i === s) continue;
        ans.push(dist[i] === INF ? -1 : dist[i]);
    }
    return ans;
}
