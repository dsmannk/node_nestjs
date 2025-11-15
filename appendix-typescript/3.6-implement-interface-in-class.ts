interface IClicker {
    count: number;
    click(): number;
}

class Clicker implements IClicker {
    // count의 기본값(0)을 설정
    count: number = 0;

    click(): number {
        this.count += 1;
        console.log(`Click! [count] : ${this.count}`);
        return this.count;
    }
}

const clicker = new Clicker();
clicker.click(); // Click! [count] : 1
clicker.click(); // Click! [count] : 2
clicker.click(); // Click! [count] : 3
