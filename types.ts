export interface Database {
  database_name: string;
  subject_coverage: string;
  content_types: string[];
  search_fields: string[];
  filters: string[];
  syntax_template: string;
  fallback_strategies: string[];
  metadata_only: boolean;
  early_view_supported: boolean;
  priority: number;
  notes: string;
}

export interface SearchStep {
  field: string;
  value: string;
}

export interface DatabaseRecommendation {
  databaseName: string;
  reason: string;
  searchPlan: SearchStep[];
}

// New interfaces for Search Workflow Config
export interface FieldPriority {
  fields: string[];
  priority: number;
  fuzzy_threshold: number;
}

export interface Normalization {
  lowercase: boolean;
  strip_punctuation: boolean;
  trim_spaces: boolean;
  expand_abbreviations: boolean;
}

export interface DatabaseOrder {
  name: string;
  priority: number;
}

export interface ContentTypePriority {
  type: string;
  priority: number;
}

export interface FallbackStepConfig {
  step: string;
  action: string;
}

export interface IdentifierLookup {
  use_DOI_if_available: boolean;
  use_ISBN_if_available: boolean;
}

export interface Logging {
  save_successful_DOI: boolean;
  save_failed_searches: boolean;
}

export interface SearchConfig {
  fields_priority: FieldPriority[];
  normalize: Normalization;
  databases_order: DatabaseOrder[];
  content_types_priority: ContentTypePriority[];
  fallback_strategy: FallbackStepConfig[];
  identifier_lookup: IdentifierLookup;
  logging: Logging;
}

export interface WorkflowStep {
  step: string;
  action: string;
  tools?: string[];
  fields?: string[];
  fuzzy_threshold?: number;
  databases?: string[];
}

export interface Workflow {
  workflow_name: string;
  steps: WorkflowStep[];
}

export interface SearchWorkflowConfig {
  search_config: SearchConfig;
  workflow: Workflow;
}
