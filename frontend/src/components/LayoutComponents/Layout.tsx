import { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundaryFallback } from "../SubComponents/index.ts";
import Footer from "./Footer/Footer.tsx";
import Navbar from "./Navbar/Navbar.tsx";
import ScrollToTop from "./ScrollToTop.tsx";
const LoginPopUp = lazy(() => import("../MainComponents/LoginPopUp.tsx"));
const ProductQuickViewPopUp = lazy(
  () => import("../MainComponents/ProductQuickViewPopUp.tsx")
);
function Layout() {
  const { t } = useTranslation("Layout");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <>
      <Suspense fallback={null}>
        <LoginPopUp t={t} />
      </Suspense>
      <Suspense fallback={null}>
        <ProductQuickViewPopUp t={t} />
      </Suspense>
      <ScrollToTop />
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main className="w-full min-h-[calc(100vh-180px)]">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
