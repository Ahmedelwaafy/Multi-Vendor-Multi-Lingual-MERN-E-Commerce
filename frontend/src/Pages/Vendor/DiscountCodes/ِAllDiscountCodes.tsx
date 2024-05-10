import { DataTable, Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import DiscountCodesColumns from "../Tables/DiscountCodesColumns";
import DataTableSkeleton from "@/components/Skeletons/DataTableSkeleton";
import { ErrorMessage } from "@/components/SubComponents";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateDiscountCode from "./CreateDiscountCode";
import { useState } from "react";

export function Component() {
  const { t, i18n } = useTranslation("VendorDiscountCodes");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [open, setOpen] = useState(false);
  const [vendorProfileData, refetchVendorProfileData] = useOutletContext();
  const { data, refetch, isPending, isError, isPaused } = useFetchData(
    VENDOR.DISCOUNT_CODES,
    import.meta.env.VITE_GET_VENDOR_DISCOUNT_CODES,
    false,
    "",
    3 * 60 * 1000,
    0,
    true,
    true,
    { refetchOnMount: true }
  );
  const { mutate, isPending: isDeleting } = usePostData(true, () => {
    refetch();
  });
  function deleteDiscountCode(id: string) {
    mutate({
      api: import.meta.env.VITE_VENDOR_DELETE_DISCOUNT_CODE,
      data: { discountCodeId: id },
      method: "DELETE",
    });
  }
  const columns = DiscountCodesColumns(t, deleteDiscountCode, isDeleting);

  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${vendorProfileData?.name || ""} ${t("tab.title")}`}
        description={`${vendorProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />

      <div className="w-full flex items-center justify-between md:flex-col md:items-start gap-5 mb-14">
        <Heading className=" text-secondary uppercase">{t("heading")}</Heading>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>{t("add_new")}</Button>
          </DialogTrigger>
          <DialogContent className="bg-background rounded-3xl border-none p-5">
            <CreateDiscountCode refetch={refetch} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
      {isError || isPaused ? (
        <ErrorMessage message={t("ErrorMessage")} />
      ) : isPending ? (
        <DataTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data?.discountCodes}
          filteredColumn="name"
          t={t}
          lng={lng}
          className="6xl:w-[1090px] 5xl:w-[840px] xl:w-[640px] lg:w-[500px] amd:w-[450px]  sm:w-[250px]"
        />
      )}
    </section>
  );
}
