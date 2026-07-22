import { agentSkillsHeaders, getAgentSkillsIndex } from '@/lib/agent-skills';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(await getAgentSkillsIndex(), {
    headers: agentSkillsHeaders('application/json; charset=utf-8'),
  });
}

export function HEAD() {
  return new Response(null, {
    headers: agentSkillsHeaders('application/json; charset=utf-8'),
  });
}
