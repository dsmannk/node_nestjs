// function HelloDecorator(constructor: Function) { // 데코레이터 정의
//     console.log(`HELLO!`);
// }

type Constructor = new(...args: any[]) => {}; // 생성자 메서드 타입
function HelloDecorator(constructor: Constructor) {
    return class extends constructor {  // 익명 클래스 반환
        constructor() {                 // 생성자 재정의
            console.log(`HELLO!`);
            super();                    // DecoratorTest의 생성자 실행
        }
    }
}

@HelloDecorator // 데코레이터 실행됨
class DecoratorTest {
    constructor() {
        console.log("인스턴스 생성됨~~~");
    }
}

const decoratorTest = new DecoratorTest();

// 메서드 실행시간을 측정
console.time("실행 시간"); // 실행 시간 측정 시작
execute();
function execute() {
    setTimeout(() => {
        console.log(`실행`);
        console.timeEnd("실행 시간") // 시간 측정 끝
    }, 500);
}

// 실행 시간 측정을 하는 코드를 메서드 데코레이터로 만듬
function Timer() { // 데코레이터 팩토리 함수
    // return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // originalMethod = originalMethod, context = 메서드 이름, 정적/인스턴스 여부 등 메타데이터
    return function <T extends Function>(originalMethod: T, context: ClassMethodDecoratorContext) {
        // 테코레이터
        // const originalMethod = descriptor.value; // 메서드
        // descriptor.value = function(...args: any[]) { // 메서드의 동작을 변경함
        // 리턴값으로 새 함수를 돌려주면, 그게 hello로 대체된다
        return function(this: any, ...args: any[]) { // 메서드의 동작을 변경함
            console.time(`Elapsed time`);
            const result = originalMethod.apply(this, args); // 메서드 실행
            console.timeEnd(`Elapsed time`);
            return result;
        };
    }
}

class ElapsedTime {
    @Timer()
    hello() {
        console.log("hello");
    }
}