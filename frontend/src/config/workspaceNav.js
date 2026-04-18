export const clientNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analytics", label: "Analytics" },
  { to: "/profile", label: "Profile" },
];

export const businessAdminNav = [
  { to: "/business/dashboard", label: "Dashboard" },
  { to: "/business/employees", label: "Employees" },
  { to: "/business/profile", label: "Profile" },
];

export const employeeNav = [
  { to: "/employee/dashboard", label: "Dashboard" },
  { to: "/employee/expenses", label: "Expenses" },
  { to: "/employee/profile", label: "Profile" },
];

export const siteAdminNav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/businesses", label: "Businesses" },
  { to: "/admin/profile", label: "Profile" },
];

export const signupRedirects = {
  "individual-client": "/dashboard",
  "business-client": "/business/dashboard",
  "business-admin": "/business/dashboard",
  "site-admin": "/admin/dashboard",
  employee: "/employee/dashboard",
};

export const signinRedirects = {
  "individual-client": "/dashboard",
  "business-admin": "/business/dashboard",
  employee: "/employee/dashboard",
  "site-admin": "/admin/dashboard",
};
