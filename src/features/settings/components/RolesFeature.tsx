import { useMemo } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader, Card, CardHeader } from "@/components/ui/Primitives";
import {
  ALL_PERMISSIONS,
  ROLE_DESCRIPTION,
  ROLE_LABEL,
  ROLE_PERMISSIONS,
  type Permission,
} from "@/features/auth/lib/rbac";
import { ROLE_OPTIONS } from "@/features/auth/lib/role-options";
import type { Role } from "@/types/rbac";

const ROLES: Role[] = ROLE_OPTIONS;

const GROUPS: Record<string, Permission[]> = {
  Dashboard: ["dashboard.view"],
  Reservations: [
    "reservations.view",
    "reservations.create",
    "reservations.modify",
    "reservations.cancel",
  ],
  "Front Office": [
    "frontdesk.view",
    "frontdesk.checkin",
    "frontdesk.checkout",
    "frontdesk.roommove",
  ],
  Housekeeping: ["housekeeping.view", "housekeeping.assign", "housekeeping.status"],
  "Guests / CRM": ["guests.view", "guests.edit", "guests.communicate"],
  "Billing & Payments": [
    "billing.view",
    "billing.post",
    "billing.refund",
    "billing.void",
    "payments.process",
  ],
  "Revenue / OTA": ["revenue.view", "revenue.editrates", "ota.manage"],
  "Reports & AI": ["reports.view", "reports.export", "ai.view"],
  Administration: [
    "rooms.manage",
    "staff.manage",
    "users.manage",
    "roles.manage",
    "audit.view",
    "property.configure",
    "settings.manage",
    "onboarding.run",
  ],
};

const PRETTY: Record<Permission, string> = Object.fromEntries(
  ALL_PERMISSIONS.map((p) => [p, p.replace(/\./g, " · ").replace(/_/g, " ")]),
) as Record<Permission, string>;

export function RolesFeature() {
  const href = useRouterState({ select: (s) => s.location.href });
  const highlightedRole = useMemo(() => {
    const value = new URL(href, "https://retrod.local").searchParams.get("role") ?? "";
    return ROLES.includes(value as Role) ? (value as Role) : null;
  }, [href]);

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Roles & Privileges"
        description="Permission matrix governing what each role can see and do across the platform."
      />

      <div className="responsive-page-x space-y-5 py-4 sm:space-y-6 sm:py-6">
        {highlightedRole ? (
          <Card>
            <div className="rounded-lg border border-info/40 bg-info-tint p-4 text-[12px] text-info sm:p-5">
              <div className="font-medium">Role focus: {ROLE_LABEL[highlightedRole]}</div>
              <div className="mt-1 text-text-secondary">{ROLE_DESCRIPTION[highlightedRole]}</div>
              <Link
                to="/users"
                className="mt-2 inline-block text-[12px] font-medium text-primary hover:text-primary-pressed hover:underline"
              >
                Back to Users & Access
              </Link>
            </div>
          </Card>
        ) : null}

        {/* Role summary cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ROLES.map((r) => (
            <div
              key={r}
              className={`rounded-lg border bg-surface p-4 shadow-e1 ${
                highlightedRole === r ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}
            >
              <div className="label-uppercase">{ROLE_LABEL[r]}</div>
              <div className="mt-1 text-[12px] leading-relaxed text-text-secondary">
                {ROLE_DESCRIPTION[r]}
              </div>
              <div className="mt-3 text-[11px] text-text-secondary">
                <span className="font-medium text-text-primary">{ROLE_PERMISSIONS[r].length}</span>{" "}
                / {ALL_PERMISSIONS.length} permissions
              </div>
            </div>
          ))}
        </div>

        {/* Permission matrix */}
        <Card>
          <CardHeader
            title="Permission matrix"
            hint="Read-only · derived from system role definitions"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/40">
                  <th className="sticky left-0 z-10 bg-surface-2/40 px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-text-secondary">
                    Capability
                  </th>
                  {ROLES.map((r) => (
                    <th
                      key={r}
                      className="px-2 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-text-secondary"
                    >
                      <div className="leading-tight">{ROLE_LABEL[r].split(" ")[0]}</div>
                      <div className="text-text-disabled">
                        {ROLE_LABEL[r].split(" ").slice(1).join(" ")}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(GROUPS).flatMap(([group, perms]) => [
                  <tr key={`group-${group}`} className="bg-surface-2/30">
                    <td
                      colSpan={ROLES.length + 1}
                      className="px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      {group}
                    </td>
                  </tr>,
                  ...perms.map((p) => (
                    <tr key={p} className="border-b border-border-subtle hover:bg-surface-2/30">
                      <td className="sticky left-0 z-10 bg-surface px-4 py-2 capitalize text-text-primary">
                        {PRETTY[p]}
                      </td>
                      {ROLES.map((r) => (
                        <td key={r} className="px-2 py-2 text-center">
                          {ROLE_PERMISSIONS[r].includes(p) ? (
                            <Check className="mx-auto h-3.5 w-3.5 text-success" />
                          ) : (
                            <span className="text-text-disabled">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  )),
                ])}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default RolesFeature;
