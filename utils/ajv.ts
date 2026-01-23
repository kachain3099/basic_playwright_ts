import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';

export const ajv = new Ajv({ allErrors: true });

export function formatAjvErrors(
  errors: ErrorObject[] | null | undefined
): string {
  if (!errors || errors.length === 0) return 'Unknown schema validation error';

  return errors
    .map((e, i) => {
      const path =
        e.instancePath && e.instancePath.length > 0 ? e.instancePath : '(root)';
      const keyword = e.keyword;
      const message = e.message ?? 'invalid';
      const params = e.params ? ` params=${JSON.stringify(e.params)}` : '';
      return `${i + 1}) path=${path} keyword=${keyword} message=${message}${params}`;
    })
    .join('\n');
}

/**
 * Throw readable error if schema validation fails
 * Usage:
 *   const ok = validate(body)
 *   assertAjvValid(ok, validate.errors)
 */
export function assertAjvValid(
  ok: boolean,
  errors: ErrorObject[] | null | undefined
): void {
  if (!ok) {
    throw new Error(
      `AJV schema validation failed:\n${formatAjvErrors(errors)}`
    );
  }
}
