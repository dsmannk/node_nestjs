let anyValue: any = 123;
anyValue = 'abc';
anyValue = true;


// 결과값이 없음
function print(value: any): void {
    console.log(value);
}

// 예외를 던짐
function throwError(message: string): never {
    throw new Error(message);
}

// 무한 루프
function infiniteLoop(): never {
    while (true) {}
}