// 제네릭 제약 조건
// 제약 조건에 사용할 인터페이스
interface ICheckLength {
    length: number;
}

// extends : 제약조건 키워드
function echoWithLength<T extends ICheckLength>(message: T) {
    console.log(message);
}

echoWithLength("Hello");
echoWithLength([1, 2, 3]);
echoWithLength({length: 10});
// echoWithLength(10) // 10 length가 없기 때문에 에러 발생