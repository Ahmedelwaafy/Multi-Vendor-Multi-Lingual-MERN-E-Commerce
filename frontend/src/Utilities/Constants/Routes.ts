export const PublicRoutes = [
  {
    index: true,
    lazy: () => import("../../Pages/Public/HomePage/HomePage.tsx"),
  },

  {
    path: "products",
    lazy: () => import("../../Pages/Public/Products/Products.tsx"),
  },
  {
    path: "products/:productID/*",
    lazy: () => import("../../Pages/Public/ProductDetails/ProductDetails.tsx"),
  },
  {
    path: "best-selling",
    lazy: () => import("../../Pages/Public/BestSelling/BestSelling.tsx"),
  },
  {
    path: "vendors",
    lazy: () => import("../../Pages/Public/Vendors/Vendors.tsx"),
  },
  {
    path: "vendors/:vendorID/*",
    lazy: () => import("../../Pages/Public/VendorDetails/VendorDetails.tsx"),
  },
  {
    path: "not-found",
    lazy: () => import("../../components/SubComponents/NotFound.tsx"),
  },
];

export const UserDashboardRoutes = [
  {
    path: "profile",
    lazy: () => import("../../Pages/User/Profile/Profile.tsx"),
  },
  {
    path: "orders",
    lazy: () => import("../../Pages/User/Orders/Orders.tsx"),
  },
  {
    path: "refunds",
    lazy: () => import("../../Pages/User/Refunds/Refunds.tsx"),
  },
  {
    path: "inbox",
    lazy: () => import("../../Pages/User/Inbox/Inbox.tsx"),
  },
  {
    path: "track",
    lazy: () => import("../../Pages/User/TrackOrders/TrackOrders.tsx"),
  },
  {
    path: "payment-methods",
    lazy: () => import("../../Pages/User/PaymentMethods/PaymentMethods.tsx"),
  },
  {
    path: "address",
    lazy: () => import("../../Pages/User/Address/UserAddress.tsx"),
  },
];

export const VendorDashboardRoutes = [
  {
    path: "dashboard",
    lazy: () => import("../../Pages/Vendor/Dashboard/Dashboard.tsx"),
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
];

export const UserAuthRoutes = [
  {
    path: "register",
    lazy: () => import("../../Pages/Authentication/User/Register.tsx"),
  },
  {
    path: "login",
    lazy: () => import("../../Pages/Authentication/User/Login.tsx"),
  },
  {
    path: "activate/:activation_token",
    lazy: () => import("../../Pages/Authentication/User/ActivateUser.tsx"),
  },
];

export const VendorAuthRoutes = [
  {
    path: "seller/register",
    lazy: () => import("../../Pages/Authentication/Vendor/Register.tsx"),
  },
  {
    path: "seller/login",
    lazy: () => import("../../Pages/Authentication/Vendor/Login.tsx"),
  },
  {
    path: "seller/activate/:activation_token",
    lazy: () => import("../../Pages/Authentication/Vendor/ActivateVendor.tsx"),
  },
];
