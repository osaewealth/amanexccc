import { Button } from "@/components/ui/button";
import logo from '@/assets/logo.png';

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        window.location.href = "/admin/login";
      };
      
    return (
      <div className="min-h-screen flex bg-gray-100">
        
        {/* Sidebar */}
        <aside className="w-70 bg-coty-navy text-white p-6">
          <div className="w-full flex items-center gap-2 mb-12">
            <img src={logo} alt="Amanex Logo" className="h-12" />
            <h2 className="text-xl font-bold">Amanex Admin</h2>
          </div>
  
          <nav className="space-y-4 w-full flex flex-col gap-4">
            <a href="/admin" className="hover:text-blue-500 transition-all">Dashboard</a>
            
            <a href="/admin/categories" className="hover:text-blue-500 transition-all">Categories</a>

            <a href="/admin/products" className="hover:text-blue-500 transition-all">Products</a>

            <a href="/admin/variants" className="hover:text-blue-500 transition-all">Variants</a>

            <a href="/admin/jobs" className="hover:text-blue-500 transition-all">Job Roles</a>

            <a href="/admin/content/mission" className="hover:text-blue-500 transition-all">Our Mission</a>

            <a href="/admin/content/story" className="hover:text-blue-500 transition-all">Our Story</a>
            
            <a href="#" onClick={logout} className="hover:text-blue-500 transition-all">Logout</a>
          </nav>
          {/* <Button onClick={logout}>Logout</Button> */}
        </aside>
  
        {/* Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
  
      </div>
    );
  }
  