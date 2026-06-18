import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { LocaleProvider } from "@/i18n/locale-provider";
import { PropertyService } from "@/services/propertyService";

const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Investment = lazy(() => import("./pages/Investment"));
const AgentGuide = lazy(() => import("./pages/AgentGuide"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/**
 * Module-level preloading: start fetch data sebelum React render.
 * PropertyService.preload() fire-and-forget — kalau gagal, silent.
 */
const ENV_READY = Boolean(
  import.meta.env.VITE_AIRTABLE_TOKEN &&
    import.meta.env.VITE_AIRTABLE_BASE_ID &&
    import.meta.env.VITE_AIRTABLE_TABLE_ID,
);

if (ENV_READY) {
  PropertyService.preload().catch(() => {});
}

// ---- Lazy page wrappers dengan preloading yang tepat ----

/**
 * Properties page wrapper — load property data via PropertyService
 * (preload dari App handle sebagian besar kasus, ini hanya fallback).
 */
function PropertiesPage() {
  return <Properties />;
}

/**
 * PropertyDetail wrapper dengan URL-based eager preload.
 * Kalau user visit dari /properties (internal nav), cache biasanya sudah ready.
 * Kalau direct link (external), PropertyDetail punya skeleton instant sendiri.
 */
function PropertyDetailPage() {
  return <PropertyDetail />;
}

// Minimal loading fallback untuk code-split pages
function PageLoader() {
  return (
    <div className="min-h-screen bg-[hsl(var(--brand-surface))] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[hsl(var(--brand-ink)/0.2)] border-t-[hsl(var(--brand-ink))]" />
        <span className="text-sm text-[hsl(var(--brand-ink)/0.6)]">Memuat…</span>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:slug" element={<PropertyDetailPage />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/agent-guide" element={<AgentGuide />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
