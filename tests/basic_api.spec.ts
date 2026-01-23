import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { buildCreatePostPayload } from '../request_body/createPost.body';
import { postSchema } from '../schemas/post.schema';
import { ajv, assertAjvValid } from '../utils/ajv';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';
const EXPECTED_TITLE =
  'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';

const validatePost = ajv.compile(postSchema);

test('GET /posts/1 - Case1(status)', async ({ request }) => {
  const res = await request.get(URL);

  await test.step('Case 1: status code & status text', async () => {
    expect(res.status()).toBe(200);
    expect(res.statusText()).toBe('OK');
    expect(res.headers()['content-type']).toContain('application/json');
  });

  const body = await res.json();
  console.log('STUB_BASE_URL:', process.env.STUB_BASE_URL);

  await test.step('Case 2: response schema (AJV)', async () => {
    const ok = validatePost(body);
    assertAjvValid(ok, validatePost.errors); // ✅ ถ้า fail จะขึ้นข้อความบอกว่า fail เพราะอะไร
    // expect(ok, validatePost.errors ? JSON.stringify(validatePost.errors, null, 2) : 'schema invalid').toBe(true);
  });

  await test.step('Case 3: response body', async () => {
    expect(body.userId).toBe(1);
    expect(body.id).toBe(1);
    expect(body.title).toBe(EXPECTED_TITLE);
    expect(body).toHaveProperty('title');
  });
});

test('POST /posts - status + response body', async ({ request }) => {
  const payload = buildCreatePostPayload({
    title: 'my title from playwright',
    body: 'my body from playwright',
    email: 'kachain3099@gmail.com'
  });
  console.log(payload);

  const res = await request.post(`${URL}/posts`, {
    data: payload
  });

  await test.step('Case 1: status & headers', async () => {
    expect(res.status()).toBe(201);
    expect(res.headers()['content-type']).toContain('application/json');
  });

  const body = await res.json();

  await test.step('Case 2: response body values', async () => {
    // service จะ echo ค่าเดิมกลับมา
    expect(body.userId).toBe(payload.userId);
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);

    // id ถูกสร้างใหม่
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
  });
});
