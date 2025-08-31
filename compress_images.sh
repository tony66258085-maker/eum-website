#!/bin/bash

echo "이미지 압축을 시작합니다..."

# 백업 폴더 생성
mkdir -p compressed_backup

# JPEG/JPG 파일 압축 (품질 85%)
echo "JPEG 파일들을 압축하고 있습니다..."
find . -type f \( -name "*.jpg" -o -name "*.jpeg" \) -not -path "./compressed_backup/*" | while read file; do
    echo "압축 중: $file"
    convert "$file" -quality 85 -strip "$file"
done

# PNG 파일 압축 (압축 레벨 9)
echo "PNG 파일들을 압축하고 있습니다..."
find . -type f -name "*.png" -not -path "./compressed_backup/*" | while read file; do
    echo "압축 중: $file"
    convert "$file" -strip -compress Zip -quality 95 "$file"
done

echo "이미지 압축이 완료되었습니다!"

# 압축 후 크기 확인
echo "압축 후 전체 크기:"
du -sh .
