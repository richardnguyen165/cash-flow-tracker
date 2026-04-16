import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  ChartBarIcon,
  CreditCardIcon,
  ArrowTopRightOnSquareIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function ClientSidebar() {
  return (
    // to make the side bar fits right under nav bar
    <aside className="flex min-h-[calc(100vh-73px)] w-60 flex-col justify-between border-r-2 border-purple-200 bg-white px-6 py-8">
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-black">Jane Smith</h2>
          <p className="text-base text-gray-500">Private Client</p>
          <p className="text-base text-gray-400">User ID: 2187461</p>
        </div>
        <nav className="space-y-8">
          <Link
            to="/contracts"
            className="flex items-center gap-3 text-lg text-black transition hover:text-purple-500"
          >
            <DocumentTextIcon className="h-6 w-6" />
            <span>My Contracts</span>
          </Link>
          <Link
            to="/invoices"
            className="flex items-center gap-3 text-lg text-black transition hover:text-purple-500"
          >
            <ChartBarIcon className="h-6 w-6" />
            <span>My Invoices</span>
          </Link>
          <Link
            to="/payments"
            className="flex items-center gap-3 text-lg text-black transition hover:text-purple-500"
          >
            <CreditCardIcon className="h-6 w-6" />
            <span>My Payments</span>
          </Link>
          <Link
            to="/business-client"
            className="flex items-center gap-3 text-lg text-black transition hover:text-purple-500"
          >
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
            <span>Business Client</span>
          </Link>
        </nav>
      </div>
      <div className="flex items-center justify-end gap-4">
        <button className="text-gray-700 transition hover:text-purple-500">
          <QuestionMarkCircleIcon className="h-7 w-7" />
        </button>
        <button className="text-gray-700 transition hover:text-purple-500">
          <Cog6ToothIcon className="h-7 w-7" />
        </button>
      </div>
    </aside>
  );
}

export default ClientSidebar;