import { useEffect, useState } from "react";
import BusinessSideBar from "../../components/sidebar/BusinessSideBar";
import Profile from "./Profile";
import { businessAdminNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";
import { fetchBusinessProfile } from "../../services/businessWorkspace";

function BusinessProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBusinessProfile() {
      try {
        const decoded = decodeTokens();
        const businessId =
          decoded?.User_Role === "BUSINESS_ADMIN"
            ? decoded?.business_id
            : decoded?.id;
        if (!businessId) {
          setProfile(null);
          return;
        }
        const data = await fetchBusinessProfile(businessId);
        setProfile(data);
      } catch (error) {
        console.error("Could not load business profile.", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadBusinessProfile();
  }, []);

  const name = profile?.Business_Name ?? "";
  const email = profile?.User_ID?.username ?? "";
  const phone = profile?.Business_PhoneNumber ?? "";
  const accessCode = profile?.Business_AccessCode ?? "";

  const identity = loading
    ? {
        accountType: "business",
        name: "Loading…",
        email: "Loading…",
        phone: "Loading…",
        accessCode: "Loading…",
      }
    : {
        accountType: "business",
        name: name || "—",
        email: email || "—",
        phone: phone || "—",
        accessCode: accessCode || "—",
      };

  return (
    <Profile
      sidebar={<BusinessSideBar />}
      navItems={businessAdminNav}
      brandLink="/business/dashboard"
      eyebrow="Business Profile"
      title="Business Settings"
      description="Organization contact details and workspace access code."
      identity={identity}
    />
  );
}

export default BusinessProfile;
