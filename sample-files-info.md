# 샘플 파일 생성 및 실제 파일 추가 가이드

## 현재 상태
- 폴더 구조가 생성되었습니다
- 코드에서 실제 파일 경로로 설정되었습니다
- 실제 영상과 사진 파일을 추가하면 바로 작동합니다

## 실제 파일 추가 방법

### 1. 영상 파일 추가
1. `videos/` 폴더에 영상 파일을 저장
2. 파일명을 다음과 같이 변경:
   - `digital-nature-2024.mp4`
   - `memory-fragment-2023.mp4`
   - `soundscape-2023.mp4`
   - `interaction-lab-2022.mp4`

### 2. 사진 파일 추가
1. 각 전시별 폴더에 사진 파일들을 저장:
   - `images/exhibitions/digital-nature-2024/` → photo1.jpg ~ photo6.jpg
   - `images/exhibitions/memory-fragment-2023/` → photo1.jpg ~ photo4.jpg
   - `images/exhibitions/soundscape-2023/` → photo1.jpg ~ photo4.jpg
   - `images/exhibitions/interaction-lab-2022/` → photo1.jpg ~ photo4.jpg

## 임시로 샘플 이미지 생성 (테스트용)

실제 파일이 없을 때 테스트를 위해 샘플 이미지를 생성할 수 있습니다:

### 방법 1: 온라인 샘플 이미지 사용
```javascript
// script.js에서 임시로 샘플 이미지 URL 사용
photos: [
    { src: 'https://picsum.photos/400/300?random=1', alt: '전시장 전경' },
    { src: 'https://picsum.photos/400/300?random=2', alt: '인터랙티브 설치 작품' },
    // ...
]
```

### 방법 2: 로컬 샘플 이미지 생성
터미널에서 다음 명령어로 샘플 이미지 생성:

```bash
# macOS에서 샘플 이미지 생성
for i in {1..6}; do
    convert -size 400x300 xc:lightblue -pointsize 20 -gravity center -annotate 0 "Sample Image $i" "images/exhibitions/digital-nature-2024/photo$i.jpg"
done
```

## 파일이 없을 때의 대응

현재 코드는 파일이 없어도 오류가 발생하지 않도록 설계되어 있습니다:
- 영상 파일이 없으면 비디오 플레이어가 빈 상태로 표시됩니다
- 사진 파일이 없으면 이미지가 로드되지 않지만 갤러리는 정상 작동합니다

## 실제 사용 시 권장사항

1. **영상 파일**: MP4 형식, 10MB 이하로 최적화
2. **사진 파일**: JPG 형식, 800x600 해상도, 500KB 이하
3. **파일명**: 영문, 숫자, 하이픈만 사용 (특수문자 제외)
4. **압축**: 웹용으로 최적화하여 로딩 속도 향상

## 테스트 방법

1. 웹사이트를 로컬 서버로 실행
2. 전시 카드 클릭
3. 사진 탭과 영상 탭 전환 확인
4. 사진 클릭 시 확대 보기 확인
5. 모달 닫기 기능 확인
