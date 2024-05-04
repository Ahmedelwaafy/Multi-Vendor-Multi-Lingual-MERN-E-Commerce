import { USER } from "@/Utilities/Constants/Queries.ts";
import { useFetchData } from "@/Hooks/useAxios";
import { Footer, Navbar } from "@/components/LayoutComponents";
import { ErrorBoundaryFallback } from "@/components/SubComponents";
import { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../../components/LayoutComponents/ScrollToTop.tsx";
import UserSidebarMenu from "./UserSidebarMenu.tsx";
const LoginPopUp = lazy(
  () => import("../../components/MainComponents/LoginPopUp.tsx")
);
const ProductQuickViewPopUp = lazy(
  () => import("../../components/MainComponents/ProductQuickViewPopUp.tsx")
);
function UserDashboardLayout() {
  const { t } = useTranslation("UserDashboardLayout");

  const { pathname } = useLocation();
  const {
    data: userProfileData,
    refetch: refetchUserProfileData,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    USER.USER_DATA,
    import.meta.env.VITE_GET_USER_DATA,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true
  );
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
        <main className="w-full   min-h-[calc(100vh-180px)] pt-10  flex justify-between items-start ">
          <UserSidebarMenu
            className="w-[25%] max-w-[350px]   min-w-[250px] md:min-w-[50px] md:w-[50px]  bg-secondary rounded-r-3xl rtl:rounded-r-none rtl:rounded-l-3xl text-background min-h-[calc(100vh-140px)] overflow-hidden shadow-xl"
            pointsCount={userProfileData?.points?.verified_points}
            affiliateListCount={userProfileData?.points?.affiliate_users}
            notificationsCount={userProfileData?.points?.notifications}
          />
          <section className=" grow mx-10 xs:my-5">
            <Outlet
              context={[
                userProfileData?.user,
                refetchUserProfileData,
                isPending,
                isError,
                isPaused,
              ]}
            />
          </section>
        </main>
      </ErrorBoundary>

      <Footer />
    </>
  );
}

export default UserDashboardLayout;
