# SvelteKit Skills

SvelteKit 서버 레이어 아키텍처 가이드라인. [Agent Skills (SKILL.md)](https://agentskills.io) 표준을 따르며, 모든 AI 코딩 에이전트에서 사용할 수 있다.

Active Record 도메인 모델, Query Service 조회 패턴, REST API 엔드포인트 규칙, 서브도메인 기반 스키마 조직을 정의한다.

## Skills

| 스킬 | 설명 |
|------|------|
| `server-architecture` | 서버 레이어 아키텍처: Active Record, Query Service, REST API 패턴 |

## 설치

```bash
npx skills add dev-goraebap/sveltekit-skills
```

## 핵심 규칙

- **레이어 분리**: `server/domain/` (Active Record) + `server/infra/service/` (Query Service)
- **직접 ORM 조작 금지**: `+server.ts` → Domain Model, `+page.server.ts` → Query Service
- **R/CUD 분리**: load는 `+page.server.ts`, 쓰기는 `routes/api/` REST 엔드포인트. form actions 미사용
- **서브도메인 스키마**: 테이블을 서브도메인별로 분류하여 스키마 파일 분리
