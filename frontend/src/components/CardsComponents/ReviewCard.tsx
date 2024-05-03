import { IReviewType } from "@/types/CardsTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallbackName, cn } from "@/lib/utils";
import { RatingComponent } from "../SubComponents";

function ReviewCard({
  review,
  className,
}: {
  review: IReviewType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "single__review flex justify-start gap-7  max-w-[70%] md:max-w-full text-secondary",
        className
      )}
    >
      <Avatar className="  ">
        <AvatarImage
          className="object-cover rounded-full"
          src={review?.user?.img}
        />
        <AvatarFallback className="bg-background text-secondary font-medium">
          {AvatarFallbackName(review?.user?.name)}
        </AvatarFallback>
      </Avatar>
      <div className="">
        <h3 className=" mb-1 flex items-center gap-2">
          <span className="font-semibold">{review?.user?.name}</span>
          <span className="text-xs opacity-70"> {review?.createdAt}</span>
        </h3>
        <p className="text-[14px] italic mb-2">{review?.comment}</p>
        <RatingComponent IMutable defaultRating={review?.rating} />
      </div>
    </div>
  );
}

export default ReviewCard;
