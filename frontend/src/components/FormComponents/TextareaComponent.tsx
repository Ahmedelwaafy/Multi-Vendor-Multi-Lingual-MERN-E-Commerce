import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";

function TextareaComponent({
  name,
  label,
  placeholder,
  ServerErrors,
  className,
  rows = 4,
  required = true,
  validations = {},
  Bgcolor = "light",
  t,
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
      htmlFor={name}
    >
      {label && (
        <h3
          className={`text-base   trns ${
            errors?.[name] || ServerErrors?.response?.data?.errors?.[name]?.[0]
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
          errors?.[name] || ServerErrors?.response?.data?.errors?.[name]?.[0]
            ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
            : ""
        }`}
        {...register(`${name}`, {
          required: required,
          minLength: 3,
          ...validations,
        })}
        name={name}
        id={name}
        cols={40}
        rows={rows}
      ></textarea>
      {withIcon && (
        <FontAwesomeIcon
          className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 peer-focus:animate-jump  ${
            dirtyFields?.[name] ? "opacity-100" : "opacity-50"
          } ${label ? "top-[47px]" : "top-[11px]"} ${
            errors?.[name] || ServerErrors?.response?.data?.errors?.[name]?.[0]
              ? " text-error "
              : ""
          }`}
          icon={faMessage}
        />
      )}

      {errors?.[name] && (
        <p className=" text-xs text-error">
          {errors?.[name].type === "required" &&
            t(`validations.${name}.required`)}
          {errors?.[name].type === "minLength" &&
            t(`validations.${name}.minLength`)}{" "}
          {errors?.[name]?.type === "pattern" &&
            t(`validations.${name}.pattern`)}
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

export default TextareaComponent;
