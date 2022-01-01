const calcTime = (func, query) => {
    try {
        let time = performance.now();
        const factorial = func(query.number);
        time = performance.now() - time; 
        return { result: { data: { factorial: factorial, time: +time.toFixed(5) }, status: 201 } };
    }
    catch (e) {
        return { error: { status: 500, data: e.message } }
    }
}
const cycleFactorial = (number) => {
    let factorial = 1;
    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}

const recursionFactorial = (number) => (number != 1) ? number * recursionFactorial(number - 1) : 1;

module.exports = { calcTime, cycleFactorial, recursionFactorial };