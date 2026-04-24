import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function SignInInfo() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    console.log({
      phoneNumber,
      birthday,
      employmentStatus,
      currentBalance,
    });

    // will be navigating to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} />
      <main className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg rounded-[28px] bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <h1 className="mb-2 text-3xl font-bold text-black">
            Get Started with Trillium.
          </h1>
          <p className="mb-8 text-base text-purple-500">
            Some additional information is required.
          </p>
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex w-full items-center rounded-xl bg-gray-100 px-4 py-4">
                <span className="shrink-0 text-base text-black">+1</span>
                <div className="mx-3 self-stretch w-px bg-gray-400" />
                <input
                  type="tel"
                  placeholder="123-456-7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Birthday <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base text-gray-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Employment Status <span className="text-red-500">*</span>
              </label>
              <div className="w-full rounded-xl bg-gray-100 px-4 py-4">
                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-2 text-base text-black">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="employed"
                      checked={employmentStatus === "employed"}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                      className="h-4 w-4"
                      required
                    />
                    Employed
                  </label>
                  <label className="flex items-center gap-2 text-base text-black">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="unemployed"
                      checked={employmentStatus === "unemployed"}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                      className="h-4 w-4"
                      required
                    />
                    Unemployed
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Current Balance <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="$12000"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base outline-none placeholder:text-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-black py-4 text-base font-medium text-white transition hover:opacity-90"
            >
              Finish Setting Up Account
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignInInfo;
