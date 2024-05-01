import { Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData } from "@/Hooks/useAxios";
import { USER } from "@/Utilities/Constants/Queries";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserAddressCard } from "@/components/CardsComponents";
export function Component() {
  const { t, i18n } = useTranslation("UserAddresses");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";

  const [userProfileData, refetchUserProfileData] = useOutletContext();
  const {
    data: addresses,
    refetch,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    USER.ADDRESSES,
    import.meta.env.VITE_GET_USER_ADDRESSES,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true
  );
  const data = [
    {
      id: 1,
      address: "address 1  ",
      phone: "323 43534",
      default: true,
    },
    {
      id: 2,
      address: "address 2  ",
      phone: "323 435886 34",
      default: false,
    },
  ];
  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${userProfileData?.name || ""} ${t("tab.title")}`}
        description={`${userProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />
      <div className="w-full flex items-center justify-between md:flex-col md:items-start gap-5 mb-5">
        <Heading className=" text-secondary uppercase">{t("heading")}</Heading>
        <Dialog>
          <DialogTrigger>
            <Button>{t("add_new")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="flex-col flex gap-9 w-full mt-10">
        {data?.map((address) => (
          <UserAddressCard key={address?.id} address={address} t={t} />
        ))}
      </ul>
    </section>
  );
}
