import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faCamera, faImage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

function UploadFileComponent<T extends FieldValues>({
  name,
  label = "",
  required = true,
  validations = {},
  ServerErrors,
  className = "",
  inputStyle,
  Bgcolor = "light",
  btnText,
  serverFileSrc,
  fileFor,
  t,
}: IFormElementProps<T>) {
  const [uploadedFileSrc, setUploadedFileSrc] = useState("");
  const {
    register,
    formState: { errors, dirtyFields },
    watch,
  } = useFormContext();

  useEffect(() => {
    const subscription = watch?.((input) => {
      if (input?.[name]?.[0]?.name?.length > 0) {
        const imageUrl = URL.createObjectURL(input?.[name]?.[0]);
        setUploadedFileSrc(imageUrl);
      } else {
        setUploadedFileSrc("");
      }
    });

    return () => {
      subscription?.unsubscribe();
      //! also revoke if the for has submitted successfully
      URL.revokeObjectURL(uploadedFileSrc);
    };
  }, [name, uploadedFileSrc, watch]);

  return (
    <>
      <label
        className={cn(
          ` flex w-fit min-w-[80px] max-w-max flex-col items-center text-lg justify-center gap-2 `,
          className
        )}
        htmlFor={name}
      >
        <h4>{label} </h4>
        <div className=" w-fit relative ">
          <div
            className={`w-20 aspect-square overflow-hidden bg-transparent flex-center trns cursor-pointer  ${
              fileFor === "property"
                ? "rounded-md !bg-slate-200"
                : fileFor === "user"
                ? "rounded-full p-1 border-2 border-input "
                : ""
            } ${uploadedFileSrc ? " border-opacity-100" : "border-opacity-50"}`}
          >
            {serverFileSrc || uploadedFileSrc ? (
              <img
                width={190}
                height={190}
                className={`w-full  h-full object-cover ${
                  fileFor === "user" ? "rounded-full" : ""
                }`}
                src={uploadedFileSrc || serverFileSrc}
                alt="img"
              />
            ) : (
              <FontAwesomeIcon
                className="text-5xl opacity-50"
                icon={fileFor === "user" ? faUser : faImage}
              />
            )}
            <input
              className={`  w-full  hidden `}
              type="file"
              id={name}
              accept="image/jpg, image/jpeg, image/png, image/webp"
              {...register(`${name}`, {
                required: required,
                validate: (value) => !(value?.[0]?.size > 2000000),
              })}
            />
          </div>
          <div className="absolute right-0 top-1/2 translate-y-1/2 translate-x-2 bg-secondary text-background text-xs shrink-0 size-6 flex-center rounded-full">
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </div>

        {errors?.[name] && (
          <p className="pt- text-xs text-error  text-center w-full">
            {errors?.[name]?.type === "required" &&
              t(`validations.${name}.required`)}

            {errors?.[name]?.type === "validate" &&
              t(`validations.${name}.validate`)}
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
    </>
  );
}

export default UploadFileComponent;
