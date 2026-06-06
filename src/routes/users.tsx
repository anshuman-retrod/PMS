import { createFileRoute } from "@tanstack/react-router";
import { GuardedRoute } from "@/features/auth/components/GuardedRoute";
import { UsersFeature } from "@/features/settings/components/UsersFeature";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "Users & Access — Retrod PMS" }] }),
  component: UsersGuardedRoute,
});

function UsersGuardedRoute() {
  return (
    <GuardedRoute
      permission="users.manage"
      title="Users administration is restricted"
      description="This route requires the users.manage permission. You can still review account context from other modules."
    >
      <UsersFeature />
    </GuardedRoute>
  );
}
