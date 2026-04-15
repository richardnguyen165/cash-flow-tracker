import ClientSidebar from "../../components/sidebar/ClientSideBar";
import LoggedInNav from "../../components/navbar/LoggedInNav";
import OutstandingBalanceCard from "../../components/cards/OutstandingBalanceCard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <LoggedInNav />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 px-8 py-10">
          <h1 className="text-5xl font-bold text-black">Overview</h1>
          <p className="mt-3 text-lg text-black">
            Welcome back. Here is a summary of your capital holdings.
          </p>

          <div className="mt-10 max-w-175">
            <OutstandingBalanceCard
              balance="$148,230.00"
              onPay={() => console.log("Pay outstanding clicked")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
