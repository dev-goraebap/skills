#!/usr/bin/env node
/**
 * claude-discord-notify — Claude Code hook → Discord webhook
 *
 * Usage:
 *   node notify.js stop          # Stop hook: reads stdin JSON, sends 작업 완료
 *   node notify.js notification  # Notification hook: sends 확인 필요
 *
 * Config: ~/.claude/skills/claude-discord-notify/config.json
 *   { "webhookUrl": "https://discord.com/api/webhooks/..." }
 */

const https = require('https');
const path = require('path');
const fs = require('fs');
const url = require('url');

// ── Config ──────────────────────────────────────────────────────────────────

const configPath = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.claude', 'skills', 'claude-discord-notify', 'config.json'
);

let webhookUrl;
try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  webhookUrl = config.webhookUrl;
} catch {
  process.exit(0); // config 없으면 조용히 종료
}

if (!webhookUrl) process.exit(0);

// ── Helpers ──────────────────────────────────────────────────────────────────

function sendEmbed(embed, done) {
  const body = JSON.stringify({ embeds: [embed] });
  const parsed = new url.URL(webhookUrl);
  const req = https.request(
    {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    (res) => {
      res.resume(); // drain response body
      res.on('end', () => done && done());
    }
  );
  req.on('error', () => done && done());
  req.write(body);
  req.end();
}

function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('');
  }
  return '';
}

// ── Mode ──────────────────────────────────────────────────────────────────────

const mode = process.argv[2] || 'stop';

if (mode === 'notification') {
  sendEmbed(
    {
      title: '⚠️ 확인이 필요합니다',
      color: 16776960, // 노란색
      description: 'Claude가 계속 진행하기 전에 입력을 기다리고 있습니다.',
      fields: [
        { name: '📁 프로젝트', value: path.basename(process.cwd()), inline: true },
        { name: '🤖 에이전트', value: process.env.CLAUDE_MODEL || 'Claude Sonnet 4.6', inline: true },
      ],
    },
    () => process.exit(0)
  );
  return; // Stop 모드로 넘어가지 않도록
}

// Stop mode — stdin에서 훅 페이로드 읽기
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const transcript = payload.transcript || [];
  const projectName = path.basename(process.cwd());
  const agentName = process.env.CLAUDE_MODEL || 'Claude Sonnet 4.6';

  // 마지막 사용자 메시지
  const userMsgs = transcript.filter((m) => m.role === 'user');
  const lastUser = userMsgs[userMsgs.length - 1];
  const userText = lastUser
    ? extractText(lastUser.content).slice(0, 100)
    : '(없음)';

  // 마지막 어시스턴트 메시지
  const assistantMsgs = transcript.filter((m) => m.role === 'assistant');
  const lastAssistant = assistantMsgs[assistantMsgs.length - 1];
  const summary = lastAssistant
    ? extractText(lastAssistant.content).slice(0, 500)
    : '(없음)';

  sendEmbed(
    {
      title: '✅ 작업 완료',
      color: 5763719, // 초록색
      fields: [
        { name: '💬 요청', value: userText, inline: false },
        { name: '📝 요약', value: summary, inline: false },
        { name: '📁 프로젝트', value: projectName, inline: true },
        { name: '🤖 에이전트', value: agentName, inline: true },
      ],
    },
    () => process.exit(0)
  );
});
