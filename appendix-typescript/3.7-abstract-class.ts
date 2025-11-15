abstract class Logger { // abstract 키워드가 있으면 추상 클래스
    prepare() {
        console.log("============================");
        console.log("로그를 남기기 위한 준비");
    }

    // 로그를 남기는 절차를 정의한 메서드
    log(message: string) {
        this.prepare();
        this.execute(message);
        this.complete();
    }

    // 추상 메서드
    abstract execute(message: string): void;

    complete() {
        console.log("작업 완료");
        console.log("");
    }
}

// 추상 클래스는 상속해 사용
class FileLogger extends Logger {
    filename: string;

    // 상속을 받은 경우, 기본 생성자가 아니라면 super()를 먼저 실행
    constructor(filename: string) {
        super();
        this.filename = filename;
    }

    // 추상 메서드 구현
    execute(message: string): void {
        // 파일에 직접 쓰지는 않지만 쓴다고 가정
        console.log(`[${this.filename}] > `, message);
    }
}

class ConsoleLogger extends Logger {
    // 추상 메서드 구현
    execute(message: string): void {
        console.log(message);
    }
}

const fileLogger = new FileLogger("test.log");
fileLogger.log("파일에 로그 남기기 테스트");

const consoleLogger = new ConsoleLogger();
consoleLogger.log("로그 남기기");