import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseDocument } from 'yaml';

const source = readFileSync(join(process.cwd(), '.coderabbit.yaml'), 'utf8');
const document = parseDocument(source, { uniqueKeys: true });
if (document.errors.length > 0) {
  throw new Error(document.errors.map((error) => error.message).join('\n'));
}

type CodeRabbitConfig = {
  reviews: Record<string, unknown> & {
    finishing_touches: { docstrings: { enabled: boolean } };
    tools: Record<string, { enabled: boolean }>;
    auto_review: Record<string, unknown>;
    path_filters: string[];
  };
  chat: Record<string, unknown>;
  knowledge_base: Record<string, unknown>;
  code_generation: {
    unit_tests: { path_instructions: unknown[] };
    docstrings: { language: string; path_instructions: unknown[] };
  };
};

const config = document.toJS() as CodeRabbitConfig;

describe('CodeRabbit configuration', () => {
  it('retains the complete review capability key set', () => {
    expect(Object.keys(config)).toEqual(
      expect.arrayContaining([
        'language',
        'tone_instructions',
        'early_access',
        'enable_free_tier',
        'inheritance',
        'reviews',
        'chat',
        'knowledge_base',
        'code_generation',
      ]),
    );
    expect(Object.keys(config.reviews)).toEqual(
      expect.arrayContaining([
        'profile',
        'request_changes_workflow',
        'high_level_summary',
        'high_level_summary_instructions',
        'auto_title_placeholder',
        'auto_title_instructions',
        'review_status',
        'review_details',
        'commit_status',
        'fail_commit_status',
        'collapse_walkthrough',
        'changed_files_summary',
        'enable_prompt_for_ai_agents',
        'sequence_diagrams',
        'estimate_code_review_effort',
        'suggested_labels',
        'auto_apply_labels',
        'suggested_reviewers',
        'auto_assign_reviewers',
        'suggested_reviewers_instructions',
        'labeling_instructions',
        'path_filters',
        'path_instructions',
        'auto_review',
        'pre_merge_checks',
        'finishing_touches',
        'tools',
      ]),
    );
  });

  it('enables finishing-touch docstrings and every configured review tool', () => {
    expect(config.reviews.finishing_touches).toEqual({ docstrings: { enabled: true } });
    expect(config.reviews.tools).toEqual({
      eslint: { enabled: true },
      markdownlint: { enabled: true },
      shellcheck: { enabled: true },
      actionlint: { enabled: true },
      yamllint: { enabled: true },
      gitleaks: { enabled: true },
      trufflehog: { enabled: true },
      dotenvLint: { enabled: true },
      semgrep: { enabled: true },
      osvScanner: { enabled: true },
    });
  });

  it('keeps review automation, knowledge, chat, and generation surfaces enabled', () => {
    expect(config.reviews.auto_review).toEqual({
      enabled: true,
      auto_incremental_review: true,
      auto_pause_after_reviewed_commits: 5,
      drafts: false,
      base_branches: ['.*'],
    });
    expect(config.chat).toEqual({ art: false, allow_non_org_members: false, auto_reply: true });
    expect(config.knowledge_base).toEqual(
      expect.objectContaining({
        opt_out: false,
        web_search: { enabled: true },
        code_guidelines: expect.objectContaining({ enabled: true }),
        learnings: { scope: 'auto', approval_delay: 0 },
      }),
    );
    expect(config.code_generation.unit_tests.path_instructions).toHaveLength(2);
    expect(config.code_generation.docstrings).toEqual(
      expect.objectContaining({ language: 'en-US' }),
    );
    expect(config.code_generation.docstrings.path_instructions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'src/**/*.ts' }),
        expect.objectContaining({ path: 'src/**/*.tsx' }),
        expect.objectContaining({ path: 'tests/**/*.ts' }),
        expect.objectContaining({ path: 'scripts/**/*.ts' }),
        expect.objectContaining({ path: 'scripts/**/*.js' }),
        expect.objectContaining({ path: 'scripts/**/*.mjs' }),
        expect.objectContaining({ path: 'scripts/**/*.cjs' }),
      ]),
    );
    expect(config.code_generation.docstrings.path_instructions).toHaveLength(7);
  });

  it('reviews repository-owned delivery files without copied project language', () => {
    expect(config.reviews.path_filters).toEqual(
      expect.arrayContaining([
        'pnpm-lock.yaml',
        '.codex/**',
        '.ai/**',
        'docs/aegis/**',
        'CHANGELOG.md',
      ]),
    );
    expect(config.reviews.path_filters).not.toContain('!pnpm-lock.yaml');
    expect(source).not.toMatch(/YouTube|producer|apps\/studio|paid-provider/i);
  });
});
