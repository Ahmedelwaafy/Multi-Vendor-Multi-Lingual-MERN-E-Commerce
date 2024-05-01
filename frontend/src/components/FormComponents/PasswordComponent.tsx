import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
function PasswordComponent({
  name,
  label = "",
  placeholder,
  required = true,
  validations = {},
  ServerErrors,
  className,
  inputStyle,
  dir,
  value,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon = true,
  getValues,
  confirmName,
  confirmName2,
  confirmFor,
  disabled,
  t,
}: IFormElementProps) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const [hide, setHide] = useState(false);
  return (
    <label
      className={cn(
        `flex w-1/2 md:w-full   ${
          alignment === "vertical"
            ? "flex-col gap-[10px] items-start "
            : "gap-6   md:h-auto  items-center md:flex-col md:gap-2 md:items-start"
        } ${label ? "h-[98px]" : "h-[64px]"} justify-start relative  `,
        className
      )}
      htmlFor={name}
    >
      {label && (
        <h3
          className={`text-base  ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } trns ${
            errors?.[name] || ServerErrors?.response?.data?.errors?.[name]?.[0]
              ? " text-error "
              : ""
          }`}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-0 w-full ">
        <div className="w-full relative">
          <input
            disabled={disabled}
            dir={dir}
            className={`w-full peer ${
              withIcon
                ? "px-9  focus:px-9  "
                : "pr-9 focus:pr-9 rtl:pr-auto rtl:pl-9 rtl:focus:pl-9"
            }  ${
              Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
            }  ${inputStyle} ${
              errors?.[name] ||
              ServerErrors?.response?.data?.errors?.[name]?.[0]
                ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
                : ""
            } ${disabled && "opacity-50 cursor-not-allowed"}`}
            type={`${hide ? "text" : "password"}`}
            id={name}
            placeholder={placeholder}
            autoComplete="off"
            {...register(`${name}`, {
              required: required,
              minLength: 8,
              /* validate:
                confirmName && confirmFor === "old_vs_new"
                  ? (value) => value !== getValues(confirmName)
                  : confirmName && confirmName2
                  ? (value) =>
                      value === getValues(confirmName) &&
                      value === getValues(confirmName2)
                  : confirmName
                  ? (value) => value === getValues(confirmName)
                  : true, */
              ...validations,
            })}
          />
          {withIcon && (
            <FontAwesomeIcon
              className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 peer-focus:animate-jump  ${
                dirtyFields?.[name] ? "opacity-100" : "opacity-50"
              } ${label ? "top-[11px]" : "top-[11px]"} ${
                errors?.[name] ||
                ServerErrors?.response?.data?.errors?.[name]?.[0]
                  ? " text-error "
                  : ""
              }`}
              icon={dirtyFields?.[name] ? faUnlock : faLock}
            />
          )}
          <FontAwesomeIcon
            onClick={() => setHide(!hide)}
            className={`absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4 cursor-pointer ${
              errors?.[name] ||
              ServerErrors?.response?.data?.errors?.[name]?.[0]
                ? " text-error "
                : ""
            }`}
            icon={hide ? faEyeSlash : faEye}
          />
        </div>
        {/**translations will be t(`${name.required}`) */}
        {/**no confirmFor until now`) */}
        {errors?.[name] && (
          <p className="pt-2 text-xs text-error">
            {errors?.[name]?.type === "required" &&
              t(`validations.${name}.required`)}
            {errors?.[name]?.type === "minLength" &&
              t(`validations.${name}.minLength`)}
            {errors?.[name]?.type === "validate" &&
              t(`validations.${name}.validate`, { context: confirmFor })}
            {/* {errors?.[name]?.type === "validate" &&
              (confirmName && confirmFor === "old_vs_new"
                ? "Old and new passwords can't be the same."
                : confirmName
                ? "Passwords don't match."
                : "Passwords don't match.")} */}
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
      </div>
    </label>
  );
}

export default PasswordComponent;
