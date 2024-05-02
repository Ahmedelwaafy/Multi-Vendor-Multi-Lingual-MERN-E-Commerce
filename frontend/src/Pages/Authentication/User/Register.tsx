import { usePostData } from "@/Hooks/useAxios";
import {
  CheckBox,
  EmailComponent,
  PasswordComponent,
  PhoneComponent,
  SubmitBtnComponent,
  TextComponent,
  UploadFileComponent,
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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormValues = {
  avatar: string | null | undefined;
  name: string;
  email: string;
  phone: number | string;
  password: number | string;
  confirmPassword: number | string;
  accept_condition: boolean | string;
  platform: string;
};

export function Component() {
  const { t, i18n } = useTranslation("Register_Page");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();

  const captchaRef = useRef(null);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      avatar: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      accept_condition: false,
      platform: "website",
    },
  });

  const {
    mutate: registerUser,
    isPending,
    error: ServerErrors,
  } = usePostData(
    true,
    () => {
      captchaRef?.current?.reset();
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
      const file = data?.avatar?.[0];
      delete data.avatar;
      await captchaRef?.current?.executeAsync();
      registerUser({
        api: import.meta.env.VITE_REGISTER_USER,
        data: { ...data, file },
        file: true,
      });
      console.log({ ...data, file });
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
        canonical="register"
      />
      <Logo className="text-secondary" />
      <Heading className="mt-5 mb-2  text-secondary">{t("heading")}</Heading>
      <SubHeading className="text-balance text-center mb-6 text-secondary">
        {t("welcome_msg")}
      </SubHeading>

      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-col-center w-2/5 md:w-10/12 min-w-[550px] md:min-w-[300px] gap-1 border py-5 px-7 border-muted rounded-3xl shadow-xl hover:animated-blob  "
        >
          {" "}
          <UploadFileComponent
            ServerErrors={ServerErrors}
            name="avatar"
            t={t}
            fileFor="user"
          />
          {/** Name  */}
          <TextComponent
            t={t}
            name="name"
            className="w-full"
            label={t("form.name.label")}
            placeholder={t("form.name.placeholder")}
            ServerErrors={ServerErrors}
          />
          {/**   Email & Phone*/}
          <div className="flex w-full items-start justify-between gap-16 xl:gap-10 md:flex-col  md:gap-2">
            {/** Email  */}
            <EmailComponent
              t={t}
              name="email"
              label={t("form.email.label")}
              placeholder={t("form.email.placeholder")}
              ServerErrors={ServerErrors}
            />
            {/** Phone  */}
            <PhoneComponent
              t={t}
              name="phone"
              label={t("form.phone.label")}
              placeholder={t("form.phone.placeholder")}
              ServerErrors={ServerErrors}
            />
          </div>
          {/** Passwords  */}
          <div className="flex w-full items-start justify-between gap-16 xl:gap-10 md:flex-col  md:gap-2">
            <PasswordComponent
              t={t}
              name="password"
              label={t("form.password.label")}
              placeholder={t("form.password.placeholder")}
              ServerErrors={ServerErrors}
            />
            {/** Confirm Password  */}
            <PasswordComponent
              t={t}
              name="confirmPassword"
              label={t("form.confirmPassword.label")}
              placeholder={t("form.confirmPassword.placeholder")}
              ServerErrors={ServerErrors}
              validations={{
                validate: (value: string) =>
                  value === methods.getValues("password"),
              }}
            />
          </div>{" "}
          {/** accept_condition  */}
          <div className=" flex  w-full flex-col items-start justify-start gap-2  min-h-[0px]">
            <CheckBox
              required
              name="accept_condition"
              label=""
              className="truncate px-0.5 xs:text-sm"
            >
              <div>
                {t("form.terms.txt")}{" "}
                <LangLink
                  to="/terms-conditions"
                  className="font-medium underline underline-offset-4"
                  rel="noreferrer"
                  target={"_blank"}
                >
                  {t("form.terms.CTA")}
                </LangLink>
              </div>
            </CheckBox>
            {methods.formState.errors.accept_condition && (
              <p className=" text-xs text-red-500">
                {methods.formState.errors.accept_condition.type ===
                  "required" && t("form.terms.validation_required")}
              </p>
            )}
            {
              //!--- server errors --------
              ServerErrors &&
                ServerErrors?.response?.data?.errors?.accept_condition && (
                  <p className=" text-xs text-red-500">
                    {ServerErrors?.response?.data?.errors?.accept_condition[0]}
                  </p>
                )
            }
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
            value={t("form.SubmitBtnComponent.value")}
            className="mt-0"
          />
          <div className="w-full flex justify-center items-center gap-1 text-sm mt-3 text-secondary">
            {t("form__bottom.have_an_account")}
            <LangLink
              to="/login"
              className="font-bold text-base cursor-pointer"
            >
              {t("form__bottom.Login")}
            </LangLink>
          </div>
        </form>{" "}
      </FormProvider>
    </section>
  );
}