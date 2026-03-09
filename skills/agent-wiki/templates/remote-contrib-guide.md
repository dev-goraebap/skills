# 원격 기여 가이드

생성된 위키 스킬이 원격 리포지토리에 호스팅될 때, 에이전트가 로컬 clone을 통해 기여하는 절차를 정의한다.

이 가이드는 두 곳에서 참조된다:
1. **agent-wiki** — 위키 생성 시, 생성되는 SKILL.md에 업데이트 절차를 포함할 때
2. **생성된 위키 스킬** — 실제 이슈/변경 요청을 처리할 때

---

## R-Step 1 — 인증 확인

`~/.config/agent-wiki/credentials`에서 해당 스킬 이름의 섹션을 찾는다.

```
섹션 헤더: [{platform}.{skill-name}]
예: [github.todo-app-wiki]
```

- 섹션이 있으면 → 인증 정보를 읽고 진행
- 섹션이 없으면 → 사용자에게 credentials 설정을 안내하고 중단

credentials 형식 상세는 `credentials-guide.md` 참고.

---

## R-Step 2 — 로컬 리포 확인

credentials의 `local_path` 필드를 확인한다.

### `local_path`가 있는 경우

```bash
cd {local_path} && git checkout master && git pull
```

(기본 브랜치가 `main`이면 `main`으로 대체)

### `local_path`가 없는 경우 (최초 clone)

1. 사용자에게 clone 경로를 확인한다 (기본값 제안: `~/wikis/{skill-name}`)
2. clone 실행:

```bash
# GitHub 예시
git clone https://{username}:{token}@github.com/{repo}.git {local_path}

# GitLab 예시
git clone https://oauth2:{token}@{gitlab-url}/{project}.git {local_path}
```

3. clone 실패 시 수동 clone 명령어를 안내하고 "clone 후 경로를 알려주세요"
4. credentials 파일에 `local_path` 필드를 기록한다

---

## R-Step 3 — 브랜치 생성 및 변경

### 브랜치 생성

```bash
cd {local_path}
git checkout -b contrib/{skill-name}-{짧은-설명}
```

- 슬러그 규칙: 소문자 영문 + 하이픈, 40자 이내
- 기본 브랜치(main/master)에서 분기

### 변경 적용

에이전트가 `{local_path}` 내의 파일을 직접 Read/Write로 수정한다:
- Story 추가/수정/삭제
- Epic 갱신
- product-backlog.md 갱신

CONTRIBUTING.md의 문서 규칙(ID, 파일명, 상호 링크)을 준수한다.

---

## R-Step 4 — 커밋 및 push

### 커밋 및 push

```bash
cd {local_path}
git add -A
git commit -m "[{skill-name}] 변경 요약"
git push origin contrib/{skill-name}-{설명}
```

### 결과 보고

사용자에게 다음을 안내한다:

```
✅ 변경사항이 push되었습니다.
브랜치: contrib/{skill-name}-{설명}

MR/PR 생성: {url}/{project}/-/merge_requests/new?source_branch=contrib/{skill-name}-{설명}

[변경 내용]
- user-stories/us-014-fix-login-bug.md 추가
- epics/ep-002-user-mgmt.md 갱신
- product-backlog.md 갱신

Merge 후 설치된 스킬을 갱신하려면:
npx skills add {clone-url}
```

> **GitHub의 경우** MR/PR 생성 URL: `https://github.com/{repo}/compare/contrib/{skill-name}-{설명}?expand=1`
> **GitLab의 경우** MR/PR 생성 URL: `{url}/{project}/-/merge_requests/new?merge_request[source_branch]=contrib/{skill-name}-{설명}`
