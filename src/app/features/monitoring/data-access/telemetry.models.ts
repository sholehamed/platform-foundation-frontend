/** Mirrors backend Application.SharedKernel.Observability/TelemetryContracts.cs (v1). */
export enum TelemetryKind {
  Operation = 0,
  Log = 1,
  Trace = 2,
  Exception = 3,
}

export interface TelemetryItem {
  readonly id: string;
  readonly timestamp: string;
  readonly kind: TelemetryKind;
  readonly source: string;
  readonly name: string;
  readonly level: string | null;
  readonly durationMs: number | null;
  readonly failed: boolean;
  readonly slow: boolean;
  readonly traceId: string | null;
  readonly spanId: string | null;
  readonly parentSpanId: string | null;
  readonly errorType: string | null;
}

export interface TelemetryPage<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}

export interface TelemetryTraceResult {
  readonly traceId: string;
  readonly total: number;
  readonly truncated: boolean;
  readonly items: readonly TelemetryItem[];
}

export interface TelemetryTrendBucket {
  readonly start: string;
  readonly count: number;
  readonly failed: number;
  readonly slow: number;
}

export interface TelemetrySummary {
  readonly from: string;
  readonly to: string;
  readonly total: number;
  readonly failed: number;
  readonly slow: number;
  readonly averageDurationMs: number;
  readonly p50DurationMs: number;
  readonly p95DurationMs: number;
  readonly p99DurationMs: number;
  readonly percentilesSampled: boolean;
  readonly trend: readonly TelemetryTrendBucket[];
}

export interface LiveOperation {
  readonly category: string;
  readonly name: string;
  readonly count: number;
  readonly failed: number;
  readonly slow: number;
  readonly averageDurationMs: number;
  readonly p95DurationMs: number;
}

export interface LiveSnapshot {
  readonly generatedAt: string;
  readonly windowStart: string;
  readonly total: number;
  readonly failed: number;
  readonly slow: number;
  readonly averageDurationMs: number;
  readonly p95DurationMs: number;
  readonly operations: readonly LiveOperation[];
}

export interface TelemetryQuery {
  readonly from?: string;
  readonly to?: string;
  readonly kind?: TelemetryKind;
  readonly source?: string;
  readonly name?: string;
  readonly traceId?: string;
  readonly failed?: boolean;
  readonly slow?: boolean;
  readonly page?: number;
  readonly pageSize?: number;
}
