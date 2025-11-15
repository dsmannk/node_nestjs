// 타입스크립트의 고급 기능
// 제네릭 함수
function echo(message: any): any {
    console.log("in echo : ", message);
    return message;
}

type phone = {
    name: string;
    price: number;
    brand: string;
}

const myPhone = {name: "iPhone", price: 10000, brand: "Apple"}
echo(1);
echo("안녕");
echo(myPhone);


// 제네릭을 활용한 함수
function genericEcho<T>(message: T): T {
    console.log(message);
    return message;
}

genericEcho(1); // 타입을 명시하지 않으면 컴파일러가 타입 추론
genericEcho<string>("안녕"); // 타입을 명시적으로 지정
genericEcho<any>(myPhone); // any를 타입으로 넣으면 제네릭을 쓸 이유가 없음
// genericEcho<string>(myPhone); // ERROR 타입이 달라서 에러 발생
    
