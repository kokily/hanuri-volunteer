/** 소개 페이지에 표시할 임원 정보. 나중에 CMS/DB로 옮기기 쉽게 분리 */
export const ABOUT_MEMBERS = [
  {
    id: "chairman",
    /** odd: 텍스트 왼쪽 / 이미지 오른쪽 (lg) */
    layout: "odd" as const,
    role: "하누리 봉사회장",
    name: "한태희",
    body: "어려운 여건 속에서 살아가는 어려운 이웃에게 꿈과 희망을 잃지 않도록 도와주고 지역 공동체를 이루어 함께 행복하게 살 수 있는 세상을 꿈꾸며 사랑과 희망을 주는 봉사를 하겠습니다.",
    image: "/chairman.jpg",
    imageAlt: "하누리 봉사회장 한태희",
    blob: "/svg/blob-light-yellow.svg",
  },
  {
    id: "general",
    /** even: 텍스트·이미지 좌우 반전 */
    layout: "even" as const,
    role: "하누리 사무국장",
    name: "정경숙",
    body: "자원봉사는 나의 열정과 시간, 재능을 어려운 삶을 살고 있는 이웃을 위해 내어 줌으로써 사람들과 어울려 살아가며 나눔의 마음을 배울 수 있는 유일한 행위, 소양이라 생각합니다.",
    image: "/general.jpg",
    imageAlt: "하누리 사무국장 정경숙",
    blob: "/svg/blob-light-purple.svg",
  },
] as const;
