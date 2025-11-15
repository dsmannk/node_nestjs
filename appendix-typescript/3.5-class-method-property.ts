class Hello { // 클래스 선언부
    // 생성자 메서드
    constructor() {
        this.sayHello("created");
    }

    // 메서드
    sayHello(message: string) {
        console.log(`Hello ${message}!`);
    }
}

// Hello 클래스의 인스턴스 생성
const hello = new Hello();
hello.sayHello("world");


class Rectangle {
    width: number; // 클래스 변수, 가로를 의미
    height: number; // 클래스 변수, 세로를 의미

    // 클래스 생성 시 가로, 세로 값을 넣어줌
    constructor(width: number, height: number) {
        // this.width는 클래스 변수이며 width는 매개변수로 받은 값을 담은 변수
        this.width = width;
        this.height = height;
    }

    // 반환 타입은 number 타입
    getArea() {
        return this.width * this.height;
    }
}

// 클래스 인스턴스 생성
const rectangle = new Rectangle(10, 5);

// getArea() 메서드 실행
rectangle.getArea();