// 인터페이스 병합
interface Clock1 {
    time: Date;
}

interface Clock1 {
    brand: string;
}

interface Clock1 {
    price: number;
}

// const wrongClock: Clock1 = { // brand, price 속성이 없어서 에러
//     time: new Date(),
// };

const clock1: Clock1 = { // Clock 인터페이스 병합
    time: new Date(),
    brand: "놀렉스",
    price: 10000,
};