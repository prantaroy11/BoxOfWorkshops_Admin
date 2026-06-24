/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const pages = [
  "app/(auth)/login/page.tsx",
  "app/(dashboard)/layout.tsx",
  "app/(dashboard)/dashboard/page.tsx",
  "app/(dashboard)/users/practitioners/page.tsx",
  "app/(dashboard)/users/practitioners/[id]/page.tsx",
  "app/(dashboard)/users/bookers/page.tsx",
  "app/(dashboard)/users/bookers/[id]/page.tsx",
  "app/(dashboard)/workshops/page.tsx",
  "app/(dashboard)/workshops/[id]/page.tsx",
  "app/(dashboard)/workshops/approvals/page.tsx",
  "app/(dashboard)/bookings/page.tsx",
  "app/(dashboard)/bookings/[id]/page.tsx",
  "app/(dashboard)/payments/page.tsx",
  "app/(dashboard)/commissions/page.tsx",
  "app/(dashboard)/newsletter/page.tsx",
  "app/(dashboard)/newsletter/[id]/page.tsx",
  "app/(dashboard)/create-ads/page.tsx",
  "app/(dashboard)/settings/page.tsx",
  "app/layout.tsx",
  "app/page.tsx"
];

for (const page of pages) {
  const fullPath = path.join('src', page);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, "export default function PageName() {\n  return <div>PageName</div>;\n}");
}

// Layout overrides
fs.writeFileSync("src/app/(dashboard)/layout.tsx", "export default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return <div>{children}</div>;\n}");

const components = ["Sidebar.tsx", "Header.tsx", "StatsCard.tsx", "DataTable.tsx", "Badge.tsx", "Modal.tsx", "Pagination.tsx"];
const compDir = path.join('src', 'components', 'ui');
fs.mkdirSync(compDir, { recursive: true });
for (const comp of components) {
  fs.writeFileSync(path.join(compDir, comp), "export default function ComponentName() {\n  return <div />;\n}");
}

const features = ["auth", "dashboard", "practitioners", "bookers", "workshops", "bookings", "payments", "commissions", "newsletter", "create-ads"];
for (const feat of features) {
  fs.mkdirSync(path.join('src', 'features', feat, 'components'), { recursive: true });
  fs.mkdirSync(path.join('src', 'features', feat, 'hooks'), { recursive: true });
  fs.mkdirSync(path.join('src', 'features', feat, 'types'), { recursive: true });
}

fs.mkdirSync(path.join('src', 'lib'), { recursive: true });
fs.mkdirSync(path.join('src', 'stores'), { recursive: true });
fs.mkdirSync(path.join('src', 'types'), { recursive: true });

console.log("Done");
