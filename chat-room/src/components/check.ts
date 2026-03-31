function sum(a: number, b: number) {
    return a + b;
}

function delayedFunction(fn: (a : number, b: number) => number) {
    setTimeout(() => {
        const result = fn(1, 3);
        console.log(result);
    }, 1000);
}

delayedFunction(sum);