---
name: claude-discord-notify
description: >
  Claude Code 작업 완료 또는 사용자 확인 요청 시 Discord 웹훅으로 알림을 전송한다.
  OS에 무관하게 동작하며 Discord webhook URL만 설정하면 된다.
  Stop hook: 작업 완료 시 요청 요약 + 프로젝트 정보 전송.
  Notification hook: 사용자 확인이 필요할 때 경고 알림 전송.
  트리거: "디스코드 알림", "discord 알림 설정", "작업 완료 알림", "claude-discord-notify",
  "훅 알림", "Discord로 알려줘", "알림 설정해줘"
metadata:
  author: dev-goraebap
  version: "1.0"
---

# claude-discord-notify

Claude Code 작업 완료 또는 확인 요청 시 **Discord 웹훅**으로 알림을 보낸다.
Node.js만 있으면 Windows / macOS / Linux 모두 동작한다.

## 알림 종류

| 이벤트 | 색상 | 내용 |
|--------|------|------|
| 작업 완료 (Stop) | 🟢 초록 | 마지막 요청 요약 + 프로젝트/에이전트 정보 |
| 확인 필요 (Notification) | 🟡 노란 | "입력을 기다리고 있습니다" + 프로젝트/에이전트 정보 |

## 설치 절차

### Step 1 — webhook URL 설정

`~/.claude/skills/claude-discord-notify/config.json` 생성:

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/{your-webhook-url}"
}
```

Discord 서버 설정 → 연동 → 웹훅에서 URL을 복사한다.

### Step 2 — hooks 등록

`~/.claude/settings.json`의 `hooks` 섹션에 추가:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/skills/claude-discord-notify/scripts/notify.js stop"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/skills/claude-discord-notify/scripts/notify.js notification"
          }
        ]
      }
    ]
  }
}
```

### Step 3 — 동작 확인

설정 후 Claude Code에서 아무 작업이나 완료하면 Discord에 알림이 온다.

## 스크립트 위치

`scripts/notify.js` — Node.js 기반 Discord 웹훅 전송 스크립트

## 참고

- `config.json`이 없거나 `webhookUrl`이 비어있으면 조용히 종료 (에러 없음)
- 상세 설정은 `references/hooks-setup.md` 참고
