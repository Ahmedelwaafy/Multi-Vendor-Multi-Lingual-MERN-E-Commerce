import { USER } from "@/Utilities/Constants/Queries";
import { usePostData } from "@/Hooks/useAxios";
import useHandleLogOut from "@/Hooks/useHandleLogOut";
import {
  EmailComponent,
  NumberComponent,
  PasswordComponent,
  PhoneComponent,
  SubmitBtnComponent,
  TextComponent,
  UploadFileComponent,
} from "@/components/FormComponents";
import Captcha from "@/components/FormComponents/Captcha";
import { Heading, HelmetTags } from "@/components/MainComponents";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

type FormValues = {
  file: string | null | undefined;
  name: string;
  phone: number | string;
  email: string;
  currentPassword: number | string;
  password: number | string;
  confirmPassword: number | string;
  address1: string;
  address2: string;
  zipCode: number | string;
  platform: string;
};

export function Component() {
  const { t, i18n } = useTranslation("Register_Page");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const queryClient = useQueryClient();
  const [userProfileData, refetchUserProfileData] = useOutletContext();
  const captchaRef = useRef(null);
  const [values, setValues] = useState<Partial<FormValues>>();
  const [logOut] = useHandleLogOut();

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      file: "",
      name: "",
      phone: "",
      email: "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
      address1: "",
      address2: "",
      zipCode: "",
      platform: "website",
    },
    values,
  });
  const currentPassword = methods.watch("currentPassword");
  const password = methods.watch("password");
  const confirmPassword = methods.watch("confirmPassword");

  useEffect(() => {
    if (userProfileData) {
      setValues({
        name: userProfileData?.name,
        phone: userProfileData?.phone,
        email: userProfileData?.email,
        address1: userProfileData?.address1,
        address2: userProfileData?.address2,
        zipCode: userProfileData?.zipCode,
        file: "",
      });
    }
  }, [userProfileData]);

  const {
    mutate: UpdateProfile,
    isPending,
    error: ServerErrors,
  } = usePostData(
    true,
    () => {
      captchaRef?.current?.reset();
      if (currentPassword && password && confirmPassword) {
        logOut();
      }
      methods.setValue("file", "");
      queryClient.invalidateQueries({ queryKey: [USER.USER_DATA] });
    },
    false,
    () => {
      captchaRef?.current?.reset();
    }
  );

  const onSubmit = async (data: FormValues) => {
    try {
      /* await captchaRef?.current?.executeAsync();
      UpdateProfile({
        api: import.meta.env.VITE_UPDATE_PROFILE,
        data: {
          ...data,
          file: data?.file?.[0],
        },
        file: true,
      }); */
      console.log({
        ...data,
        file: data?.file?.[0],
      });
    } catch (error) {
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };

  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${userProfileData?.name || ""} ${t(
          "user_profile_page_tab.title"
        )}`}
        description={`${userProfileData?.name || ""} ${t(
          "user_profile_page_tab.description"
        )}`}
        index={false}
      />

      <Heading className="mb-5 text-secondary uppercase">
        {t("heading", { context: "user_profile_page" })}
      </Heading>
      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-col-center w-4/5 xl:w-full  gap-1 border py-5 px-7 border-muted rounded-3xl shadow-xl hover:animated-blob  "
        >
          {" "}
          <UploadFileComponent
            ServerErrors={ServerErrors}
            name="file"
            t={t}
            fileFor="user"
            serverFileSrc={userProfileData?.file}
            required={false}
          />
          {/** Name &  Email & Phone*/}
          <div className=" w-full grid grid-cols-3 lg:grid-cols-1 gap-10 lg:gap-2 ">
            {/** Name  */}
            <TextComponent
              t={t}
              name="name"
              className="w-full"
              label={t("form.name.label")}
              placeholder={t("form.name.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
            />
            {/** Email  */}
            <EmailComponent
              t={t}
              name="email"
              className="w-full"
              label={t("form.email.label")}
              placeholder={t("form.email.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
            />
            {/** Phone  */}
            <PhoneComponent
              t={t}
              name="phone"
              className="w-full"
              label={t("form.phone.label")}
              placeholder={t("form.phone.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
            />
          </div>
          {/** Passwords  */}
          <div className=" w-full grid grid-cols-3 lg:grid-cols-1 gap-10 lg:gap-2 ">
            {/** current Password  */}
            <PasswordComponent
              t={t}
              className="w-full"
              name="currentPassword"
              label={t("form.currentPassword.label")}
              placeholder={t("form.currentPassword.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
            />
            {/** Password  */}
            <PasswordComponent
              t={t}
              className="w-full"
              name="password"
              label={t("form.password.label")}
              placeholder={t("form.password.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
              confirmFor="old_vs_new"
              validations={{
                validate: (value: string) =>
                  value !== methods.getValues("currentPassword") ||
                  methods.getValues("currentPassword") == "",
              }}
            />
            {/** Confirm Password  */}
            <PasswordComponent
              t={t}
              className="w-full"
              name="confirmPassword"
              label={t("form.confirmPassword.label")}
              placeholder={t("form.confirmPassword.placeholder")}
              ServerErrors={ServerErrors}
              validations={{
                validate: (value: string) =>
                  value === methods.getValues("password"),
              }}
              required={false}
            />
          </div>{" "}
          {/** address1 &  address2 & Phone*/}
          <div className=" w-full grid grid-cols-3 lg:grid-cols-1 gap-10 lg:gap-2 ">
            {/** address1  */}
            <TextComponent
              t={t}
              name="address1"
              className="w-full"
              label={t("form.address1.label")}
              placeholder={t("form.address1.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
            />
            {/** address2  */}
            <TextComponent
              t={t}
              name="address2"
              className="w-full"
              label={t("form.address2.label")}
              placeholder={t("form.address2.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
            />

            {/** zipCode  */}
            <NumberComponent
              t={t}
              name="zipCode"
              label={t("form.zipCode.label")}
              className="w-full"
              placeholder={t("form.zipCode.placeholder")}
              ServerErrors={ServerErrors}
              required={false}
              disableFormatting
              icon={faAddressBook}
              validations={{
                pattern: /^[\d]{5}/,
                maxLength: 5,
                minLength: 5,
              }}
            />
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
            className="mt-0 max-w-60"
          />
        </form>{" "}
      </FormProvider>
    </section>
  );
}
