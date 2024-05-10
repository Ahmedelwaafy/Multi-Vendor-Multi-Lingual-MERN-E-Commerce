import {
  ComboBox,
  NumberComponent,
  SubmitBtnComponent,
  TextComponent,
} from "@/components/FormComponents";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
type FormValues = {
  name: string;
  value: number;
  maxUsage: string;
  minPrice: string;
  maxPrice: string;
  ProductID: string;
};
export default function CreateDiscountCode({
  setOpen,
  refetch,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) {
  const { t, i18n } = useTranslation("VendorDiscountCodes");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [submitted, setSubmitted] = useState(false);
  const { data } = useFetchData(
    VENDOR.PRODUCTS,
    import.meta.env.VITE_GET_VENDOR_PRODUCTS,
    false,
    "",
    3 * 60 * 1000,
    0,
    true,
    true,
    { refetchOnMount: true }
  );
  const captchaRef = useRef(null);
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "product name en",
      value: 10,
      maxUsage: "10",
      minPrice: "10",
      maxPrice: "10",
      ProductID: "",
    },
  });
  const ProductID = methods.watch("ProductID");

  const {
    mutate: CreateDiscountCode,
    isPending,
    isSuccess,
    error: ServerErrors,
  } = usePostData(true, () => {
    //methods.reset();
    setSubmitted(false);
    refetch();
    setOpen(false);
    //navigate(`/${lng}/shop/products`);
  });
  const onSubmit = async (data: FormValues) => {
    setSubmitted(true);

    const { name, ProductID, value, minPrice, maxUsage, maxPrice } = data;
    console.log(data);

    const finalData = {
      name,
      ProductID,
      value,
      minPrice: Number(minPrice?.replace(/,/g, "")),
      maxUsage: Number(maxUsage?.replace(/,/g, "")),
      maxPrice: Number(maxPrice?.replace(/,/g, "")),
    };
    console.log(finalData);

    CreateDiscountCode({
      api: import.meta.env.VITE_VENDOR_CREATE_DISCOUNT_CODE,
      data: finalData,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        encType="multipart/form-data"
        method="post"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex-col-center w-full   gap-1 border py-5 px-7 xs:px-2 border-muted rounded-3xl shadow-xl hover:animated-blob  "
      >
        {/** Name  */}
        <TextComponent
          t={t}
          name="name"
          label={t("form.name.label")}
          placeholder={t("form.name.placeholder")}
          ServerErrors={ServerErrors}
          className="w-full"
          icon={faCartFlatbed}
        />{" "}
        <div className="flex w-full items-start justify-between gap-10   sm:gap-3">
          {/** value  */}
          <NumberComponent
            t={t}
            name="value"
            label={t("form.value.label")}
            className="w-full"
            placeholder={t("form.value.placeholder")}
            ServerErrors={ServerErrors}
            validations={{
              max: 100,
              pattern: /^[0-9,]+(\.[0-9]+)?$/,
            }}
          />{" "}
          {/** maxUsage  */}
          <NumberComponent
            t={t}
            name="maxUsage"
            label={t("form.maxUsage.label")}
            className="w-full"
            placeholder={t("form.maxUsage.placeholder")}
            ServerErrors={ServerErrors}
            validations={{
              min: 1,
            }}
          />{" "}
        </div>
        <div className="flex w-full items-start justify-between gap-10   sm:gap-3">
          {/** minPrice  */}
          <NumberComponent
            t={t}
            name="minPrice"
            label={t("form.minPrice.label")}
            className="w-full"
            placeholder={t("form.minPrice.placeholder")}
            ServerErrors={ServerErrors}
            validations={{
              min: 1,
            }}
          />{" "}
          {/** maxPrice  */}
          <NumberComponent
            t={t}
            name="maxPrice"
            label={t("form.maxPrice.label")}
            className="w-full"
            placeholder={t("form.maxPrice.placeholder")}
            ServerErrors={ServerErrors}
            validations={{
              min: 1,
            }}
          />{" "}
        </div>
        {/**ProductID  */}
        <div className="flex w-full  flex-col items-start  justify-start gap-2 ">
          <h3 className={`text-input `}>{t("form.ProductID.label")}</h3>
          <ComboBox
            light={false}
            className="w-full "
            data={data?.products}
            placeholder={t("form.ProductID.placeholder")}
            stateName={"ProductID"}
            isSuccess={isSuccess}
          />

          {submitted && ProductID === "" && (
            <p className="pt-2 text-xs text-destructive">
              {t("validations.ProductID.required")}
            </p>
          )}
          {
            //!--- server errors --------
            ServerErrors?.response?.data?.errors?.ProductID && (
              <p className="pt-2 text-xs text-destructive">
                {ServerErrors?.response?.data?.errors?.ProductID[0]}
              </p>
            )
          }
        </div>{" "}
        {/** Submit Button */}
        <SubmitBtnComponent
          disabled={!methods.formState.isValid || isPending || !ProductID}
          isPending={isPending}
          value={t("form.SubmitBtnComponent.value")}
          className="mt-0 w-10/12 "
        />
      </form>{" "}
    </FormProvider>
  );
}
