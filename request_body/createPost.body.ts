export type CreatePostPayload = {
  userId: number;
  title: string;
  body: string;
};

export const buildCreatePostPayload = (
  overrides: Partial<CreatePostPayload> = {}
): CreatePostPayload => ({
  userId: 1,
  title: 'hello',
  body: 'world',
  ...overrides
});
