import {
  ComboBox,
  DragDropArea,
  NumberComponent,
  SubmitBtnComponent,
  TextareaComponent,
  TextComponent,
} from "@/components/FormComponents";
import Captcha from "@/components/FormComponents/Captcha";
import { Heading, HelmetTags } from "@/components/MainComponents";
import { categories } from "@/constants";
import { usePostData } from "@/Hooks/useAxios";
import { cn } from "@/lib/utils";
import {
  faCartFlatbed,
  faCircleChevronRight,
  faCubesStacked,
  faPercent,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";
type FormValues = {
  product_name_en: string;
  product_name_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  tags: string;
  price: string;
  discount: number;
  stock: string;
  images: [];
};
export function Component() {
  const { t, i18n } = useTranslation("VendorCreateProduct");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      product_name_en: "product name en",
      product_name_ar: "اسم",
      description_en: "description en",
      description_ar: "وصف",
      category: "4",
      tags: "tags, tags2",
      price: "55555",
      discount: 0,
      stock: "7588",
      images: [],
    },
  });
  const images = methods.watch("images");
  const category = methods.watch("category");
  const discount = methods.watch("discount");
  const price = methods.watch("price");

  const finalPrice =
    discount > 100 ||
    discount == 0 ||
    !discount ||
    !price ||
    methods.formState.errors?.discount
      ? ""
      : Number(price.replace(/,/g, "")) -
        (discount / 100) * Number(price.replace(/,/g, ""));
  const {
    mutate: CreateProduct,
    isPending,
    isSuccess,
    error: ServerErrors,
  } = usePostData(
    true,
    () => {
      captchaRef?.current?.reset();
      //methods.reset();
      setSubmitted(false);

      //navigate(`/${lng}/shop/products`);
    },
    false,
    () => {
      captchaRef?.current?.reset();
    }
  );
  const onSubmit = async (data: FormValues) => {
    setSubmitted(true);

    try {
      const {
        product_name_ar,
        product_name_en,
        description_ar,
        description_en,
        category,
        discount,
        price,
        stock,
        images,
        tags,
      } = data;

      const finalData = {
        name: { en: product_name_en, ar: product_name_ar },
        description: { en: description_en, ar: description_ar },
        category,
        discount,
        originalPrice: Number(price.replace(/,/g, "")),
        finalPrice: finalPrice ? finalPrice : Number(price.replace(/,/g, "")),
        stock,
        images,
        tags,
      };
      console.log(finalData);

      //await captchaRef?.current?.executeAsync();
      CreateProduct({
        api: import.meta.env.VITE_VENDOR_CREATE_PRODUCT,
        data: finalData,
        file: true,
      });
    } catch (error) {
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };
  const [vendorProfileData, refetchVendorProfileData] = useOutletContext();

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
          className="flex-col-center w-3/5 xl:w-full amd:w-96 sm:w-[300px] xs:w-[240px]  gap-1 border py-5 px-7 xs:px-2 border-muted rounded-3xl shadow-xl hover:animated-blob  mt-7"
        >
          <div className="steps__wrapper--overflow w-full overflow-hidden ">
            <div
              className={cn(
                "steps__wrapper w-[300%] flex transition-all duration-500 ease-cubic-bezier py-1",
                step === 1 && "translate-x-0",
                step === 2 && "-translate-x-1/3 rtl:translate-x-1/3",
                step === 3 && "-translate-x-2/3 rtl:translate-x-2/3"
              )}
            >
              <div className="step__one w-1/3 px-1 flex flex-col justify-start ">
                {/**English Name  */}
                <TextComponent
                  t={t}
                  name="product_name_en"
                  label={t("form.product_name_en.label")}
                  placeholder={t("form.product_name_en.placeholder")}
                  ServerErrors={ServerErrors}
                  className="w-full"
                  validations={{ pattern: /^[A-Za-z\d\s]+$/ }}
                  icon={faCartFlatbed}
                />
                {/**Arabic Name  */}
                <TextComponent
                  t={t}
                  name="product_name_ar"
                  label={t("form.product_name_ar.label")}
                  placeholder={t("form.product_name_ar.placeholder")}
                  ServerErrors={ServerErrors}
                  className="w-full "
                  validations={{ pattern: /^[؀-ۿ\d\s]+$/ }}
                  icon={faCartFlatbed}
                />
                {/**English Description  */}
                <TextareaComponent
                  t={t}
                  placeholder={t("form.description_en.placeholder")}
                  label={t("form.description_en.label")}
                  name="description_en"
                  ServerErrors={ServerErrors}
                  rows={2}
                  validations={{ pattern: /^[A-Za-z\d\s]+$/ }}
                />
                {/**Arabic Description  */}
                <TextareaComponent
                  t={t}
                  placeholder={t("form.description_ar.placeholder")}
                  label={t("form.description_ar.label")}
                  name="description_ar"
                  ServerErrors={ServerErrors}
                  rows={2}
                  className="mt-6"
                  validations={{ pattern: /^[؀-ۿ\d\s]+$/ }}
                />
              </div>
              <div className="step__two w-1/3 px-1 flex flex-col justify-start">
                {/**Category  */}
                <div className="flex w-full min-h-[98px] flex-col items-start  justify-start gap-2 ">
                  <h3 className={`text-input `}>{t("form.category.label")}</h3>
                  <ComboBox
                    light={false}
                    className="w-full "
                    data={categories}
                    placeholder={t("form.category.placeholder")}
                    stateName={"category"}
                    isSuccess={isSuccess}
                  />

                  {submitted && category === "" && (
                    <p className="pt-2 text-xs text-destructive">
                      {t("validations.category.required")}
                    </p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.category && (
                      <p className="pt-2 text-xs text-destructive">
                        {ServerErrors?.response?.data?.errors?.category[0]}
                      </p>
                    )
                  }
                </div>
                {/**Tags  */}
                <TextComponent
                  t={t}
                  name="tags"
                  label={t("form.tags.label")}
                  placeholder={t("form.tags.placeholder")}
                  ServerErrors={ServerErrors}
                  className="w-full"
                  icon={faTags}
                />{" "}
                {/** price  */}
                <NumberComponent
                  t={t}
                  name="price"
                  label={t("form.price.label")}
                  className="w-full"
                  placeholder={t("form.price.placeholder")}
                  ServerErrors={ServerErrors}
                  validations={{
                    min: 1,
                  }}
                />
                {finalPrice && (
                  <p className="pb-2 text-sm text-accent">
                    {t("form.final_price", { price: finalPrice })}
                  </p>
                )}
                {/** discount  */}
                <NumberComponent
                  t={t}
                  name="discount"
                  label={t("form.discount.label")}
                  className="w-full "
                  placeholder={t("form.discount.placeholder")}
                  ServerErrors={ServerErrors}
                  required={false}
                  disableFormatting
                  icon={faPercent}
                  validations={{
                    max: 100,
                    pattern: /^[0-9,]+(\.[0-9]+)?$/,
                  }}
                />
              </div>
              <div className="step__three w-1/3 px-1  flex-col-center">
                {/** stock  */}
                <NumberComponent
                  t={t}
                  name="stock"
                  label={t("form.stock.label")}
                  className="w-full"
                  placeholder={t("form.stock.placeholder")}
                  ServerErrors={ServerErrors}
                  icon={faCubesStacked}
                  validations={{
                    min: 1,
                  }}
                />
                {/**images  */}
                <div className="flex w-full  flex-col items-start  justify-start gap-2 ">
                  <h3 className={`text-input `}>{t("form.images.label")}</h3>{" "}
                  <DragDropArea t={t} />
                  {submitted && images?.length < 1 && (
                    <p className="pt-2 text-xs text-destructive">
                      {t("validations.images.required")}
                    </p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.images && (
                      <p className="pt-2 text-xs text-destructive">
                        {ServerErrors?.response?.data?.errors?.images[0]}
                      </p>
                    )
                  }
                </div>
                {/** Submit Button */}
                <SubmitBtnComponent
                  disabled={
                    !methods.formState.isValid ||
                    isPending ||
                    images?.length === 0 ||
                    !category
                  }
                  isPending={isPending}
                  value={t("form.SubmitBtnComponent.value")}
                  className="mt-0 w-10/12 "
                />
              </div>
            </div>
          </div>
          <Captcha
            refs={captchaRef}
            lang={lng}
            ServerError={
              ServerErrors?.response?.data?.errors?.not_ropot &&
              ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                : null
            }
          />
        </form>{" "}
      </FormProvider>
      <div className="steps__controls flex justify-center items-center gap-7 mt-7">
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed trns active:scale-90 disabled:active:scale-100 hover:scale-105 disabled:hover:scale-100"
          disabled={step === 1}
          onClick={() => setStep((prev) => prev - 1)}
        >
          <FontAwesomeIcon
            className="rotate-180 text-2xl rtl:rotate-0"
            icon={faCircleChevronRight}
          />
        </button>
        <div className="steps__wrapper--overflow w-10 h-7 overflow-hidden -green-400 flex font-semibold text-lg rtl:flex-row-reverse">
          <div
            className={cn(
              "w-4 -red-400 flex flex-col h-[300%] transition-all duration-500 ease-cubic-bezier",
              step === 1 && "translate-y-0",
              step === 2 && "-translate-y-1/3",
              step === 3 && "-translate-y-2/3"
            )}
          >
            <span className="h-1/3 w-full flex-center ">1</span>
            <span className="h-1/3 w-full flex-center ">2</span>
            <span className="h-1/3 w-full flex-center ">3</span>
          </div>
          <span className="w-2 flex-center">/</span>
          <div className=" w-4 flex-center">3</div>
        </div>
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed trns active:scale-90 disabled:active:scale-100 hover:scale-105 disabled:hover:scale-100"
          disabled={step === 3}
          onClick={() => setStep((prev) => prev + 1)}
        >
          <FontAwesomeIcon
            className=" text-2xl rtl:rotate-180"
            icon={faCircleChevronRight}
          />
        </button>
      </div>
    </section>
  );
}
