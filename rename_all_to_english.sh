#!/bin/bash

echo "모든 한글 파일명을 영어로 변경하고 있습니다..."

# sensory-dissolution 폴더
cd public/exhibition-details/sensory-dissolution
for file in *; do
    if [[ -f "$file" ]]; then
        newname=$(echo "$file" | sed 's/감각해체/sensory_dissolution/g' | sed 's/감각해체/sensory_dissolution/g')
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
        newname=$(echo "$file" | sed 's/sobok_단체사진/sobok_group_photo/g' | sed 's/sobok_사진/sobok_photo/g' | sed 's/sobok_승제/sobok_seungje/g' | sed 's/sobok_승훈/sobok_seunghun/g' | sed 's/sobok_추가사진/sobok_additional_photo/g')
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
        newname=$(echo "$file" | sed 's/future-fragments_사진/future_fragments_photo/g' | sed 's/future-fragments사진/future_fragments_photo/g')
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
        newname=$(echo "$file" | sed 's/mimyo_사진/mimyo_photo/g')
        if [[ "$file" != "$newname" ]]; then
            mv "$file" "$newname"
            echo "변경: $file -> $newname"
        fi
    fi
done

cd /Users/bbidolm/Desktop/eum_website

echo "모든 파일명 변경이 완료되었습니다!"
