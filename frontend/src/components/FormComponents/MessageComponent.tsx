import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";

function MessageComponent({
  placeholder,
  ServerErrors,
  className,
  rows = 4,
  Bgcolor = "light",
  t,
  label,
  withIcon,
  inputStyle,
}: IFormElementProps) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();
  return (
    <label
      className={cn(
        `flex  flex-col items-start justify-start gap-[10px] relative `,
        className
      )}
      htmlFor="message"
    >
      {label && (
        <h3
          className={`text-base   trns ${
            errors?.message || ServerErrors?.response?.data?.errors?.[name]?.[0]
              ? " text-error "
              : ""
          }`}
        >
          {label}
        </h3>
      )}

      <textarea
        placeholder={placeholder}
        className={`resize-none peer ${
          withIcon && "pl-9 or focus:pl-9 rtl:pl-0 rtl:pr-9 rtl:focus:pr-9 "
        }   w-full h-auto ${inputStyle} ${
          Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
        } ${
          errors?.message || ServerErrors?.response?.data?.errors?.[name]?.[0]
            ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
            : ""
        }`}
        {...register("message", {
          required: true,
          minLength: 3,
        })}
        name="message"
        id="message"
        cols={40}
        rows={rows}
      ></textarea>
      {withIcon && (
        <FontAwesomeIcon
          className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 peer-focus:animate-jump  ${
            dirtyFields?.message ? "opacity-100" : "opacity-50"
          } ${label ? "top-[47px]" : "top-[11px]"} ${
            errors?.message || ServerErrors?.response?.data?.errors?.[name]?.[0]
              ? " text-error "
              : ""
          }`}
          icon={faMessage}
        />
      )}

      {errors?.message && (
        <p className=" text-xs text-error">
          {errors?.message.type === "required" &&
            t(`validations.message.required`)}
          {errors?.message.type === "minLength" &&
            t(`validations.message.minLength`)}
        </p>
      )}
      {
        //!--- server errors --------
        ServerErrors?.response?.data?.errors?.[name] && (
          <p className="pt-2 text-xs text-error">
            {ServerErrors?.response?.data?.errors?.[name]?.[0]}
          </p>
        )
      }
    </label>
  );
}

export default MessageComponent;
