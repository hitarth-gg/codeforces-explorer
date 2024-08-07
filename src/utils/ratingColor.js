export function ratingColor(rating) {
    if (rating < 1200) return "#bbbbbb";
    if (rating < 1400) return "#6ee96e";
    if (rating < 1600) return "#6ecaac";
    if (rating < 1900) return "#9eb1ff";
    if (rating < 2100) return "#e97ee9";
    if (rating < 2400) return "#e9ac50";
    if (rating < 2600) return "#e96e6e";
    if (rating < 3000) return "#ff3333";
    if (rating >= 3000) return "#b22323";
    return "#e97ee9";
  }
