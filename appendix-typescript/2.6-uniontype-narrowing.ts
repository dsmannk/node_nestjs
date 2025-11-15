let anyValue2: number | string | boolean = 10.11111;
printAny(anyValue2);
anyValue2 = 'hello';
printAny(anyValue2);
anyValue2 = true;
printAny(anyValue2);


// 매개변수로 number, string, boolean을 할당할 수 있음
function printAny(value: number | string | boolean): void {
    if (typeof value === 'number') {
        console.log(value.toExponential(3)); // 지수형 함수
    } else if (typeof value === 'string') {
        console.log(value.toUpperCase());
    } else if (typeof value === 'boolean') {
        console.log(value ? 'true' : 'false');
    }
}