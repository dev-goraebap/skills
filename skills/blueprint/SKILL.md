---
name: blueprint
description: 프로젝트 설계 문서(PRD, 디자인 시스템, 작업 아이템)를 생성하고 관리하는 스킬. 기획, PRD, 초안, 개발, 구현, 구축, 청사진 연동 등의 키워드에 트리거.
license: Apache-2.0
metadata:
  author: dev-goraebap
  based-on: https://github.com/snarktank/ai-dev-tasks (Apache-2.0)
---

# Blueprint

1인 프로덕트 매니저를 위한 설계 문서 관리 스킬. 웹사이트, 모바일 앱 등의 PRD, sitemap, 디자인 시스템 문서를 생성하고 관리한다.

**핵심 원칙:** 이 스킬이 만드는 문서들은 에이전트에게 더 구체적이고 올바른 작업을 지시하는 데 도움을 줄 뿐, 일부 변경에 취약할 수 있다. 의도적으로 작업 이력을 남기는 것을 목표로 한다. 문서는 SSOT(Single Source of Truth)가 아니며, 코드가 항상 더 정확한 현재 상태를 나타낸다는 것을 인지하고 문서를 생성한다.

## 용어

| 용어 | 설명 |
|------|------|
| **scope** | `.blueprint/` 하위의 프로젝트별 그룹 폴더. 현재 레포/앱 이름을 소괄호로 감싸서 사용한다 (예: `(todo-demo)`). |

## 폴더 구조

```
(project-root)/
└── .blueprint/
    ├── prd-<기능명>.md
    ├── (<scope>)/
    │   ├── design/          # 설계 문서 (디자인 시스템, 유즈케이스 명세서 등)
    │   └── construction/    # 작업 아이템 (버전별 작업 목록)
    ├── README.md
    └── LICENSE
```

## 사용 시점

이 스킬은 다음 **세 가지 워크플로우** 중 하나가 트리거될 때 활성화된다.

---

## 워크플로우 1: 요구사항 분석 (PRD 생성)

**트리거:** 기획, PRD, 초안 등의 키워드 또는 `/blueprint prd` 슬래시 명령어

### 절차

1. 프로젝트 루트에 `.blueprint/` 폴더를 생성한다.
2. 현재 프로젝트명을 기준으로 `.blueprint/(<scope>)/` 그룹 폴더와 하위 `design/`, `construction/` 폴더를 생성한다. 각 하위 폴더에 `.gitkeep`을 추가한다.
3. 사용자의 프롬프트 또는 첨부 파일(txt, md, pdf)을 받아 [PRD 생성 지침](workflows/create-prd.md)에 따라 PRD 초안을 `.blueprint/prd-<기능명>.md`로 생성한다.
4. 사용자에게 PRD 초안을 제시하고 검토를 요청한다. 사용자가 명확하게 승인할 때까지 피드백을 반영하며 개선한다. 승인 후 frontmatter의 `status`를 `approved`로 변경한다.
5. 사용자에게 기본 제공되는 [lofi-design-tokens](references/lofi-design-tokens.md) 문서를 `.blueprint/(<scope>)/design`에 추가할지 물어본다. 빠른 프로토타이핑에 유용하다.
6. 작업 완료를 알리고, PRD를 기반으로 상세한 설계 문서를 `design/` 폴더에 추가하면 개발 시 참고할 수 있다고 안내한다.

**주의:** 바로 개발을 시작하라고 유도하지 않는다. 사용자가 설계 문서를 충분히 다듬을 시간을 존중한다.

---

## 워크플로우 2: 소프트웨어 개발

**트리거:** 개발, 구현, 구축, 건설, 작업 등의 키워드 또는 `/blueprint dev` 슬래시 명령어

### 절차

1. 현재 작업 경로에 `.blueprint/` 폴더가 있는지 확인한다.
   - 없다면 사용자에게 별도의 blueprint 환경이 구성되어 있는지 물어본다.
   - 구성되지 않았다면 종료한다.
2. `.blueprint/prd-*.md` 문서를 읽고 작업 범위를 사용자에게 확인한다.
   - 사용자의 프롬프트와 `.blueprint/(<scope>)/design` 문서를 참고하여 구체적인 작업을 파악한다.
   - `.blueprint/(<scope>)/construction`에 기존 문서가 있다면 이전 작업 내용을 파악한다.
   - 사용자의 요청이 기존 FR에 없거나, 기존 FR을 변경해야 하는 경우 [PRD 변경 지침](workflows/update-prd.md)에 따라 PRD를 먼저 갱신한다.
3. [작업 아이템 생성 지침](workflows/create-work-items.md)에 따라 `.blueprint/(<scope>)/construction`에 작업 파일을 작성한다. 사용자가 승인할 때까지 검토를 반복한다.
4. 승인된 작업 아이템의 `status`를 `approved`로 변경하고 작업을 수행한다. 작업이 끝나면 사용자에게 검토를 요청한다.

---

## 워크플로우 3: 멀티레포 연동

**트리거:** 기존의 문서 연동, 기존의 청사진 연동 등의 키워드 또는 `/blueprint link` 슬래시 명령어

### 절차

1. 사용자에게 기존 blueprint가 있는 레포 또는 `.blueprint/` 폴더 경로를 물어본다.
   - 해당 위치에서 `.blueprint/` 정보를 찾을 수 없으면 종료한다.
2. [심볼릭 링크 생성 지침](workflows/create-symlink.md)에 따라 현재 작업 환경에 `.blueprint/` 폴더를 연결한다.
3. `.blueprint/` 폴더에 현재 프로젝트를 위한 새로운 `(<scope>)/` 그룹 폴더를 생성한다.
