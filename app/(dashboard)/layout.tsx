import Sidebar from "@/components/dashboard/Sidebar";


export default function AdminDashboardLayout ({ children }: { children: React.ReactNode}) {
    return (
     <main className="bg-dark-400 w-full flex gap-2">
      <Sidebar />
      <div className="flex-1 bg-black/10">
       {children}
      </div>
     </main>
    )
}