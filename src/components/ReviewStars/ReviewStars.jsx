import { Star, StarHalf } from "lucide-react";

export default function ReviewStars({ rating, size = 14 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <span style={{ display: "inline-flex", gap: 2, color: "var(--accent)" }}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={size} fill="currentColor" strokeWidth={0} />
      ))}
      {hasHalf && <StarHalf size={size} fill="currentColor" strokeWidth={0} />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={size} fill="none" strokeWidth={1.5} />
      ))}
    </span>
  );
}
