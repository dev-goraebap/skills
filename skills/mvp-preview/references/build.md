# 구현 — MVP 빌드 원칙

범위가 확정됐으면 가장 단순한 방법으로 빠르게 만든다.

---

## 스택 선택 기준

| 상황 | 권장 스택 |
|------|-----------|
| 정적 UI, 인터랙션 거의 없음 | 단일 HTML 파일 (Zero setup) |
| 상태 관리가 필요한 인터랙션 | 사용자 선호 프레임워크 → 없으면 Vanilla JS |
| 사용자가 프레임워크를 지정 | 그 프레임워크 사용 |
| 빠른 공유가 최우선 | 단일 HTML 파일 |

### 단일 HTML 파일이 좋은 이유

- 빌드 단계 없음 → 브라우저에서 바로 열림
- `cloudflared`나 CodePen으로 30초 안에 링크 공유 가능
- 의존성 없음 → CDN으로 라이브러리 추가

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MVP Preview</title>
  <!-- Tailwind CDN으로 스타일링 -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- 여기에 UI -->
  <script>
    // 목업 데이터와 인터랙션
  </script>
</body>
</html>
```

---

## 빌드 원칙

### 목업 데이터를 쓴다

실제 API 연결에 시간을 쓰지 않는다. 하드코딩된 데이터로 화면을 채운다.

```javascript
// 실제 API 대신 목업 데이터
const products = [
  { id: 1, name: '블루 티셔츠', price: 29000, stock: 12 },
  { id: 2, name: '화이트 후드', price: 49000, stock: 3 },
  { id: 3, name: '블랙 팬츠', price: 59000, stock: 0 },
];
```

### 해피 패스만 구현한다

에러 상태·빈 상태·엣지 케이스는 만들지 않는다. 사용자가 "정상 흐름"을 이해할 수 있으면 충분하다.

- 로그인 → 하드코딩된 사용자로 이미 로그인된 상태로 시작
- 데이터 없음 → 항상 데이터가 있는 상태로 가정
- 에러 처리 → 없음

### 범위를 지킨다

구현 중 "이것도 추가하면 좋겠다"는 생각이 들면 메모만 해두고 지금 범위에 집중한다.

---

## 빠른 UI 구성 팁

**Tailwind CDN으로 스타일링**
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Alpine.js로 가벼운 인터랙션 (단일 HTML 파일용)**
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<div x-data="{ open: false }">
  <button @click="open = !open">토글</button>
  <div x-show="open">내용</div>
</div>
```

**Chart.js로 데이터 시각화**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

---

## 완료 기준

- [ ] 핵심 사용자 흐름을 처음부터 끝까지 클릭해볼 수 있다
- [ ] 목업 데이터가 화면에 보인다
- [ ] 브라우저에서 오류 없이 열린다
- [ ] 공유할 수 있는 상태다 (로컬 서버 실행 중이거나 파일이 있거나)
