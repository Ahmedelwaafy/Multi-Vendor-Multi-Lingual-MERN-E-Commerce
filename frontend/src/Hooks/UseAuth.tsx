import {
  userSession,
  userData,
  vendorData,
  vendorSession,
} from "@/app/Features/AuthenticationSlice";
import { useAppSelector } from "@/app/reduxHooks";

export default function UseAuth() {
  const UserData = useAppSelector(userData);
  const UserSession = useAppSelector(userSession);
  const VendorData = useAppSelector(vendorData);
  const VendorSession = useAppSelector(vendorSession);

  return { UserSession, UserData, VendorSession, VendorData };
}
