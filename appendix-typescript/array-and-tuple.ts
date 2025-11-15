const numbers: number[] = [1, 2, 3, 4, 5]; // 숫자 배열
const stringArray: Array<string> = ["a", "b", "c", "d", "e"]; // 문자열 원소

// 스프레드 연산자로 합치기 가능
const oneToTen = [...numbers, ...stringArray];
console.log(oneToTen);

// 객체의 배열 타입
const idols: { name: string; birth: number }[] = [
    { name: "minji", birth: 2004 },
    { name: "danielle", birth: 2005 },
    { name: "hani", birth: 2004 },
    { name: "haerin", birth: 2006 },
    { name: "hyein", birth: 2008 },
];

// 배열의 원소가 객체인 타입
const gameConsoleArray: Array<{ name: string; launch: number }> = [
    { name: "엑스박스 시리즈 X/S", launch: 2020 },
    { name: "플레이스테이션5", launch: 2020 },
    { name: "닌텐도 스위치", launch: 2017 },
    { name: "스팀덱", launch: 2021 },
];

// 튜플은 원소 개수만큼 타입 정의가 필요
const myTuple: [string, number] = ["seungkyoo", 179];

// 튜플은 함수의 매개변수가 여러 개 일 때 유용
function printMyInfo(label: string, info: [string, number]): void {
    console.log(`${label}]`, ...info);
}

// 결과값 : [튜플 테스트] seungkyoo 179
printMyInfo("튜플 테스트", myTuple);

// 튜플을 반환하는 함수
function fetchUser(): [string, number] {
    return ["seungkyoo", 179];
}

// 결과값을 분해해서 받을 수 있음
const [name24, height24] = fetchUser();
console.log(name24, height24);