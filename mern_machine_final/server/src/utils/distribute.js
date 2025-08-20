export function distributeAmongFive(items, agents) {
  const result = agents.slice(0, 5).map(a => ({ agentId: a._id, items: [] }));
  if (result.length < 5) throw new Error('Need at least 5 agents to distribute');
  let idx = 0;
  for (const item of items) {
    result[idx % 5].items.push(item);
    idx++;
  }
  return result;
}
