import React from "react";
import styles from "./Company.module.scss";
import { SaveIconFill, SaveIconOutline } from "@/icons";

interface Props {
  rating: number;
}

const CompanyRating = ({ rating }: Props) => {
  const handleWidth = (order: number) => {
    if (order <= rating) {
      return "100%";
    }
    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + "%";
    }
    return "0%";
  };

  return (
    <div className={styles.wrap__rating}>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className={styles.star__item} key={index}>
            <div
              className={styles.star__overlay}
              style={{ width: handleWidth(index + 1) }}
            >
              <SaveIconFill width={24} height={24} />
            </div>
            <SaveIconOutline width={24} height={24} />
          </div>
        ))}
    </div>
  );
};

export default CompanyRating;
