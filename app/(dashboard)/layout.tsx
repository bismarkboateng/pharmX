import Sidebar from "@/components/dashboard/Sidebar";


export default function AdminDashboardLayout ({ children }: { children: React.ReactNode}) {
    return (
     <main className="w-full flex gap-2">
      <Sidebar />
      <div className="flex-1">
       {children}
      </div>
     </main>
    )
}