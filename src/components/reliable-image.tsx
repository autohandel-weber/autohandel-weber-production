import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

const MAX_RETRIES = 5;

/** Retry temporary delivery failures without substituting another photo. */
export function ReliableImage({ src, onLoad, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setAttempt(0);
    setFailed(false);
  }, [src]);

  // A server-rendered image can fail before React attaches onError; detect that after hydration.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && img.getAttribute("src")) setFailed(true);
  }, []);

  useEffect(() => {
    if (!failed || attempt >= MAX_RETRIES) return;
    const timer = window.setTimeout(() => {
      setFailed(false);
      setAttempt((value) => value + 1);
    }, Math.min(1000 * 2 ** attempt, 8000));
    return () => window.clearTimeout(timer);
  }, [failed, attempt]);

  useEffect(() => {
    const retry = () => {
      if (failed) {
        setFailed(false);
        setAttempt((value) => value + 1);
      }
    };
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [failed]);

  const imageSrc = src && attempt > 0
    ? `${src}${src.includes("?") ? "&" : "?"}imageRetry=${attempt}`
    : src;

  return <img {...props} ref={ref} src={imageSrc} decoding="async" onLoad={(event) => {
    setFailed(false);
    onLoad?.(event);
  }} onError={(event) => {
    setFailed(true);
    onError?.(event);
  }} />;
}
