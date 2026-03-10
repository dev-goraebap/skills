#!/usr/bin/env node
'use strict';

const path = require('path');
const notifier = require('node-notifier');

const mode = process.argv[2] || 'stop';

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let payload = {};
  try { payload = JSON.parse(raw); } catch {}

  const projectName = payload.cwd ? path.basename(payload.cwd) : 'Claude Code';

  if (mode === 'notification') {
    notifier.notify({
      title: projectName,
      message: payload.message || '확인이 필요합니다',
      appID: 'Claude Code'
    });
  } else {
    const lastMsg = payload.last_assistant_message || '';
    const summary = lastMsg.length > 300
      ? lastMsg.slice(0, 300) + '...'
      : lastMsg || '작업이 완료됐습니다.';

    notifier.notify({
      title: projectName,
      message: summary,
      appID: 'Claude Code'
    });
  }
});
