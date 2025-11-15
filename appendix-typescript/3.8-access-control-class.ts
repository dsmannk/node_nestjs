// 부모 클래스
class Parent {
    openInfo = "공개 정보";
    protected lagacy = "유산";
    private parentSecret = "부모의 비밀 정보";

    // private 정보에 접근 가능
    checkMySecret() {
        console.log(this.parentSecret);
    }
}

// 자녀 클래스, 부모 상속
class Child extends Parent {
    private secret = "자녀의 비밀 정보";

    // 자녀는 부모의 protected 확인 가능
    checkLagacy() {
        console.log(this.lagacy);
    }

    // 부모의 private 변수에는 접근 불가능
    checkParentSecret() {
        // console.log(super.parentSecret);
        console.log(super.checkMySecret());
    }
}

class Someone {
    checkPublicInfo() {
        const p = new Parent();
        // 다른 클래스가 public 변수 접근 가능
        console.log(p.openInfo);

        // protected와 private는 접근 불가능
        // console.log(p.lagacy);
        // console.log(p.parentSecret);
    }
}

