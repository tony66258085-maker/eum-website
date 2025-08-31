#!/bin/bash

echo "파일명을 영문화하고 있습니다..."

# 감각해체 폴더의 파일들
cd public/전시소개_자세히보기/감각해체

# KakaoTalk 파일들
for file in "KakaoTalk_Photo_2025-08-24-15-21-42"*; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/KakaoTalk_Photo_2025-08-24-15-21-42/kakao_photo_/g' | sed 's/ /_/g')
        mv "$file" "$newname"
        echo "변경: $file -> $newname"
    fi
done

for file in "KakaoTalk_Photo_2025-08-24-15-21-57"*; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/KakaoTalk_Photo_2025-08-24-15-21-57/kakao_photo_57_/g' | sed 's/ /_/g')
        mv "$file" "$newname"
        echo "변경: $file -> $newname"
    fi
done

for file in "KakaoTalk_Photo_2025-08-24-15-24-56"*; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/KakaoTalk_Photo_2025-08-24-15-24-56/kakao_photo_56_/g' | sed 's/ /_/g')
        mv "$file" "$newname"
        echo "변경: $file -> $newname"
    fi
done

for file in "KakaoTalk_Photo_2025-08-24-15-24-57"*; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/KakaoTalk_Photo_2025-08-24-15-24-57/kakao_photo_57_/g' | sed 's/ /_/g')
        mv "$file" "$newname"
        echo "변경: $file -> $newname"
    fi
done

# 스크린샷 파일
if [[ -f "스크린샷 2025-08-24 오후 3.23.45.png" ]]; then
    mv "스크린샷 2025-08-24 오후 3.23.45.png" "screenshot_2025-08-24.png"
    echo "변경: 스크린샷 2025-08-24 오후 3.23.45.png -> screenshot_2025-08-24.png"
fi

cd /Users/bbidolm/Desktop/eum_website

echo "파일명 변경이 완료되었습니다!"
