import { cn } from "@/lib/utils";
import { faCartPlus, faComment, faCommentDots, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { toast } from "sonner";

function SendMsgToShop({
  id,
  type = "button",
  t,
}: {
  id: string;
  t: TFunction;
  type?: "icon" | "button";
}) {
  function SendMsg(id: string) {
    toast.success("msg sent");
  }
  return (
    <button
      className={cn(
        "group",
        type === "button" &&
          "bg-muted-foreground text-background px-4 py-2 gap-2 flex items-center rounded-full h-11 font-medium active:scale-95 trns hover:bg-transparent border-2 border-muted-foreground hover:text-muted-foreground"
      )}
      onClick={() => SendMsg(id)}
    >
      <span className={cn("", type === "icon" && "hidden")}>
        {t("product_card.send_msg_to_shop_btn")}
      </span>
      <FontAwesomeIcon
        className="text-xl cursor-pointer flex-center group-hover:animate-wiggle "
        icon={faCommentDots}
      />
    </button>
  );
}

export default SendMsgToShop;
