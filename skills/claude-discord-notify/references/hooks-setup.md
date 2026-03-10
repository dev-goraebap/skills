# Hooks 설정 가이드

## Claude Code Hook 이벤트

| 이벤트 | 발화 시점 | stdin 페이로드 |
|--------|-----------|----------------|
| `Stop` | 에이전트가 턴을 완료했을 때 | `{ session_id, stop_reason, transcript }` |
| `Notification` | 사용자 확인/입력이 필요할 때 | `{ session_id, message }` |

## transcript 구조

```json
{
  "transcript": [
    { "role": "user", "content": "텍스트 또는 배열" },
    { "role": "assistant", "content": [{ "type": "text", "text": "..." }] }
  ]
}
```

`content`는 문자열이거나 `{ type, text }` 배열일 수 있다. `notify.js`는 두 형식을 모두 처리한다.

## settings.json 위치

- **전역**: `~/.claude/settings.json`
- **프로젝트**: `.claude/settings.json` (저장소 루트)

전역 설정은 모든 프로젝트에서 작동한다.

## Windows 경로 주의사항

Windows에서 Git Bash / MSYS2 환경의 `~`는 `/c/Users/{username}`으로 확장된다.
Node.js 명령이 올바르게 실행되려면 `node`가 PATH에 있어야 한다.

```json
"command": "node ~/.claude/skills/claude-discord-notify/scripts/notify.js stop"
```

경로 문제가 있으면 절대 경로로 대체:

```json
"command": "node C:/Users/{username}/.claude/skills/claude-discord-notify/scripts/notify.js stop"
```

## 에이전트 모델명 자동 감지

스크립트는 `CLAUDE_MODEL` 환경변수를 읽는다.
없으면 `'Claude Sonnet 4.6'`으로 폴백한다.

## Discord Webhook 채널별 분리

알림 종류에 따라 다른 채널로 보내려면 `config.json`을 확장한다:

```json
{
  "webhookUrl": "https://discord.com/api/webhooks/...",
  "notificationWebhookUrl": "https://discord.com/api/webhooks/..."
}
```

`notify.js`에서 `config.notificationWebhookUrl || config.webhookUrl` 방식으로 폴백 처리.
