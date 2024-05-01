import { cn } from "@/lib/utils";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISubmitBtnComponentProps {
  value: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  isPending?: boolean;
  alignment?: "vertical" | "horizontal";
  className?: string;
}

function SubmitBtnComponent({
  value = "Send",
  disabled,
  isSubmitting,
  isPending,
  alignment = "vertical",
  className,
}: ISubmitBtnComponentProps) {
  return (
    <button
      disabled={disabled}
      className={cn(" light-bg-submit", className)}
      type="submit"
    >
      <span>
        {isSubmitting || isPending ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          value
        )}
      </span>
    </button>
  );
}

export default SubmitBtnComponent;
