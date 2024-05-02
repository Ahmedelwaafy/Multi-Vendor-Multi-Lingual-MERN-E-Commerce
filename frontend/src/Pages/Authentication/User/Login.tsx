import { usePostData } from "@/Hooks/useAxios";
import { useAppDispatch } from "@/app/reduxHooks";
import {
  CheckBox,
  EmailComponent,
  PasswordComponent,
  SubmitBtnComponent,
} from "@/components/FormComponents";
import Captcha from "@/components/FormComponents/Captcha";
import {
  Heading,
  HelmetTags,
  LangLink,
  Logo,
  SubHeading,
} from "@/components/MainComponents";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  setUserSession,
  setUserData,
} from "@/app/Features/AuthenticationSlice";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: number | string;
  remember_me: boolean;
};

export function Component() {
  const { t, i18n } = useTranslation("Pages_Login");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const dispatchRedux = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const captchaRef = useRef(null);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const {
    mutate: postLoginData,
    isPending,
    error: ServerErrors,
  } = usePostData(
    true,
    (data) => {
      captchaRef?.current?.reset();
      //localStorage.setItem("UD", JSON.stringify(data?.data));
      console.log(data);

      Cookies.set("UT", data?.data?.user?._id);
      //dispatchRedux(setUserData(data?.data));
      dispatchRedux(setUserSession(data?.data?.user?._id));
      queryClient.clear();
      methods.reset();
      navigate(`/${lang}`);
    },
    false,
    () => {
      captchaRef?.current?.reset();
    }
  );

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);

      await captchaRef?.current?.executeAsync();
      postLoginData({
        api: import.meta.env.VITE_LOGIN_USER,
        data,
      });
    } catch (error) {
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };

  return (
    <section className="custom__pattern flex-col-center w-full min-h-screen px-5 py-10 ss:px-3">
      <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        canonical="login"
      />

      <Logo className="text-secondary" />
      <Heading className="mt-5 mb-2  text-secondary">
        {t("LoginForm.heading")}
      </Heading>
      <SubHeading className="text-balance text-center mb-6 text-secondary">
        {t("LoginForm.welcome_msg")}
      </SubHeading>

      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-col-center w-1/5 md:w-10/12 min-w-[450px] md:min-w-[300px] gap-1 border py-5 px-7 border-muted rounded-3xl shadow-xl hover:animated-blob"
        >
          {/** Email  */}
          <EmailComponent
            t={t}
            name="email"
            className="w-full"
            label={t("LoginForm.email.label")}
            placeholder={t("LoginForm.email.placeholder")}
            ServerErrors={ServerErrors}
          />
          {/** Password  */}
          <PasswordComponent
            t={t}
            name="password"
            className="w-full"
            label={t("LoginForm.password.label")}
            placeholder={t("LoginForm.password.placeholder")}
            ServerErrors={ServerErrors}
          />

          {/** Remember me & forget password  */}

          <div className="flex w-full items-start justify-between gap-10  md:gap-6 sm:gap-7 sm:flex-col">
            <CheckBox
              name="remember_me"
              label={t("LoginForm.remember_me.label")}
              className="xs:text-sm"
              //value={amenity.id}
            />
            <LangLink
              href="/forgot-password"
              className="text-input underline underline-offset-4 xs:text-sm"
            >
              {t("LoginForm.Forgot_password")}
            </LangLink>
          </div>
          <Captcha
            refs={captchaRef}
            lang={lang}
            ServerError={
              ServerErrors?.response?.data?.errors?.not_ropot &&
              ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                : null
            }
          />
          {/** Submit Button */}
          <SubmitBtnComponent
            disabled={!methods.formState.isValid || isPending}
            isPending={isPending}
            value={t("LoginForm.SubmitBtnComponent.value")}
            className="mt-0"
          />
          <div className="w-full flex justify-center items-center gap-1 text-sm mt-3 text-secondary">
            {t("LoginForm.have_no_account")}
            <LangLink
              href="/register"
              className="font-semibold text-base cursor-pointer"
            >
              {t("LoginForm.register")}{" "}
            </LangLink>
          </div>
        </form>{" "}
      </FormProvider>
    </section>
  );
}
