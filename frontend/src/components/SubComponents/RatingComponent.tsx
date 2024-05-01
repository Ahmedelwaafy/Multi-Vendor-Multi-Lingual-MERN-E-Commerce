import { cn } from "@/lib/utils";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

type RatingComponentProps<T extends FieldValues> = {
  defaultRating: number;
  IMutable?: boolean;
  setValue?: UseFormSetValue<T>;
  stateName?: Path<T>;
  rating?: number;
  placeholder?: string;
  className?: string;
  className2?: string;
  color?: string;
};
function RatingComponent<T extends FieldValues>({
  defaultRating,
  setValue,
  stateName,
  rating,
  placeholder,
  IMutable,
  className,
  className2,
  color,
}: RatingComponentProps<T>) {
  const [hoverRating, setHoverRating] = useState<number | null>(0);
  const currentRating = IMutable ? defaultRating : rating;

  return (
    <div
      className={cn("w-full flex justify-start gap-3 items-center ", className)}
    >
      {placeholder && <p className="opacity-50"> {placeholder}</p>}
      <div className={cn("flex items-center gap-0.5 rtl:ltr", className2)}>
        {[...Array(5)].map((star, index) =>
          IMutable ? (
            <FontAwesomeIcon
              //style={{ color: color ? color : "var(--accent)" }}
              className={`trns    text-xl text-yellow-400 hover:animate-wiggle`}
              key={index}
              icon={defaultRating > index ? faStar : faStarOutlined}
            />
          ) : (
            <FontAwesomeIcon
              //style={{ color: color ? color : "var(--accent)" }}
              className={`trns cursor-pointer  text-xl text-yellow-400 hover:animate-wiggle`}
              onClick={() =>
                stateName ? setValue?.(stateName, index + 1) : () => {}
              }
              onMouseOver={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(null)}
              key={index}
              icon={
                (hoverRating || currentRating!) > index
                  ? faStar
                  : faStarOutlined
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default RatingComponent;
