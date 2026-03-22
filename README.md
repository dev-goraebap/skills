# dev-goraebap/skills

> **Agent Skills**란 AI 에이전트에게 절차적 지식을 제공하는 재사용 가능한 역량 모음입니다. Claude Code, Cursor, GitHub Copilot, Gemini, Windsurf, Cline 등 **24개 이상의 에이전트**에서 동일한 스킬을 사용할 수 있습니다. 자세한 내용은 [agentskills.io](http://agentskills.io)를 참고하세요.

## 스킬 목록

| 스킬 | 설명 |
|------|------|
| [blueprint](./skills/blueprint/) | 1인 PM을 위한 설계 문서 관리. 코드가 SSOT이고 문서는 에이전트 지시용 작업 이력이라는 원칙 하에 PRD·디자인·작업 아이템을 생성 |
| [blueprint-addons-sitemap](./skills/blueprint-addons-sitemap/) | blueprint의 PRD를 기반으로 IA 원칙을 적용한 사이트맵(화면 계층 구조) 설계 |
| [claude-hook-notify-setup](./skills/claude-hook-notify-setup/) | Claude Code hook에 OS 네이티브 토스트 알림 연결 세팅 — Windows/macOS/Linux 지원 |
| [pdf-parser](./skills/pdf-parser/) | PDF 파일에서 텍스트를 추출하여 .txt로 변환 |

### Deprecated (더 이상 관리되지 않음)

| 스킬 | 설명 |
|------|------|
| ~~[agent-wiki](./skills/archive/agent-wiki/)~~ | ~~어떤 정보 공간이든 git 기반 워크스페이스로 만들고 관리~~ |
| ~~[agile-doc-creator](./skills/archive/agile-doc-creator/)~~ | ~~비정형 정보·소스코드에서 Product Brief, Backlog, Epic, User Story, DoD 생성·관리~~ |
| ~~[html-prototype](./skills/archive/html-prototype/)~~ | ~~요구사항 문서·화면설계서에서 순수 HTML/CSS/JS 클릭 가능한 프로토타입 자동 생성~~ |

## 레퍼런스 문서 (`ref/`)

스킬로 관리하기엔 애매한 문서들. 특정 프로젝트에서 아키텍처 방법론이나 개인 지침을 참고할 때 직접 제공하는 자료 모음.

| 폴더 | 문서 | 설명 |
|------|------|------|
| [sveltekit](./ref/sveltekit/) | base-rules.md | SvelteKit 컴포넌트·타입·파일 구조 규칙 |
| | server-architecture.md | 서버 레이어 분리, Active Record, Query Service 패턴 |
| | shadcn-svelte.md | shadcn-svelte 컴포넌트 선택·설치·활용 가이드 |
| [media-storage](./ref/media-storage/) | schema.md | Active Storage 패턴 DB 스키마 (blobs, attachments) |
| | storage.md | Cloudflare R2 연동, 파일 업로드·삭제 |
| | upload.md | 업로드 서비스, 중복 감지, 색상 추출 |
| | query.md | 썸네일 서브쿼리, 뷰모델 변환, CDN URL |

## 설치하기

[skills.sh](https://skills.sh)에서 스킬을 검색하고, 아래 명령으로 설치할 수 있습니다:

```bash
npx skills add dev-goraebap/skills
```

실행하면 단계별로 설치 옵션을 선택할 수 있습니다.

**1. 스킬 선택** — 설치할 스킬을 고릅니다 (스페이스로 토글)

```
◆  Select skills to install (space to toggle)
│  ◻ media-storage
│  ◻ mvp-preview
│  ◻ sveltekit-progressive-architecture
```

**2. 에이전트 선택** — 어떤 에이전트에 설치할지 선택합니다

```
◆  Which agents do you want to install to?
│  Amp, Codex, Gemini CLI, GitHub Copilot, Claude Code, ...
```

Claude Code, Cursor, Gemini CLI, GitHub Copilot 등 24개 이상의 에이전트를 지원합니다.

**3. 설치 범위** — 프로젝트 단위 또는 전역 설치를 선택합니다

```
◆  Installation scope
│  ● Project  (현재 프로젝트에만 설치, git에 포함)
│  ○ Global   (모든 프로젝트에서 사용)
```

**4. 설치 방식** — 심링크(권장) 또는 복사를 선택합니다

```
◆  Installation method
│  ● Symlink  (단일 소스, 업데이트 용이 — 권장)
│  ○ Copy     (각 에이전트 디렉토리에 복사)
```
