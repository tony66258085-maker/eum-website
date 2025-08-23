# E-UM 미디어아트 동아리 웹사이트

미디어아트 동아리 이음의 공식 웹사이트입니다.

## 🎨 특징

- **동적 애니메이션**: Canvas 파티클, 아스키 아트 애니메이션
- **반응형 디자인**: 모바일/데스크톱 최적화
- **성능 최적화**: FPS 모니터링, 자동 성능 조절
- **터치 지원**: 모바일 스와이프 슬라이더

## 🚀 배포 방법

### Vercel (권장)
1. [vercel.com](https://vercel.com) 가입
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 자동 배포 완료!

### GitHub Pages
1. GitHub 저장소 생성
2. Settings → Pages → Source: main branch
3. 자동 배포 완료!

## 📁 파일 구조

```
eum_website/
├── index.html          # 메인 페이지
├── style.css           # 스타일시트
├── script.js           # JavaScript (애니메이션, 인터랙션)
├── vercel.json         # Vercel 배포 설정
└── images/             # 이미지 파일들
```

## 🎯 성능 최적화

- Canvas 애니메이션 최적화
- 스크롤 이벤트 쓰로틀링
- Intersection Observer 사용
- 모바일 성능 자동 조절
- 리소스 프리로딩

## 📱 지원 브라우저

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 개발 환경

- HTML5
- CSS3 (애니메이션, 그리드, 플렉스박스)
- Vanilla JavaScript (ES6+)
- Canvas API
- Intersection Observer API

## 전시 영상과 사진 추가 방법

### 1. 폴더 구조
```
eum_website/
├── videos/                          # 영상 파일들
│   ├── digital-nature-2024.mp4
│   ├── memory-fragment-2023.mp4
│   ├── soundscape-2023.mp4
│   └── interaction-lab-2022.mp4
├── images/
│   └── exhibitions/                 # 전시별 사진들
│       ├── digital-nature-2024/     # 디지털 네이처 2024 전시 사진들
│       │   ├── photo1.jpg
│       │   ├── photo2.jpg
│       │   ├── photo3.jpg
│       │   ├── photo4.jpg
│       │   ├── photo5.jpg
│       │   └── photo6.jpg
│       ├── memory-fragment-2023/    # 메모리 프래그먼트 2023 전시 사진들
│       │   ├── photo1.jpg
│       │   ├── photo2.jpg
│       │   ├── photo3.jpg
│       │   └── photo4.jpg
│       ├── soundscape-2023/         # 사운드 스케이프 2023 전시 사진들
│       │   ├── photo1.jpg
│       │   ├── photo2.jpg
│       │   ├── photo3.jpg
│       │   └── photo4.jpg
│       └── interaction-lab-2022/    # 인터랙션 랩 2022 전시 사진들
│           ├── photo1.jpg
│           ├── photo2.jpg
│           ├── photo3.jpg
│           └── photo4.jpg
```

### 2. 영상 파일 추가 방법

#### 지원하는 영상 형식
- **MP4** (권장): 가장 널리 지원되는 형식
- **WebM**: 웹 최적화 형식
- **OGG**: 오픈 소스 형식

#### 영상 파일 권장 사양
- **해상도**: 1280x720 (HD) 또는 1920x1080 (Full HD)
- **코덱**: H.264 (MP4), VP8/VP9 (WebM)
- **파일 크기**: 웹 최적화를 위해 10MB 이하 권장
- **길이**: 1-3분 정도의 짧은 영상 권장

#### 영상 파일 추가 단계
1. 영상 파일을 `videos/` 폴더에 저장
2. 파일명을 전시명에 맞게 변경 (예: `digital-nature-2024.mp4`)
3. `script.js` 파일에서 해당 전시의 `video` 경로 확인

### 3. 사진 파일 추가 방법

#### 지원하는 이미지 형식
- **JPG/JPEG** (권장): 사진에 적합, 압축률 좋음
- **PNG**: 투명도가 필요한 경우
- **WebP**: 최신 웹 최적화 형식

#### 이미지 파일 권장 사양
- **해상도**: 800x600 또는 1200x900 (4:3 비율)
- **파일 크기**: 각 이미지 500KB 이하 권장
- **품질**: 웹용으로 최적화 (70-80% 품질)

#### 사진 파일 추가 단계
1. 전시별 폴더에 사진 파일들을 저장
2. 파일명을 `photo1.jpg`, `photo2.jpg` 형식으로 변경
3. `script.js` 파일에서 해당 전시의 `photos` 배열 확인

### 4. 코드에서 파일 경로 설정

#### 영상 파일 경로 설정
```javascript
// script.js 파일에서
const exhibitionData = {
    current: {
        // ... 다른 정보들
        video: './videos/digital-nature-2024.mp4',  // 영상 파일 경로
        // ...
    }
};
```

#### 사진 파일 경로 설정
```javascript
// script.js 파일에서
const exhibitionData = {
    current: {
        // ... 다른 정보들
        photos: [
            { src: './images/exhibitions/digital-nature-2024/photo1.jpg', alt: '전시장 전경' },
            { src: './images/exhibitions/digital-nature-2024/photo2.jpg', alt: '인터랙티브 설치 작품' },
            // ... 더 많은 사진들
        ]
    }
};
```

### 5. 새로운 전시 추가 방법

1. **폴더 생성**: `images/exhibitions/새전시명/` 폴더 생성
2. **파일 추가**: 영상과 사진 파일들을 해당 폴더에 저장
3. **JavaScript 수정**: `script.js`의 `exhibitionData`에 새 전시 정보 추가
4. **HTML 수정**: `index.html`에 새 전시 카드 추가

#### 새 전시 데이터 예시
```javascript
newExhibition: {
    title: '새로운 전시 제목',
    period: '2024.05.01 - 2024.06.30',
    location: '전시 장소',
    description: '전시에 대한 상세한 설명...',
    video: './videos/new-exhibition.mp4',
    photos: [
        { src: './images/exhibitions/new-exhibition/photo1.jpg', alt: '사진 설명' },
        { src: './images/exhibitions/new-exhibition/photo2.jpg', alt: '사진 설명' },
        // ... 더 많은 사진들
    ]
}
```

### 6. 파일 최적화 팁

#### 영상 최적화
- **HandBrake** 또는 **FFmpeg** 사용하여 압축
- **온라인 도구**: CloudConvert, Online Video Converter
- **웹 최적화**: 웹용으로 인코딩된 영상 사용

#### 이미지 최적화
- **온라인 도구**: TinyPNG, Compressor.io
- **포토샵**: "웹용으로 저장" 기능 사용
- **이미지 리사이징**: 적절한 크기로 리사이징

### 7. 주의사항

- **파일 크기**: 웹사이트 로딩 속도를 위해 파일 크기 최적화
- **저작권**: 사용할 영상과 사진의 저작권 확인
- **백업**: 원본 파일은 별도로 보관
- **테스트**: 파일 추가 후 웹사이트에서 정상 작동 확인

### 8. 문제 해결

#### 영상이 재생되지 않는 경우
- 파일 형식 확인 (MP4 권장)
- 파일 경로 확인
- 브라우저 개발자 도구에서 오류 메시지 확인

#### 사진이 표시되지 않는 경우
- 파일 경로 확인
- 파일명과 확장자 확인
- 이미지 파일 손상 여부 확인
