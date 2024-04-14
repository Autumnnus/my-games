export function ratingTableColor(rating: number) {
  if (rating === 10) {
    return "#3b82f6"
  } else if (rating >= 9) {
    return "#7dd3fc"
  } else if (rating >= 8) {
    return "#15803d"
  } else if (rating >= 7) {
    return "#22c55e"
  } else if (rating >= 6) {
    return "#86efac"
  } else if (rating >= 5) {
    return "#dcfce7"
  } else if (rating >= 4) {
    return "#fde047"
  } else if (rating >= 3) {
    return "#eab308"
  } else if (rating >= 2) {
    return "#fda4af"
  } else if (rating >= 1) {
    return "#f43f5e"
  } else if (rating >= 0) {
    return "#be123c"
  } else {
    return "#fff"
  }
}
