// 인터섹션 타입

type cup = {
    size: string;
};

type brand = {
    brandName: string;
};

type brandedCup = cup & brand; // cup이면서 brand가 있는 타입

let starbucksGrandeSizeCup: brandedCup = {
    brandName: "스타벅스",
    size: "grande",
}