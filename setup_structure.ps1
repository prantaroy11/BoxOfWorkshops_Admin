$ErrorActionPreference = "Stop"

$pages = @(
  "app/(auth)/login/page.tsx",
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
  "app/page.tsx"
)

foreach ($page in $pages) {
  $dir = Split-Path -Path "src/$page"
  if (!(Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Set-Content -LiteralPath "src/$page" -Value "export default function PageName() {`n  return <div>PageName</div>;`n}"
}

# Create app/(dashboard)/layout.tsx with empty placeholder as requested for component files, or maybe it's just a layout.
# We'll just put a basic layout:
Set-Content -Path "src/app/(dashboard)/layout.tsx" -Value "export default function DashboardLayout({ children }: { children: React.ReactNode }) {`n  return <div>{children}</div>;`n}"

$components = @(
  "Sidebar.tsx", "Header.tsx", "StatsCard.tsx", "DataTable.tsx", "Badge.tsx", "Modal.tsx", "Pagination.tsx"
)

$compDir = "src/components/ui"
if (!(Test-Path $compDir)) { New-Item -ItemType Directory -Force -Path $compDir | Out-Null }
foreach ($comp in $components) {
  Set-Content -Path "$compDir/$comp" -Value "export default function ComponentName() {`n  return <div />;`n}"
}

$features = @("auth", "dashboard", "practitioners", "bookers", "workshops", "bookings", "payments", "commissions", "newsletter", "create-ads")
foreach ($feat in $features) {
  New-Item -ItemType Directory -Force -Path "src/features/$feat/components" | Out-Null
  New-Item -ItemType Directory -Force -Path "src/features/$feat/hooks" | Out-Null
  New-Item -ItemType Directory -Force -Path "src/features/$feat/types" | Out-Null
}

New-Item -ItemType Directory -Force -Path "src/lib" | Out-Null
New-Item -ItemType Directory -Force -Path "src/stores" | Out-Null
New-Item -ItemType Directory -Force -Path "src/types" | Out-Null
