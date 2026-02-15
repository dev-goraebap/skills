# 코드 예시

## Domain Model (Active Record)

```typescript
// $lib/server/domain/organization/department.ts
import { db } from '$lib/server/db';
import { departments } from '$lib/server/db/organization-schema';
import { eq, max } from 'drizzle-orm';

export class Department {
  static async create(data: { name: string }) {
    // sortOrder 자동 계산 — 호출측은 이를 알 필요 없다
    const [last] = await db
      .select({ maxSort: max(departments.sortOrder) })
      .from(departments);
    const sortOrder = (last?.maxSort ?? 0) + 1;

    const [created] = await db
      .insert(departments)
      .values({ name: data.name, sortOrder })
      .returning();
    return created;
  }

  static async update(id: string, data: { name: string }) {
    const [updated] = await db
      .update(departments)
      .set({ name: data.name })
      .where(eq(departments.id, id))
      .returning();
    return updated;
  }

  static async delete(id: string) {
    await db.delete(departments).where(eq(departments.id, id));
  }
}
```

## Query Service (조회 전용)

```typescript
// $lib/server/infra/service/member-query.service.ts
import { db } from '$lib/server/db';
import { members } from '$lib/server/db/organization-schema';
import { departments, positions } from '$lib/server/db/organization-schema';

export interface MemberView {
  id: string;
  name: string;
  departmentName: string | null;
  positionName: string | null;
}

export interface MemberPage {
  items: MemberView[];
  total: number;
}

export class MemberQueryService {
  static async listPage(params: {
    page: number;
    size: number;
    search?: string;
  }): Promise<MemberPage> {
    // 크로스 도메인 조인 — 조회 전용이므로 허용
    const query = db
      .select({
        id: members.id,
        name: members.name,
        departmentName: departments.name,
        positionName: positions.name,
      })
      .from(members)
      .leftJoin(departments, eq(members.departmentId, departments.id))
      .leftJoin(positions, eq(members.positionId, positions.id));
    // ... 필터링, 페이징, 총 건수 계산
  }
}
```

### 타입 관리

- ORM 스키마에서 타입을 추출한다 (Drizzle: `InferSelectModel`, Prisma: generated types 등).
- `$lib/entities/`에서 `import type`으로 re-export한다.
- `import type`은 SvelteKit의 `$lib/server/` 보호 제한에 걸리지 않는다.

## REST 엔드포인트

```typescript
// routes/api/admin/departments/+server.ts
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import { Department } from '$lib/server/domain/organization/department';

const createSchema = z.object({ name: z.string().min(1) });

export const POST = async ({ request }) => {
  const data = await request.json();
  const result = createSchema.safeParse(data);
  if (!result.success) {
    return json({ error: '부서명을 입력해주세요.' }, { status: 400 });
  }

  const department = await Department.create(result.data);
  return json(department);
};
```

## 왜 form actions를 쓰지 않는가?

form actions는 SvelteKit에 강하게 결합된다. REST API로 분리하면:
- 추후 백엔드를 별도 서버(NestJS, Go, Spring 등)로 분리할 때 **API 엔드포인트를 그대로 마이그레이션**할 수 있다.
- Flutter, React Native 등 외부 클라이언트에서도 **동일 엔드포인트를 재사용**할 수 있다.
- 프론트엔드와 백엔드의 관심사가 명확히 분리된다.
