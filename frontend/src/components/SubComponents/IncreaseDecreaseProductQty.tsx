import { cn } from "@/lib/utils";

function IncreaseDecreaseProductQty({
  id,
  className,
  quantity,
  setQuantity,
  disabled,
}: {
  id: number;
  className?: string;
  quantity: number;
  disabled: boolean;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 w-36 h-11 rounded-full overflow-hidden text-background gap-0",
        className
      )}
    >
      <button
        onClick={() => setQuantity((prev) => prev - 1)}
        disabled={disabled}
        className="bg-secondary  disabled:opacity -90 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="bg-accent  flex-center text-lg font-semibold  select-none">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        //disabled={quantity === 0}
        className="bg-secondary  disabled:opacity-90 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}

export default IncreaseDecreaseProductQty;
