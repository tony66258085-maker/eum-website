#!/bin/bash

echo "모든 전시 폴더의 파일명을 영문화하고 있습니다..."

# clear-things 폴더 (이미 완료됨)
echo "clear-things 폴더는 이미 완료됨"

# sobok 폴더
cd public/exhibition-details/sobok
for file in *; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/sobok /sobok_/g' | sed 's/ /_/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

# future-fragments 폴더
cd ../future-fragments
for file in *; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/미래의파편들/future-fragments/g' | sed 's/ /_/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

# mimyo 폴더
cd ../mimyo
for file in *; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/미묘하다/mimyo/g' | sed 's/ /_/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

cd /Users/bbidolm/Desktop/eum_website

echo "모든 파일명 변경이 완료되었습니다!"
