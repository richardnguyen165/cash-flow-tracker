import ClientSidebar from "../../components/sidebar/ClientSideBar";
import MainLayout from "../../layout/MainLayout";
import { clientNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";

const defaultInfoFields = [
    ["Full Name", "Julian Delphiki"],
    ["Email Address", "julian@trillium.app"],
    ["Phone Number", "+1 (555) 012-3456"],
    ["Company", "Northline Advisory"],
];

function buildPersonalRowsFromIdentity(identity) {
  const {User_Role} = decodeTokens();
  const isBusiness = User_Role === "BUSINESS" || User_Role === "BUSINESS_ADMIN";
  const nameLabel = isBusiness ? "Business Name" : "Name";
  const baseRows = [
    [nameLabel, identity.name],
    ["Email Address", identity.email],
    ["Phone Number", identity.phone],
  ];
  return isBusiness
    ? [...baseRows, ["Access Code", identity.accessCode]]
    : baseRows;
}

function Profile({
  sidebar = <ClientSidebar />,
  navItems = clientNav,
  brandLink = "/dashboard",
  eyebrow = "Account",
  title = "Profile Settings",
  description = "Update your contact details, notification preferences, and workspace security settings in one place.",
  identity = undefined,
  infoFields = defaultInfoFields,
  preferenceRows = [
    {
      title: "Invoice alerts",
      description: "Get notified when invoices are approved, due soon, or paid.",
      enabled: true,
    },
    {
      title: "Payment summaries",
      description: "Receive a weekly recap of completed and pending payments.",
      enabled: false,
    },
  ],
  securityTitle = "Password & access",
  securityDescription = "Manage sign-in credentials and keep the workspace protected.",
  statusTitle = "Workspace Status",
  statusItems = [
    "Verified account access",
    "Client workspace active",
    "Notifications enabled for invoice alerts",
  ],
}) {
  const personalRows =
    identity !== undefined && identity !== null
      ? buildPersonalRowsFromIdentity(identity)
      : infoFields;

  return (
    <MainLayout sidebar={sidebar} navItems={navItems} brandLink={brandLink}>
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5cf6]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[#0f172a]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[#64748b]">
          {description}
        </p>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f172a]">
            Personal Information
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {personalRows.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                  {label}
                </p>
                <div className="mt-2 rounded-2xl bg-[#f1f5f9] px-4 py-4 text-sm font-medium text-[#0f172a]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-10 rounded-[28px] border border-[#eef2f6] p-6">
            <h3 className="text-lg font-semibold text-[#0f172a]">
              Notification Preferences
            </h3>
            <div className="mt-5 space-y-4">
              {preferenceRows.map((row) => (
                <PreferenceRow key={row.title} {...row} />
              ))}
            </div>
          </div> */}
        </div>

        {/* <div className="space-y-6">
          <div className="rounded-[32px] border border-[#e7edf5] bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
              Security
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0f172a]">
              {securityTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#64748b]">
              {securityDescription}
            </p>
            <button className="mt-8 w-full rounded-2xl border border-[#d8e1ec] px-5 py-3 text-sm font-medium text-[#0f172a] transition hover:border-[#0f172a]">
              Change Password
            </button>
          </div>

          <div className="rounded-[32px] bg-[#1f2937] p-8 text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b4fe]">
              {statusTitle}
            </p>
            <ul className="mt-6 space-y-4 text-sm text-[#d6e4ef]">
              {statusItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div> */}
      </section>
    </MainLayout>
  );
}

function PreferenceRow({ title, description, enabled = false }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-4">
      <div>
        <p className="text-sm font-semibold text-[#0f172a]">{title}</p>
        <p className="mt-1 text-sm text-[#64748b]">{description}</p>
      </div>
      <div
        className={`h-6 w-11 rounded-full p-1 transition ${
          enabled ? "bg-[#8b5cf6]" : "bg-[#dbe4ee]"
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default Profile;
