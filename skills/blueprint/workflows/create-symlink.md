# 심볼릭 링크 생성 가이드라인

## 목적

멀티레포 환경에서 여러 프로젝트가 하나의 `.blueprint/` 폴더를 공유할 수 있도록 심볼릭 링크를 생성한다.

## OS별 명령어

### Linux / macOS

```bash
ln -s <원본 .blueprint 경로> <현재 프로젝트 루트>/.blueprint
```

### Windows

```bash
# Git Bash / MSYS2
ln -s <원본 .blueprint 경로> <현재 프로젝트 루트>/.blueprint

# CMD (관리자 권한 필요)
mklink /D <현재 프로젝트 루트>\.blueprint <원본 .blueprint 경로>

# PowerShell (관리자 권한 필요)
New-Item -ItemType SymbolicLink -Path <현재 프로젝트 루트>\.blueprint -Target <원본 .blueprint 경로>
```

## Windows 주의사항

Windows에서 심볼릭 링크 생성에는 다음 중 하나가 필요하다:
- **개발자 모드** 활성화 (설정 > 개발자용 > 개발자 모드)
- **관리자 권한**으로 터미널 실행

권한이 없어 심볼릭 링크 생성에 실패하면 사용자에게 위 조건을 안내하고 종료한다.
