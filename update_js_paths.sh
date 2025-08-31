#!/bin/bash

echo "JavaScript 파일의 경로를 업데이트하고 있습니다..."

# exhibition-detail.js 파일에서 모든 KakaoTalk 파일명을 실제 파일명으로 변경
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-21-57 001.jpeg|kakao_photo_57__001.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-21-57 002.jpeg|kakao_photo_57__002.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-21-57 003.jpeg|kakao_photo_57__003.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-21-57 004.jpeg|kakao_photo_57__004.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-56 001.jpeg|kakao_photo_56__001.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 002.jpeg|kakao_photo_57__002.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 003.jpeg|kakao_photo_57__003.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 005.jpeg|kakao_photo_57__005.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 007.jpeg|kakao_photo_57__007.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 008.jpeg|kakao_photo_57__008.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 009.jpeg|kakao_photo_57__009.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 010.jpeg|kakao_photo_57__010.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 012.jpeg|kakao_photo_57__012.jpeg|g' exhibition-detail.js
sed -i '' 's|KakaoTalk_Photo_2025-08-24-15-24-57 013.jpeg|kakao_photo_57__013.jpeg|g' exhibition-detail.js

echo "JavaScript 파일 업데이트가 완료되었습니다!"
