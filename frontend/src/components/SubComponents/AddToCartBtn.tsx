import { cn } from "@/lib/utils";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { toast } from "sonner";

function AddToCartBtn({
  id,
  type,
  t,
  className,
  onSuccess,
}: {
  id: number;
  type: "icon" | "button";
  t: TFunction;
  className?: string;
  onSuccess?: () => void;
}) {
  function addToCart(id: number) {
    toast.success(t("product_card.added_to_cart_toast"));
  }
  return (
    <button
      className={cn(
        "group flex-center",
        type === "button" &&
          "bg-accent text-background px-4 py-2 gap-2  rounded-full h-11 font-medium active:scale-95 trns hover:bg-primary",
        className
      )}
      onClick={() => addToCart(id)}
    >
      <span className={cn("", type === "icon" && "hidden")}>
        {t("product_card.add_to_cart_btn")}
      </span>
      <FontAwesomeIcon
        className="text-xl cursor-pointer  group-hover:animate-wiggle trns active:scale-90"
        icon={faCartPlus}
      />
    </button>
  );
}

export default AddToCartBtn;
