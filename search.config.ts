import type { SearchWorkflowConfig } from './types.ts';

export const SEARCH_WORKFLOW_CONFIG: SearchWorkflowConfig = {
  "search_config": {
    "fields_priority": [
      {"fields": ["Title", "Author", "Journal", "Year"], "priority": 1, "fuzzy_threshold": 0.9},
      {"fields": ["Title", "Author"], "priority": 2, "fuzzy_threshold": 0.85},
      {"fields": ["Title"], "priority": 3, "fuzzy_threshold": 0.8}
    ],
    "normalize": {
      "lowercase": true,
      "strip_punctuation": true,
      "trim_spaces": true,
      "expand_abbreviations": true
    },
    "databases_order": [
      {"name": "Library and Information Sciences Abstracts (LISA Plus) - Proquest", "priority": 1},
      {"name": "Library Literature & Information Science Index - EBSCO", "priority": 1},
      {"name": "ERIC - EBSCO", "priority": 1},
      {"name": "IGI Global - InfoSci Journals", "priority": 1},
      {"name": "Proquest Central", "priority": 2},
      {"name": "Elsevier Ebooks", "priority": 2},
      {"name": "Emerald Elite", "priority": 2},
      {"name": "JSTOR", "priority": 2},
      {"name": "All other databases", "priority": 3}
    ],
    "content_types_priority": [
      {"type": "article", "priority": 1},
      {"type": "book", "priority": 2},
      {"type": "chapter", "priority": 2},
      {"type": "dissertation", "priority": 2},
      {"type": "report", "priority": 3}
    ],
    "fallback_strategy": [
      {"step": "If no match", "action": "use fuzzy matching with lower threshold"},
      {"step": "If still no match", "action": "search alternate database order"},
      {"step": "If still no match", "action": "flag for manual check"}
    ],
    "identifier_lookup": {
      "use_DOI_if_available": true,
      "use_ISBN_if_available": true
    },
    "logging": {
      "save_successful_DOI": true,
      "save_failed_searches": true
    }
  },
  "workflow": {
    "workflow_name": "Bulletproof Academic Search",
    "steps": [
      {"step": "Input Citation", "action": "User pastes citation text"},
      {"step": "Parse Citation", "action": "Extract Title, Author, Journal, Year, DOI/ISBN if present", "tools": ["citation parser"]},
      {"step": "Normalize Data", "action": "Convert to lowercase, trim spaces, strip punctuation, expand abbreviations"},
      {"step": "Search High-Priority LIS Databases", "action": "Use multi-field search", "fields": ["Title","Author","Journal","Year"], "fuzzy_threshold": 0.9, "databases": ["Library and Information Sciences Abstracts (LISA Plus) - Proquest","Library Literature & Information Science Index - EBSCO","ERIC - EBSCO","IGI Global - InfoSci Journals"]},
      {"step": "Search Secondary Databases", "action": "If no match, search Title + Author only, fuzzy threshold 0.85", "databases": ["Proquest Central","Elsevier Ebooks","Emerald Elite","JSTOR"]},
      {"step": "Search All Remaining Databases", "action": "Title only search, fuzzy threshold 0.8", "databases": ["All other databases"]},
      {"step": "Check Identifiers", "action": "If DOI or ISBN exists, do exact match search in all databases"},
      {"step": "Content Type Priority", "action": "Articles first, then books/chapters/dissertations, then reports"},
      {"step": "Fallback & Alerts", "action": "If still no match, log failed search, flag for manual review"},
      {"step": "Output Results", "action": "Display found resources with database link, DOI/ISBN, content type"},
      {"step": "Logging", "action": "Save all successful matches, including DOI/ISBN, and failed attempts for analysis"}
    ]
  }
};