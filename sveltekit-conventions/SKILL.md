---
name: sveltekit-conventions
description: SvelteKit 서버 레이어 아키텍처 가이드라인. Active Record 도메인 모델, Query Service, REST API 패턴, 서브도메인 기반 스키마 조직을 정의한다. SvelteKit 프로젝트에서 서버 코드를 작성하거나 구조를 잡을 때 참고한다.
---

# SvelteKit Server Layer Architecture

## 추천 기술 스택

| 영역 | 추천 | 이유 |
|------|------|------|
| ORM | Drizzle ORM | 경량, 타입 안전, SQL-like API로 직관적 |
| 인증 | better-auth | 세션 관리, OTP, 소셜 로그인 등 내장 |

> 프로젝트 상황에 따라 다른 도구를 선택할 수 있다. 아래 아키텍처 패턴은 ORM에 무관하게 적용된다.

## 왜 Active Record인가

SvelteKit은 DI 컨테이너를 제공하지 않는다. Active Record 패턴으로 도메인 로직을 모델에 캡슐화하면:

- 모델이 자체적으로 ORM을 import하므로 DI 없이도 응집도 높은 코드가 된다.
- `+server.ts`에서는 도메인 모델의 메서드만 호출한다. SQL/ORM 코드가 라우트 파일에 노출되지 않는다.
- 테이블 단위로 책임이 분리되어 변경 영향 범위가 명확하다.

## 서버 레이어 구조

```
$lib/server/
  db/                        ← ORM 설정 + 서브도메인별 스키마
    index.ts                 ← DB 연결 인스턴스
    {subdomain}-schema.ts    ← 서브도메인별 테이블 정의
  domain/                    ← Active Record 모델 (서브도메인별 폴더)
    {subdomain}/
      {model}.ts
  infra/
    service/                 ← Query Service (조회 전용 뷰모델)
      {name}-query.service.ts

$lib/entities/               ← 도메인 타입 + 순수 헬퍼 (서버/클라이언트 공유)
```

## 스키마 조직: 서브도메인 분류

- 함께 변경되는 테이블을 하나의 서브도메인으로 묶는다.
- 서브도메인 간 FK는 허용하되, 스키마 파일은 분리한다.
- 파일명은 `{서브도메인}-schema.ts` 형식을 따른다.

## Domain Model (Active Record)

- 자기 테이블 대상 **CUD + 단순 조회**만 담당한다.
- `create()`는 내부에서 파생값(sortOrder, createdAt 등)을 자동 계산한다. 호출측에 세부사항을 노출하지 않는다.
- 도메인 정책 로직도 여기에 위치한다 (예: 연차 일수 계산).
- 복잡한 조회(크로스 도메인 조인, 집계 등)는 Query Service로 위임한다.
- ORM을 직접 import한다. DI가 필요하지 않다.

## Query Service (조회 전용)

- **크로스 도메인 조인 허용** — 조회는 SQL 조인이므로 도메인 경계를 강제하지 않는다.
- 뷰모델 타입은 **같은 파일에 정의**한다. 프론트에서 `import type`으로 사용한다.
- 메서드명은 용도를 드러낸다: `listPage()`, `listOptions()`, `getDetail()` 등.

## 데이터 흐름 규칙

| 역할 | 위치 | 호출 대상 |
|------|------|-----------|
| 읽기 (R) | `+page.server.ts` load / `+layout.server.ts` load | Query Service |
| 쓰기 (CUD) | `routes/api/**/+server.ts` REST 엔드포인트 | Domain Model |

- **`routes/api/**/+server.ts`에서 직접 ORM 조작 금지** → 반드시 Domain Model을 통해.
- **`+page.server.ts` load에서 직접 ORM 조작 금지** → 반드시 Query Service를 통해.
- `+page.server.ts`에는 **load만** 둔다. **form actions는 사용하지 않는다.**
- **Layout load** → 경량 옵션 데이터 (셀렉트, 드롭다운 등 공유 참조 데이터)
- **Page load** → 페이지 전용 뷰모델 (목록, 상세, 페이징 등)

## 엔드포인트 패턴

- **검증 → 도메인 모델 호출 → JSON 응답** 패턴을 따른다.
- 각 `+server.ts`는 **독립적**이다. 다른 엔드포인트를 호출하지 않는다.
- 요청 검증 라이브러리는 자유롭게 선택한다 (Zod, Valibot, ArkType 등). 스키마는 `+server.ts` 파일 상단에 정의한다.

[코드 예시 및 상세 설명](references/examples.md)
