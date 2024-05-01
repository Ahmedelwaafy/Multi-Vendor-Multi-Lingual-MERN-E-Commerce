import { usePostData } from "@/Hooks/useAxios";
import Captcha from "@/components/FormComponents/Captcha";
import { cn } from "@/lib/utils";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function SubscribeToNewsLetter({ className }: { className?: string }) {
  const { t, i18n } = useTranslation("Layout");
  const captchaRef = useRef(null);
  type FormValues = {
    email: string;
    not_ropot: string;
    platform: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      not_ropot: "yes",
      platform: "website",
    },
  });

  const {
    mutate,
    isPending,
    error: ServerErrors,
  } = usePostData(
    true,
    () => {
      captchaRef?.current?.reset();
      //reset();
    },
    false,
    () => {
      captchaRef?.current?.reset();
    }
  );

  const onSubmit = async (data: FormValues) => {
    try {
      //await captchaRef?.current?.executeAsync();
      mutate({ api: import.meta.env.VITE_SUBSCRIBE, data: data });
    } catch (error) {
      console.log(error);
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };
  return (
    <form
      className={cn("h-16 ", className)}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex shadow-xl border-background border-2 rounded-[8px] overflow-hidden">
        <input
          className="dark-bg-inputs w-full shadow-none focus:shadow-none rounded-r-none  rtl:rounded-l-none "
          type="text"
          placeholder={t("Footer.email.placeholder")}
          autoComplete="off"
          {...register("email", {
            required: true,
            pattern: /^[A-z][A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        <button
          disabled={!isValid}
          type="submit"
          className={`  text-background bg-primary-foreground rounded-r-[6px] rtl:rounded-l-[6px] rtl:rounded-r-none  w-[105px] shrink-0  flex-center h-10 ${
            isValid ? "opacity-100" : "opacity-100 cursor-not-allowed"
          }`}
        >
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <>{t("Footer.Subscribe")}</>
          )}
        </button>
      </div>
      {errors?.email && (
        <p className="mt-2 text-xs text-error">
          {errors?.email?.type === "required" && t("Footer.email.required_msg")}
          {errors?.email?.type === "pattern" && t("Footer.email.pattern_msg")}
        </p>
      )}
      {
        //!--- server errors --------
        ServerErrors?.response?.data?.errors?.email?.[0] && (
          <p className="mt-2 text-xs text-error">
            {ServerErrors?.response?.data?.errors?.email?.[0]}
          </p>
        )
      }
      {/*  <Captcha
        refs={captchaRef}
        lang={i18n.language}
        ServerError={
          ServerErrors?.response?.data?.errors?.not_ropot &&
          ServerErrors?.response?.data?.errors?.not_ropot?.[0]
            ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
            : null
        }
      /> */}
    </form>
  );
}

export default SubscribeToNewsLetter;
