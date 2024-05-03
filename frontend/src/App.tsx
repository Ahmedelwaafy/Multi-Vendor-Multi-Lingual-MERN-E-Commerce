import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import UseAuth from "./Hooks/UseAuth.tsx";
import "./SASS/styles.scss";
import { setTheme, theme } from "./app/Features/MiscellaneousSlice.tsx";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks.ts";
import { AuthLayout, Layout } from "./components/LayoutComponents";
import ProtectedRoutes from "./components/ProtectionComponents/ProtectedRoutes.tsx";
import UserDashboardLayout from "./Pages/User/UserDashboardLayout.tsx";
import VendorDashboardLayout from "./Pages/Vendor/VendorDashboardLayout.tsx";
import {
  PublicRoutes,
  UserAuthRoutes,
  UserDashboardRoutes,
  VendorAuthRoutes,
  VendorDashboardRoutes,
} from "./Utilities/Constants/Routes.ts";
function App() {
  const Theme = useAppSelector(theme);
  const { i18n } = useTranslation("");
  const dispatchRedux = useAppDispatch();
  const { UserSession, VendorSession } = UseAuth();
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  //!we use startsWith instead of ==== whereas some languages codes consist of 2 words as en-us but the language in the url always consists of one word
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = lng;
  }, [dispatchRedux, i18n, lng]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (!Theme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      dispatchRedux(setTheme(systemTheme));
      return;
    }

    root.classList.add(Theme);
  }, [Theme, dispatchRedux]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate to={`/${i18n.language?.startsWith("ar") ? "ar" : "en"}`} />
      ),
    },
    {
      path: `/${i18n.language?.startsWith("ar") ? "ar" : "en"}`,
      children: [
        //!-------- Public Pages Layout--------
        {
          element: <Layout />,
          children: PublicRoutes,
        },
        //!--------User Dashboard Layout--------
        {
          element: (
            <ProtectedRoutes redirectPath={`/${lng}`} isAllowed={!!UserSession}>
              <UserDashboardLayout />
            </ProtectedRoutes>
          ),

          children: UserDashboardRoutes,
        },
        //!--------Vendor Dashboard Layout--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}`}
              isAllowed={!!VendorSession}
            >
              <VendorDashboardLayout />
            </ProtectedRoutes>
          ),
          path: "shop",
          children: VendorDashboardRoutes,
        },

        //! -------User Auth routes--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}`}
              isAllowed={UserSession ? false : true}
            >
              <AuthLayout />
            </ProtectedRoutes>
          ),
          children: UserAuthRoutes,
        },
        //! -------Vendor Auth routes--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}`}
              isAllowed={VendorSession ? false : true}
            >
              <AuthLayout />
            </ProtectedRoutes>
          ),
          children: VendorAuthRoutes,
        },
        //! ------- User Layout
      ],
    }, //!NotFound
    {
      path: "*",
      lazy: () => import("./components/SubComponents/NotFound.tsx"),
    },
  ]);

  return <RouterProvider router={router} />;
  /*   return <RouterProvider router={router} fallbackElement={< Loader />} />;
   */
}

export default App;
