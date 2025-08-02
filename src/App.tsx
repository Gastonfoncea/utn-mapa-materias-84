import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapaConceptual from "./pages/MapaConceptual";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId="288851681941-s62abvgde6poe80imr5khjd6kfp3sj9b">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mapa" element={<MapaConceptual />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
</GoogleOAuthProvider>
);

export default App;
