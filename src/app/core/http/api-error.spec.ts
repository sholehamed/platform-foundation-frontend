import { HttpErrorResponse } from '@angular/common/http';
import { describe, expect, it } from 'vitest';
import { normalizeApiError } from './api-error';

describe('normalizeApiError', () => {
  it('hides arbitrary server messages and retains only safe error codes', () => {
    const result = normalizeApiError(new HttpErrorResponse({
      status: 403,
      error: { error: { code: 'authorization.denied', message: 'sensitive backend debug text' } },
    }));
    expect(result.status).toBe(403);
    expect(result.code).toBe('authorization.denied');
    expect(result.message).not.toContain('sensitive');
  });
});
