import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";

function NumberComponent({
  name,
  label = "",
  placeholder,
  required = true,
  validations = {},
  ServerErrors,
  inputStyle,
  dir,
  value,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon = true,
  icon,
  t,
  disabled = false,
  className,
  disableFormatting = false,
}: IFormElementProps) {
  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disableFormatting) {
      return;
    }
    const Target = event.target as HTMLInputElement;
    const inputValue = Target.value;
    const numericValue = parseFloat(inputValue.replace(/,/g, ""));

    // Format the value with commas and update the form value
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString("en-US");
      setValue?.(`${name}`, formattedValue);
    } else {
      setValue?.(`${name}`, "");
    }
  };
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
        <input
          dir={dir}
          disabled={disabled}
          
          className={`w-full peer ${
            withIcon && "pl-9 focus:pl-9 rtl:pl-0 rtl:pr-9 rtl:focus:pr-9 "
          }  ${
            Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
          } ${inputStyle} ${
            errors?.[name] || ServerErrors?.response?.data?.errors?.[name]?.[0]
              ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
              : ""
          }`}
          type="text"
          inputMode="numeric"
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          {...register(`${name}`, {
            required: required,
            pattern: /^[0-9,]+$/,
            min: 0,
            ...validations,
          })}
          onKeyUp={(e) => {
            handleInputChange(e);
          }}
        />
        {withIcon && (
          <FontAwesomeIcon
            className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 peer-focus:animate-jump  ${
              dirtyFields?.[name] ? "opacity-100" : "opacity-50"
            } ${label ? "top-[47px]" : "top-[11px]"} ${
              errors?.[name] ||
              ServerErrors?.response?.data?.errors?.[name]?.[0]
                ? " text-error "
                : ""
            }`}
            icon={icon ? icon : faDollarSign}
          />
        )}
        {errors?.[name] && (
          <p className="pt-2 text-xs text-error">
            {errors?.[name]?.type === "required" &&
              t(`validations.${name}.required`)}
            {(errors?.[name]?.type === "pattern" ||
              errors?.[name]?.type === "min" ||
              errors?.[name]?.type === "max" ||
              errors?.[name]?.type === "maxLength" ||
              errors?.[name]?.type === "minLength") &&
              t([`validations.${name}.pattern`, `validations.${name}.min`])}
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

export default NumberComponent;
