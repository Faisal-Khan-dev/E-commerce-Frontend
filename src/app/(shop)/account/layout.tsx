import { AccountSidebar } from "@/components/sidebars/AccountSidebar";

export default function AccountDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <aside className="w-full md:w-64 shrink-0 sticky top-6">
            <AccountSidebar />
          </aside>
          <div className="flex-grow min-w-0 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}