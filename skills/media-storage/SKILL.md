---
name: media-storage
description: "파일 업로드·저장소·첨부 관리 패턴. Actions: 파일 업로드, 이미지 업로드, 파일 처리, 저장소 연동, 썸네일 첨부, 색상 추출, file upload, image upload, storage, attachment, thumbnail. Patterns: Active Storage, blobs 테이블, attachments 테이블, 다형적 첨부, 중복 파일 감지. Storage: Cloudflare R2, AWS S3, @aws-sdk/client-s3, UUID key, 2-level 디렉토리, CDN URL, presigned URL. DB: Drizzle ORM, blob, checksum, MD5, metadata JSON, MIME, byte_size. Color: 지배적 색상 추출, dominant color, Gemini API, hex, blobs.metadata. Query: 썸네일 조회, 서브쿼리, leftJoin, view-model, CDN URL 변환. Stack: SvelteKit, +server.ts, TypeScript."
---

# Media Storage

파일 업로드·저장소 연동·첨부 관리를 위한 패턴 모음. 특정 방식을 강제하지 않으며, 프로젝트 상황에 맞게 참고한다.

## 핵심 개념

Rails의 Active Storage에서 유래한 패턴으로, 파일을 엔티티 테이블에 직접 붙이지 않고 두 테이블로 분리한다.

- **blobs** — 파일 원본 메타데이터 (key, checksum, metadata 등)
- **attachments** — 파일과 엔티티의 다형적 연결 (record_type, record_id, name)

어떤 스택에서도 동일하게 적용할 수 있다.

## 주요 내용

- **Active Storage 패턴**: `blobs` + `attachments` 두 테이블로 파일 원본과 엔티티 관계를 분리. MD5 체크섬으로 중복 파일을 자동 감지
- **Cloudflare R2 연동**: AWS S3 SDK 호환. UUID key를 2-level 디렉토리로 분산 저장
- **지배적 색상 추출**: Gemini API로 이미지의 대표 색상(hex)을 추출해 `blobs.metadata` JSON에 저장
- **조회 패턴**: 서브쿼리로 blob 정보를 함께 조회하고, CDN URL과 색상 값을 뷰모델에 포함

상세: [references/file-handling.md](references/file-handling.md)
