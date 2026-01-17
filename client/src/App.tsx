import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import OurStory from "@/pages/our-story";
import OurBrands from "@/pages/our-brands";
import OurImpact from "@/pages/our-impact";
import ContactUs from "@/pages/contact-us";
import Careers from "@/pages/careers";
import Blog from "@/pages/blog";
import AllProducts from "@/pages/all-products";
import AirFresheners from "@/pages/air-fresheners";
import PerfumesBodyCare from "@/pages/perfumes-body-care";
import CleaningProducts from "@/pages/cleaning-products";
import PersonalCare from "@/pages/personal-care";
import HomeCare from "@/pages/home-care";
import SearchPage from "@/pages/search";
import { useState, useEffect } from "react";

import AdminLayout from "@/pages/admin/adminLayout";
import Dashboard from "@/pages/admin/dashboard";

import CategoryList from "@/pages/admin/categories/categoryList";
import CategoryForm from "@/pages/admin/categories/categoryForm";

import VariantList from "@/pages/admin/variants/variantList";
import VariantForm from "@/pages/admin/variants/variantForm";

import ProductList from "@/pages/admin/products/productList";
import ProductForm from "@/pages/admin/products/productForm";

import JobList from "@/pages/admin/jobs/jobList";
import JobForm from "@/pages/admin/jobs/jobForm";

import OurMission from "@/pages/admin/content/ourMission";
import OurStoryAdmin from "@/pages/admin/content/ourStory";

import CategoryProducts from "@/pages/category-products";

import AdminProtectedRoute from "./pages/admin/adminProtected";

import AdminLogin from "./pages/admin/adminLogin";

import AdminSettings from "./pages/admin/adminSettings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about-us" component={About} />
      <Route path="/our-story" component={OurStory} />
      <Route path="/our-brands" component={OurBrands} />
      <Route path="/our-impact" component={OurImpact} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog" component={Blog} />
      <Route path="/all-products" component={AllProducts} />
      {/* <Route path="/air-fresheners" component={AirFresheners} />
      <Route path="/perfumes-body-care" component={PerfumesBodyCare} />
      <Route path="/cleaning-products" component={CleaningProducts} />
      <Route path="/personal-care" component={PersonalCare} />
      <Route path="/home-care" component={HomeCare} /> */}
      <Route path="/search" component={SearchPage} />
      <Route path="/category/:id">
        {(params) => <CategoryProducts />}
      </Route>


      {/* Admin Routes */}
      <Route path="/admin">
        <AdminProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/login">
        <AdminLogin />
      </Route>

      <Route path="/admin/settings">
        <AdminProtectedRoute>
          <AdminLayout>
            <AdminSettings />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>


      <Route path="/admin/categories">
        <AdminProtectedRoute>
          <AdminLayout>
            <CategoryList />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/categories/new">
          <AdminProtectedRoute>
          <AdminLayout>
            <CategoryForm />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/categories/:id/edit">
        {(params) => (
          <AdminProtectedRoute>
            <AdminLayout>
            <CategoryForm id={params.id} />
          </AdminLayout>
          </AdminProtectedRoute>
        )}
      </Route>

      <Route path="/admin/variants">
        <AdminProtectedRoute>
          <AdminLayout>
            <VariantList />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/variants/new">
          <AdminProtectedRoute>
          <AdminLayout>
            <VariantForm />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/variants/:id/edit">
        {(params) => (
          <AdminProtectedRoute>
            <AdminLayout>
            <VariantForm id={params.id} />
          </AdminLayout>
          </AdminProtectedRoute>
        )}
      </Route>

      <Route path="/admin/products">
        <AdminProtectedRoute>
          <AdminLayout>
            <ProductList />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/products/new">
        <AdminProtectedRoute>
          <AdminLayout>
            <ProductForm />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/products/:id/edit">
        {(params) => (
          <AdminProtectedRoute>
            <AdminLayout>
            <ProductForm id={params.id} />
          </AdminLayout>
          </AdminProtectedRoute>
        )}
      </Route>

      <Route path="/admin/jobs">
        <AdminProtectedRoute>
          <AdminLayout>
            <JobList />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/jobs/new">
        <AdminProtectedRoute>
          <AdminLayout>
            <JobForm />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/jobs/:id/edit">
        {params => (
          <AdminProtectedRoute>
            <AdminLayout>
            <JobForm id={params.id} />
          </AdminLayout>
          </AdminProtectedRoute>
        )}
      </Route>

      <Route path="/admin/content/mission">
        <AdminProtectedRoute>
          <AdminLayout>
            <OurMission />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      <Route path="/admin/content/story">
        <AdminProtectedRoute>
          <AdminLayout>
            <OurStoryAdmin />
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>

      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("App component mounted");
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Something went wrong</h1>
        <p>Error: {error?.message}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;