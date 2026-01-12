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
      <Route path="/air-fresheners" component={AirFresheners} />
      <Route path="/perfumes-body-care" component={PerfumesBodyCare} />
      <Route path="/cleaning-products" component={CleaningProducts} />
      <Route path="/personal-care" component={PersonalCare} />
      <Route path="/home-care" component={HomeCare} />
      <Route path="/search" component={SearchPage} />
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