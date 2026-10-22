import { useEffect, useState } from "react";

/**
 * Menü-Leiste beim Runterscrollen ausblenden, beim Hochscrollen wieder zeigen.
 *
 * @param minMove  Ab wie vielen Pixeln Bewegung reagiert wird (verhindert Flackern).
 * @param topSafe  Bis zu dieser Distanz vom Seitenanfang bleibt die Leiste immer sichtbar.
 * @returns true, wenn die Leiste ausgeblendet werden soll.
 */
export function useHideOnScroll(minMove = 8, topSafe = 120) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const move = y - last;
      if (Math.abs(move) < minMove) return;
      last = y;
      setHidden(move > 0 && y > topSafe);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [minMove, topSafe]);

  return hidden;
}
