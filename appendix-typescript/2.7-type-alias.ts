// 타입 별칭
type nsb = number | string | boolean;

let anyValue3: nsb = 10;
anyValue3 = 'hello';
anyValue3 = true;
//anyValue3 = null; // 컴파일 에러

// 타입 별칭에 null, undefined 추가
type nullableNsb = nsb | null;

let nullableValue: nullableNsb = null;
nullableValue = 20;
nullableValue = 'world';
nullableValue = false;
// nullableValue = undefined; // 컴파일 에러