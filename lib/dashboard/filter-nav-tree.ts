import type {
  NavAccessContext,
  NavGroupItem,
  NavLinkItem,
  NavNode,
} from "@/types/dashboard";

function linkVisible(link: NavLinkItem, ctx: NavAccessContext): boolean {
  const req = link.requiredPermissions;
  if (!req?.length) return true;
  return req.every((p) => ctx.permissions.has(p));
}

function filterChildren(
  nodes: readonly NavNode[],
  ctx: NavAccessContext
): NavNode[] {
  const out: NavNode[] = [];
  for (const node of nodes) {
    if (node.kind === "link") {
      if (linkVisible(node, ctx)) out.push(node);
      continue;
    }
    const req = node.requiredPermissions;
    if (req?.length && !req.every((p) => ctx.permissions.has(p))) {
      continue;
    }
    const children = filterChildren(node.children, ctx);
    if (children.length === 0) continue;
    const next: NavGroupItem = { ...node, children };
    out.push(next);
  }
  return out;
}

/**
 * Returns a copy of the nav tree with inaccessible branches removed.
 * Permission check: every declared `requiredPermissions` entry must exist in `ctx.permissions`.
 */
export function filterNavByPermissions(
  nodes: readonly NavNode[],
  ctx: NavAccessContext
): NavNode[] {
  return filterChildren(nodes, ctx);
}
