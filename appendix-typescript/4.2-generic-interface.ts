// 제네릭 인터페이스
interface ILabel<T> {
    label: T;
}

const stringLabel:ILabel<string> = {
    label: "Hello"
}

const numberLabel:ILabel<number> = {
    label: 100
}

// const booleanLabel:ILabel<boolean> = {
//     label: 3.14 // 컴파일 에러 boolean에 number를 넣을 수 없음
// }
