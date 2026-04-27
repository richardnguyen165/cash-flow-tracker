import { useEffect, useState } from "react";
import ClientSidebar from "../../components/sidebar/ClientSideBar";
import Profile from "./Profile";
import { clientNav } from "../../config/workspaceNav";
import decodeTokens from "../../services/decode-tokens";
import { fetchIndividualProfile } from "../../services/individualWorkspace";

function IndividualProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndividualProfile() {
      try {
        const decoded = decodeTokens();
        const individualId = decoded.id;
        if (!individualId) {
          setProfile(null);
          return;
        }
        const data = await fetchIndividualProfile(individualId);
        setProfile(data);
      } catch (error) {
        console.error("Could not load individual profile.", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadIndividualProfile();
  }, []);

  const name = profile?.Individual_Name ?? "";
  const email = profile?.User_ID?.username ?? "";
  const phone = profile?.Individual_PhoneNumber ?? "";

  const identity = loading
    ? {
        accountType: "individual",
        name: "Loading…",
        email: "Loading…",
        phone: "Loading…",
      }
    : {
        accountType: "individual",
        name: name || "—",
        email: email || "—",
        phone: phone || "—",
      };

  return (
    <Profile
      sidebar={<ClientSidebar />}
      navItems={clientNav}
      brandLink="/dashboard"
      eyebrow="Account"
      title="Profile Settings"
      description="Your individual account details from registration."
      identity={identity}
    />
  );
}

export default IndividualProfile;
