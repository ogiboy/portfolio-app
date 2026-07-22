import { agentSkillsHeaders, portfolioNavigationSkill } from '@/lib/agent-skills';

export const dynamic = 'force-static';

export function GET() {
  return new Response(portfolioNavigationSkill, {
    headers: agentSkillsHeaders('text/markdown; charset=utf-8'),
  });
}

export function HEAD() {
  return new Response(null, {
    headers: agentSkillsHeaders('text/markdown; charset=utf-8'),
  });
}
