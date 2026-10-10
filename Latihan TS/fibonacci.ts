function fibonacci(n: number): number[] {
    const result: number[] = [];

    for (let i = 0; i < n; i++) {
        if (i === 0) {
            result.push(0);
        } else if (i === 1) {
            result.push(1);
        } else {
            result.push(result[i - 1] + result[i - 2]);
        }
    }

    return result;
}

console.log(fibonacci(10));