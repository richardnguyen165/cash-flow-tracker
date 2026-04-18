import {
  BuildingOffice2Icon,
  UserGroupIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import WorkspaceSidebar from "./WorkspaceSidebar";

function AdminSideBar() {
  const navItems = [
    { to: "/admin/users", label: "Platform Users", Icon: UserGroupIcon },
    { to: "/admin/businesses", label: "Businesses", Icon: BuildingOffice2Icon },
    { to: "/admin/profile", label: "Profile", Icon: UserCircleIcon },
  ];

  return (
    <WorkspaceSidebar
      userName="Platform Admin"
      subtitle="Site Administration"
      meta="Global moderation and privilege control"
      navItems={navItems}
      summaryLabel="Open Reviews"
      summaryValue="18"
      summaryHint="Businesses, user escalations, and platform approvals"
    />
  );
}

export default AdminSideBar;
