#!/bin/bash

# Working Stiff Films Website Development Server
# 이 스크립트는 로컬 개발 서버를 시작합니다.

echo "🎬 Working Stiff Films Website 개발 서버를 시작합니다..."
echo "🌐 서버 주소: http://localhost:3000"
echo "📝 편집 가능한 파일들:"
echo "   - index.html (메인 HTML)"
echo "   - css/styles-custom.css (커스텀 스타일)"
echo "   - js/main-stiff.js (메인 JavaScript)"
echo ""
echo "🔧 VS Code에서 Live Server 확장을 사용하거나"
echo "   터미널에서 다음 명령어로 서버를 시작할 수 있습니다:"
echo "   python3 -m http.server 3000"
echo ""
echo "⚠️  서버를 중지하려면 Ctrl+C를 누르세요"
echo ""

# Python HTTP 서버 시작
python3 -m http.server 3000
