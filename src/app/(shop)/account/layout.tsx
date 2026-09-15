import { AccountSidebar } from "@/components/sidebars/AccountSidebar";

export default function AccountDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-[#fcf9f6] min-h-screen text-zinc-900 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="md:col-span-3 lg:col-span-3">
            <AccountSidebar />
          </div>
          <div className="md:col-span-9 lg:col-span-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}