// 함수 타입

function echo(message: string): string {
    console.log(message);
    return message;
}

type Echo = (message: string) => string;
const funcEcho: Echo = echo;

type FuncEcho3 = {
    (message: string): string; // => 가 없는 것에 주의
};
const funcEcho3: FuncEcho3 = echo;
funcEcho3("test3"); // 함수의 타입을 자동으로 추론해 실행
// funcEcho3(123); // 매개변수가 문자열이 아니므로 타입 에러

