import { redirect } from "next/navigation";

export default function DeprecatedDashboardAdmin() {
  redirect("/admin/dashboard");
}
