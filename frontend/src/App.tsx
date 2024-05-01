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
        //!-------- Pages Layout--------
        {
          element: <Layout />,
          children: [
            {
              index: true,
              lazy: () => import("./Pages/Public/HomePage/HomePage.tsx"),
            },

            {
              path: "products",
              lazy: () => import("./Pages/Public/Products/Products.tsx"),
            },
            {
              path: "products/:productID/*",
              lazy: () =>
                import("./Pages/Public/ProductDetails/ProductDetails.tsx"),
            },
            {
              path: "best-selling",
              lazy: () => import("./Pages/Public/BestSelling/BestSelling.tsx"),
            },
            /* {
              path: "terms-conditions",
              lazy: () => import("./Pages/Products/Products.tsx"),
            }, */
            {
              path: "not-found",
              lazy: () => import("./components/SubComponents/NotFound.tsx"),
            },
          ],
        },
        //!--------User Dashboard Layout--------
        {
          element: (
            <ProtectedRoutes redirectPath={`/${lng}`} isAllowed={!!UserSession}>
              <UserDashboardLayout />
            </ProtectedRoutes>
          ),

          children: [
            {
              path: "profile",
              lazy: () => import("./Pages/User/Profile/Profile.tsx"),
            },
            {
              path: "orders",
              lazy: () => import("./Pages/User/Orders/Orders.tsx"),
            },
            {
              path: "refunds",
              lazy: () => import("./Pages/User/Refunds/Refunds.tsx"),
            },
            {
              path: "inbox",
              lazy: () => import("./Pages/User/Inbox/Inbox.tsx"),
            },
            {
              path: "track",
              lazy: () => import("./Pages/User/TrackOrders/TrackOrders.tsx"),
            },
            {
              path: "payment-methods",
              lazy: () =>
                import("./Pages/User/PaymentMethods/PaymentMethods.tsx"),
            },
            {
              path: "address",
              lazy: () => import("./Pages/User/Address/UserAddress.tsx"),
            },
          ],
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
          children: [
            {
              path: "dashboard",
              lazy: () => import("./Pages/Vendor/Dashboard/Dashboard.tsx"),
            },
            /* {
              path: "orders",
              lazy: () => import("./Pages/Vendor/Orders/Orders.tsx"),
            },
            {
              path: "refunds",
              lazy: () => import("./Pages/Vendor/Refunds/Refunds.tsx"),
            },
            {
              path: "inbox",
              lazy: () => import("./Pages/Vendor/Inbox/Inbox.tsx"),
            },
            {
              path: "track",
              lazy: () => import("./Pages/Vendor/TrackOrders/TrackOrders.tsx"),
            },
            {
              path: "payment-methods",
              lazy: () =>
                import("./Pages/Vendor/PaymentMethods/PaymentMethods.tsx"),
            },
            {
              path: "address",
              lazy: () => import("./Pages/Vendor/Address/VendorAddress.tsx"),
            }, */
          ],
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
          children: [
            {
              path: "register",
              lazy: () => import("./Pages/Authentication/User/Register.tsx"),
            },
            {
              path: "login",
              lazy: () => import("./Pages/Authentication/User/Login.tsx"),
            },
            {
              path: "activate/:activation_token",
              lazy: () =>
                import("./Pages/Authentication/User/ActivateUser.tsx"),
            },
          ],
        },
        //! -------Vendor Auth routes--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}`}
              isAllowed={UserSession ? false : true}
            >
              <AuthLayout />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: "seller/register",
              lazy: () => import("./Pages/Authentication/Vendor/Register.tsx"),
            },
            {
              path: "seller/login",
              lazy: () => import("./Pages/Authentication/Vendor/Login.tsx"),
            },
            {
              path: "seller/activate/:activation_token",
              lazy: () =>
                import("./Pages/Authentication/Vendor/ActivateVendor.tsx"),
            },
          ],
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
