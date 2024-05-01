import { Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData } from "@/Hooks/useAxios";
import { USER } from "@/Utilities/Constants/Queries";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export function Component() {
  const { t, i18n } = useTranslation("UserInbox");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";

  const [userProfileData, refetchUserProfileData] = useOutletContext();
  const {
    data: inbox,
    refetch,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    USER.INBOX,
    import.meta.env.VITE_GET_USER_INBOX,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true
  );

  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${userProfileData?.name || ""} ${t("tab.title")}`}
        description={`${userProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />

      <Heading className="mb-5 text-secondary uppercase">
        {t("heading")}
      </Heading>
    </section>
  );
}
