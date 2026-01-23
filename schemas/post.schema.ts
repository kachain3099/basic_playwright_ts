export const postSchema = {
  type: 'object',
  required: ['userId', 'id', 'title', 'body'],
  additionalProperties: true,
  properties: {
    userId: { type: 'number' },
    id: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    body: { type: 'string' }
  }
} as const;
