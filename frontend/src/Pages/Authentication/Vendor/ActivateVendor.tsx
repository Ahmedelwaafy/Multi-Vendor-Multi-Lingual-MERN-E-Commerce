import { usePostData } from "@/Hooks/useAxios";
import {
  Heading,
  HelmetTags,
  Logo,
  SubHeading,
} from "@/components/MainComponents";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export function Component() {
  const { activation_token } = useParams();
  const { t, i18n } = useTranslation("VerifyCode_Page");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();

  const {
    mutate: ActivateUser,
    isPending,
    error,
    isSuccess,
  } = usePostData(
    true,
    () => {
      setTimeout(() => {
        navigate(`/${lang}/seller/login`);
      }, 5000);
    },
    false,
    () => {
      setTimeout(() => {
        navigate(`/${lang}`);
      }, 5000);
    }
  );

  useEffect(() => {
    if (activation_token) {
      console.log("rendered");

      ActivateUser({
        api: import.meta.env.VITE_ACTIVATE_VENDOR,
        data: { activation_token },
      });
    }
  }, [ActivateUser, activation_token]);

  return (
    <section className="custom__pattern flex-col-center w-full min-h-screen px-5 py-10 ss:px-3">
      <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        canonical="activate"
      />

      <Logo className="text-secondary" />
      <Heading className="mt-5 mb-2  text-secondary">{t("heading")}</Heading>
      <SubHeading className="text-balance text-center mb-6 text-secondary">
        {t("welcome_msg")}
      </SubHeading>
      <div className="text-secondary flex-col-center">
        {isPending ? (
          <FontAwesomeIcon className="text-2xl" icon={faSpinner} spin />
        ) : error ? (
          <span className="text-error">
            {error?.response?.data?.message || "Something Wrong has happened!"}{" "}
          </span>
        ) : isSuccess ? (
          <>
            <FontAwesomeIcon
              className="text-7xl mx-auto animate-jump-in"
              icon={faCircleCheck}
            />
            <h3 className="mt-5"> {t("active_success_msg")}</h3>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
