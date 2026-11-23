export type Classification =
  | 'CORRECT'
  | 'MISSING'
  | 'INCORRECT'
  | 'DUPLICATE'
  | 'UNSUPPORTED'
  | 'UNVERIFIED';

export type Phase =
  | 'INVENTORY'
  | 'MASTER'
  | 'GAME'
  | 'MODULES'
  | 'CROSSREF';

export interface Finding {
  id: string;
  phase: Phase;
  area: string;
  entity: string;
  classification: Classification;
  severity: 'info' | 'low' | 'medium' | 'high';
  message: string;
  evidence: string[];
  sources: string[];
  runtimeRequired?: boolean;
  recommendation?: string;
}

export interface Coverage {
  checked: number;
  unchecked: number;
  unverified: number;
  detail: Record<string, number>;
  byClassification: Record<string, number>;
}

export interface AuditOutput {
  generatedAt: string;
  baseRef: string;
  modes: string[];
  findings: Finding[];
  coverage: Coverage;
  reference?: unknown;
  schema?: unknown;
  source?: unknown;
  db?: {
    connected: boolean;
    tableCounts: Record<string, number>;
    checks: Record<string, number>;
    notes: string[];
  };
}

export interface FixPlan {
  order: number;
  area: string;
  findingId: string;
  action: string;
  dryRunCommand: string;
  validationCommand: string;
  backupCommand: string;
  rollbackCommand: string;
  runtimeRequired: boolean;
}
