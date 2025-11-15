// 맵드 타입
type Feature = { // 기능을 표현한 타입
    event: string;
    coupon: string;
}

type FeaturePermission = { // 해당 기능에 대한 권한을 표현한 타입
    event?: boolean;
    coupon?: boolean;
}

// 맵드 타입으로 변경 (key in keyof "event" | "coupon" ]?: boolean } 과 같음
type FeaturePermission2 = { [key in keyof Feature]?: boolean };

// 선택 속성으로 바꾸고 싶을 때의 유틸리티 타입은 Partial이며, 읽기 전용은 Readonly
// 선택 가능 속성으로 모두 변경
type PartialFeature = Partial<Feature>;

// 읽기 전용으로 변경
type ReadonlyFeature = Readonly<Feature>;

// PartialFeature는 다음과 같이 모든 속성이 ?가 붙은 선택 속성으로 변경되었습니다.
// type PartialFeature = {
//     event?: string | undefined;
//     coupon?: string | undefined;
// }

// ReadonlyFeature 는 모든 속성이 readonly가 붙은 읽기 전용으로 변경되었습니다.
// type ReadonlyFeature = {
//     readonly event: string;
//     readonly coupon: string;
// }

// 예시1 : Partial 사용 예제: 선택적 속성 덩어리를 받아서 업데이트 적용
function updateFeature(base: Feature, update: PartialFeature): Feature {
    return { ...base, ...update };
}

const initialFeature: Feature = {
    event: "EVENT-1234",
    coupon: "COUPON-AAA",
};

const patch: PartialFeature = {
    coupon: "COUPON-NEW",   // event는 없어도 OK
};

const updated = updateFeature(initialFeature, patch);
console.log("Updated Feature: ", updated, "\n");

// 예시2 : Readonly 사용 예제: 한 번 만들어진 값을 불변으로 유지하는 경우
const readonlyFeature: ReadonlyFeature = {
    event: "EVENT-1234",
    coupon: "COUPON-AAA",
};

console.log("Readonly Feature: ", readonlyFeature.event);