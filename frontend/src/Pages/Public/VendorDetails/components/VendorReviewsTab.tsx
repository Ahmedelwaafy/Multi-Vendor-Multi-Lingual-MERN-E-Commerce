import { ReviewCard } from "@/components/CardsComponents";
import { products } from "@/constants";
import { TFunction } from "i18next";
import { useParams } from "react-router-dom";

function VendorReviewsTab({ t }: { t: TFunction }) {
  const { vendorID } = useParams();
  const data = products[0]?.reviews;
  return (
    <ul className="!w-full space-y-8 ">
      {data?.length === 0 ? (
        <p className="text-center mt-10">{t("no_reviews")}</p>
      ) : (
        data?.map((review) => (
          <ReviewCard
            key={review?.id}
            review={review}
            className="xl:max-w-full"
          />
        ))
      )}
    </ul>
  );
}

export default VendorReviewsTab;
