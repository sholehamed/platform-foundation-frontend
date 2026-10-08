import { HttpErrorResponse } from '@angular/common/http';

export interface ApiProblem {
  readonly status: number;
  readonly code: string;
  readonly message: string;
  readonly traceId?: string;
}

export function normalizeApiError(error: unknown): ApiProblem {
  if (!(error instanceof HttpErrorResponse)) {
    return { status: 0, code: 'network.unexpected', message: 'خطایی در ارتباط رخ داد.' };
  }

  const payload: unknown = error.error;
  const body: Record<string, unknown> =
    payload !== null && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
  const nested: Record<string, unknown> =
    body['error'] !== null && typeof body['error'] === 'object'
      ? (body['error'] as Record<string, unknown>)
      : {};

  return {
    status: error.status,
    code: typeof nested['code'] === 'string' ? nested['code'] : 'http.' + error.status,
    message: error.status === 403 ? 'دسترسی لازم را ندارید.'
      : error.status === 401 ? 'برای مشاهده این بخش وارد شوید.'
      : error.status === 0 ? 'ارتباط با سرور برقرار نشد.'
      : 'دریافت اطلاعات با خطا مواجه شد.',
    traceId: typeof body['traceId'] === 'string' ? body['traceId'] : undefined,
  };
}
