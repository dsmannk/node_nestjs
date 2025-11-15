// 인터페이스와 타입
type BookType = {   // BookType 타입
    title: string;
    price: number;
    author: string;
}

interface Book {    // Book 인터페이스
    title: string;
    price: number;
    author: string;
}

let bookType: BookType = { // BookType 타입 객체 할당
    title: "백엔드 개발자 되기",
    price: 10000,
    author: "세미",
};

let book: Book = {  // Book 인터페이스 객체 할당
    title: "백엔드 개발자 되기",
    price: 10000,
    author: "세미",
};

interface Car {
    name: string;
    price: number;
    brand: string;
    options?: string[]; // 차량의 옵션은 선택적 속성
}

let avante: Car = { // 아반떼에는 에어컨과 내비게이션의 옵션이 있음
    name: "아반떼",
    price: 1500,
    brand: "현대",
    options: ['에어컨', '내비게이션'],
}

let morning: Car = { // 모닝은 아무런 옵션이 없음
    name: "모닝",
    price: 650,
    brand: "기아",
}

interface Citizen { // 시민을 의미하는 인터페이스 정의
    id: string;
    name: string;
    region: string;
    readonly age: number; // 나이는 변경할 수 없음
}

let seming: Citizen = { // Citizen 인터페이스 객체 생성
    id: "123456",
    name: "세미",
    region: "서울",
    age: 45,
};

// seming.age = 35; // age 속성은 읽기 전용(read-only)이므로 에러

