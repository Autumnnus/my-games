import {
  RATING_0_COLOR,
  RATING_10_COLOR,
  RATING_1_COLOR,
  RATING_2_COLOR,
  RATING_3_COLOR,
  RATING_4_COLOR,
  RATING_5_COLOR,
  RATING_6_COLOR,
  RATING_7_COLOR,
  RATING_8_COLOR,
  RATING_9_COLOR,
  TABLE_GRAY_COLOR
} from "@constants/colors"

export default function ratingTableColor(rating: number) {
  if (rating === 10) {
    return RATING_10_COLOR
  } else if (rating >= 9) {
    return RATING_9_COLOR
  } else if (rating >= 8) {
    return RATING_8_COLOR
  } else if (rating >= 7) {
    return RATING_7_COLOR
  } else if (rating >= 6) {
    return RATING_6_COLOR
  } else if (rating >= 5) {
    return RATING_5_COLOR
  } else if (rating >= 4) {
    return RATING_4_COLOR
  } else if (rating >= 3) {
    return RATING_3_COLOR
  } else if (rating >= 2) {
    return RATING_2_COLOR
  } else if (rating >= 1) {
    return RATING_1_COLOR
  } else if (rating >= 0) {
    return RATING_0_COLOR
  } else {
    return TABLE_GRAY_COLOR
  }
}
