# Lofi Design Tokens

빠른 프로토타이핑을 위한 디자인 토큰 정의.
Figma 와이어프레임 스타일을 기반으로 두꺼운 보더, 명확한 시각 계층, 절제된 컬러를 사용하여 세련된 로파이 UI를 구성한다.

## Color

### Base (Grayscale)

| Token | Value | 용도 |
|-------|-------|------|
| `--color-bg` | `#FFFFFF` | 배경 |
| `--color-surface` | `#F5F5F5` | 카드, 패널 배경 |
| `--color-border` | `#1A1A1A` | 보더 (주요) |
| `--color-border-subtle` | `#D1D1D1` | 보더 (보조) |
| `--color-text` | `#1A1A1A` | 본문 텍스트 |
| `--color-text-secondary` | `#6B6B6B` | 보조 텍스트 |
| `--color-text-placeholder` | `#A0A0A0` | 플레이스홀더 |

### Accent

| Token | Value | 용도 |
|-------|-------|------|
| `--color-primary` | `#2563EB` | 주요 액션 (버튼, 링크) |
| `--color-primary-hover` | `#1D4ED8` | 호버 상태 |
| `--color-danger` | `#DC2626` | 삭제, 에러 |
| `--color-success` | `#16A34A` | 완료, 성공 |

## Typography

| Token | Value | 용도 |
|-------|-------|------|
| `--font-family` | `"Inter", system-ui, sans-serif` | 기본 서체 |
| `--font-size-xs` | `12px` | 캡션, 라벨 |
| `--font-size-sm` | `14px` | 보조 텍스트 |
| `--font-size-base` | `16px` | 본문 |
| `--font-size-lg` | `20px` | 소제목 |
| `--font-size-xl` | `24px` | 제목 |
| `--font-size-2xl` | `32px` | 페이지 타이틀 |
| `--font-weight-normal` | `400` | 본문 |
| `--font-weight-medium` | `500` | 강조 |
| `--font-weight-bold` | `700` | 제목 |
| `--line-height` | `1.5` | 기본 행간 |

## Spacing

4px 기반 스케일.

| Token | Value |
|-------|-------|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

## Border

로파이의 핵심. 두꺼운 보더로 요소 간 경계를 명확하게 구분한다.

| Token | Value | 용도 |
|-------|-------|------|
| `--border-width` | `2px` | 기본 보더 |
| `--border-width-thick` | `3px` | 강조 보더 (카드, 모달) |
| `--border-style` | `solid` | 기본 스타일 |
| `--border-color` | `var(--color-border)` | `#1A1A1A` |

## Radius

| Token | Value | 용도 |
|-------|-------|------|
| `--radius-sm` | `4px` | 작은 요소 (칩, 뱃지) |
| `--radius-md` | `8px` | 기본 (버튼, 인풋) |
| `--radius-lg` | `12px` | 카드, 패널 |
| `--radius-full` | `9999px` | 원형 (아바타, 토글) |

## Shadow

깊이감을 최소화하고, 보더로 구분한다. 필요할 때만 사용.

| Token | Value | 용도 |
|-------|-------|------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` | 미세한 깊이감 |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.1)` | 드롭다운, 팝오버 |

## Component Guidelines

토큰을 조합한 기본 컴포넌트 스타일 가이드.

### Button

- 보더: `--border-width` + `--color-border`
- 패딩: `--space-2` `--space-4` (세로 가로)
- 라운딩: `--radius-md`
- Primary: `--color-primary` 배경, 흰색 텍스트, 보더 없음
- Secondary: 흰색 배경, `--color-border` 보더

### Input

- 보더: `--border-width` + `--color-border`
- 패딩: `--space-2` `--space-3`
- 라운딩: `--radius-md`
- 포커스: `--color-primary` 보더 + `--border-width-thick`

### Card

- 보더: `--border-width-thick` + `--color-border`
- 패딩: `--space-6`
- 라운딩: `--radius-lg`
- 배경: `--color-surface`

### Table

- 헤더: `--font-weight-bold`, `--color-surface` 배경
- 셀 보더: `--border-width` + `--color-border-subtle`
- 셀 패딩: `--space-3` `--space-4`
