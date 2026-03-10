---
name: claude-hook-notify-setup
description: >
  Claude Code의 Stop·Notification hook에 OS 네이티브 토스트 알림을 연결하는 세팅 스킬.
  node-notifier 기반으로 Windows(SnoreToast), macOS(알림 센터), Linux(libnotify) 모두 지원.
  작업 완료 시 자동 토스트, 확인 필요 시 즉시 토스트를 띄운다.
  트리거: "작업 완료 알림 설정", "claude 알림 받고 싶어", "hook 알림", "끝나면 알려줘", "토스트 알림 설정"
license: Apache-2.0
compatibility: Claude Code
metadata:
  author: dev-goraebap
  version: "1.0"
---

# claude-hook-notify-setup

Claude Code가 작업을 끝내거나 확인이 필요할 때 OS 네이티브 토스트 알림을 보내도록 설정한다.

## 동작 방식

- **Stop hook** → 작업 완료 시 토스트 (제목: 프로젝트명, 내용: 마지막 응답 요약 300자)
- **Notification hook** → 확인 필요 시 토스트 (제목: 프로젝트명, 내용: 알림 메시지)

## 설치 절차

### 1. 스크립트 디렉토리 준비

```bash
mkdir -p ~/.claude/skills/claude-hook-notify-setup/scripts
```

### 2. notify.js + package.json 복사

이 스킬의 `scripts/` 디렉토리에 있는 두 파일을 위 경로에 복사한다.

```bash
cp <skill-path>/scripts/notify.js ~/.claude/skills/claude-hook-notify-setup/scripts/
cp <skill-path>/scripts/package.json ~/.claude/skills/claude-hook-notify-setup/scripts/
```

### 3. 의존성 설치

```bash
cd ~/.claude/skills/claude-hook-notify-setup/scripts && npm install
```

### 4. ~/.claude/settings.json에 hooks 등록

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node C:/Users/<username>/.claude/skills/claude-hook-notify-setup/scripts/notify.js stop"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node C:/Users/<username>/.claude/skills/claude-hook-notify-setup/scripts/notify.js notification"
          }
        ]
      }
    ]
  }
}
```

> Windows 경로는 백슬래시 대신 슬래시(`/`) 사용. `<username>`을 실제 사용자명으로 교체.

## 제거

`~/.claude/settings.json`에서 hooks 블록을 삭제하고 스크립트 디렉토리를 제거한다.

```bash
rm -rf ~/.claude/skills/claude-hook-notify-setup
```
