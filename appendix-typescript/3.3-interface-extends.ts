// 인터페이스 확장하기
interface WebtoonCommon { // 공통으로 사용할 인터페이스
    title: string;
    createdDate: Date;
    updatedDate: Date;
}

interface Episode extends WebtoonCommon { // 에피소드 인터페이스
    episodeNumber: number;
    seriesNumber: number;
}

interface Series extends WebtoonCommon { // 시리즈 인터페이스
    seriesNumber: number;
    author: string;
}

const episode: Episode = { // 에피소드 객체
    title: "나 혼자도 레벨업 1화",
    createdDate: new Date(),
    updatedDate: new Date(),
    episodeNumber: 1,
    seriesNumber: 123,  
};

const series: Series = {
    title: "나 온자도 레벨업",
    createdDate: new Date(),
    updatedDate: new Date(),
    seriesNumber: 123,
    author: "천재작가",
};