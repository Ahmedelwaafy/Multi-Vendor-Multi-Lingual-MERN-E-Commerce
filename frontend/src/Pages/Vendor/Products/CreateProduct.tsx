import { TextComponent } from "@/components/FormComponents";
import { Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";
type FormValues = {
  product_name_en: string;
  product_name_ar: string;
  description: string;
  category: string;
  tags: string;
  price: number | string;
  discount: number | string;
  stock: number | string;
};
export function Component() {
  const { t, i18n } = useTranslation("VendorCreateProduct");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      product_name_en: "",
      product_name_ar: "",
      description: "",
      category: "",
      tags: "",
      price: "",
      discount: "",
      stock: "",
    },
  });

  const {
    mutate: CreateProduct,
    isPending,
    error: ServerErrors,
  } = usePostData(
    true,
    () => {
      captchaRef?.current?.reset();
      methods.reset();
      navigate(`/${lng}/shop/products`);
    },
    false,
    () => {
      captchaRef?.current?.reset();
    }
  );
  const onSubmit = async (data: FormValues) => {
    try {
      const name = { en: data?.product_name_en, ar: data?.product_name_ar };
      delete data.product_name_en;
      delete data.product_name_ar;
      await captchaRef?.current?.executeAsync();
      CreateProduct({
        api: import.meta.env.VITE_VENDOR_CREATE_PRODUCT,
        data: { ...data, name },
        file: true,
      });
      console.log({ ...data, name });
    } catch (error) {
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };
  const [vendorProfileData, refetchVendorProfileData] = useOutletContext();
  /*   const {
    data: orders,
    refetch,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    VENDOR.CREATE_PRODUCT,
    import.meta.env.VITE_VENDOR_CREATE_PRODUCT,
    false,
    "",
    3 * 60 * 1000,
    3 * 60 * 1000,
    true,
    true
  ); */

  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${vendorProfileData?.name || ""} ${t("tab.title")}`}
        description={`${vendorProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />

      <Heading className="mb-5 text-secondary uppercase">
        {t("heading")}
      </Heading>
      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-col-center w-2/5 md:w-10/12 min-w-[550px] md:min-w-[300px] gap-1 border py-5 px-7 border-muted rounded-3xl shadow-xl hover:animated-blob  "
        >
         
          {/** Name  */}
          <div className="flex w-full items-start justify-between gap-16 xl:gap-10 md:flex-col  md:gap-2 mt-4">
            <TextComponent
              t={t}
              name="product_name_en"
              label={t("form.product_name_en.label")}
              placeholder={t("form.product_name_en.placeholder")}
              ServerErrors={ServerErrors}
              validations={{ pattern: /^[A-Za-z\s]+$/ }}
            />
            <TextComponent
              t={t}
              name="product_name_ar"
              label={t("form.product_name_ar.label")}
              placeholder={t("form.product_name_ar.placeholder")}
              ServerErrors={ServerErrors}
              validations={{ pattern: /^[؀-ۿ\s]+$/ }}
            />
          </div>
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
          {/**   address & zipCode*/}
          <div className="flex w-full items-start justify-between gap-16 xl:gap-10 md:flex-col  md:gap-2">
            {/** address  */}
            <TextComponent
              t={t}
              name="address"
              label={t("form.address.label")}
              placeholder={t("form.address.placeholder")}
              ServerErrors={ServerErrors}
            />
            {/** zipCode  */}
            <NumberComponent
              t={t}
              name="zipCode"
              label={t("form.zipCode.label")}
              placeholder={t("form.zipCode.placeholder")}
              ServerErrors={ServerErrors}
              disableFormatting
              validations={{
                pattern: /^[\d]{5}/,
                maxLength: 5,
                minLength: 5,
              }}
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
          </div>
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
              to="/seller/login"
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
