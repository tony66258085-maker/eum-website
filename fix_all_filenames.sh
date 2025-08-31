#!/bin/bash

echo "모든 파일명을 영문화하고 있습니다..."

# sensory-dissolution 폴더
cd public/exhibition-details/sensory-dissolution
for file in *; do
    if [[ -f "$file" ]]; then
        # 한글 파일명을 영문으로 변경
        newname=$(echo "$file" | sed 's/스크린샷 2025-08-24 오후 3.23.45.png/screenshot_2025-08-24.png/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

# clear-things 폴더
cd ../clear-things
for file in *; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/선명해져야할것들/clear-things/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

# sobok 폴더
cd ../sobok
for file in *; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/소복/sobok/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

cd /Users/bbidolm/Desktop/eum_website

echo "파일명 변경이 완료되었습니다!"
