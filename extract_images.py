#!/usr/bin/env python3
import re
import os
from pathlib import Path

# 파일 경로
input_file = "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/Project/Frontend/DetailContentPage/Original File/Original.html"
output_dir = "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/Project/Frontend/DetailContentPage/assets"
html_output_file = "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/Project/Frontend/DetailContentPage/index.html"

# assets 폴더 생성
os.makedirs(output_dir, exist_ok=True)

# HTML 파일 읽기
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 모든 데이터 URL 추출 및 저장
import base64
counter = 0
url_mapping = {}  # 데이터 URL과 파일명 매핑

# 모든 data:image 형식의 이미지 추출
data_url_pattern = r'data:image/([a-z+]+);base64,([A-Za-z0-9+/=]+)'
matches = re.finditer(data_url_pattern, content)

for match in matches:
    counter += 1
    image_type = match.group(1)
    base64_data = match.group(2)
    full_data_url = match.group(0)

    # 확장자 결정
    extension_map = {
        'svg+xml': 'svg',
        'png': 'png',
        'jpeg': 'jpg',
        'jpg': 'jpg',
        'gif': 'gif',
        'webp': 'webp'
    }
    extension = extension_map.get(image_type, image_type.replace('+', '_'))

    try:
        # Base64 디코딩
        image_content = base64.b64decode(base64_data)
        image_filename = f"image_{counter}.{extension}"
        image_filepath = os.path.join(output_dir, image_filename)

        # 이미지 파일로 저장 (바이너리)
        with open(image_filepath, 'wb') as f:
            f.write(image_content)

        print(f"✓ {image_filename} 저장 완료")

        # 매핑 정보 저장
        url_mapping[full_data_url] = f"./assets/{image_filename}"
    except Exception as e:
        print(f"✗ 이미지 {counter} 디코딩 실패: {e}")

# HTML 파일에서 data: URL을 로컬 경로로 변환
modified_content = content
for data_url, local_path in url_mapping.items():
    # 전체 data: URL 찾아서 로컬 경로로 변경
    modified_content = modified_content.replace(data_url, local_path)

# 수정된 HTML 저장
with open(html_output_file, 'w', encoding='utf-8') as f:
    f.write(modified_content)

print(f"\n✓ 총 {counter}개의 이미지 추출 완료")
print(f"✓ 수정된 HTML 파일: {html_output_file}")
print(f"✓ 이미지 저장 위치: {output_dir}")
