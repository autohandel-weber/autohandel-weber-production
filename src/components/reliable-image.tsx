import { useEffect, useState, type ImgHTMLAttributes } from "react";

/** Retry temporary delivery failures without substituting another photo. */
export function ReliableImage({ src, onLoad, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setAttempt(0);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (!failed || attempt >= 2) return;
    const timer = window.setTimeout(() => {
      setFailed(false);
      setAttempt((value) => value + 1);
    }, 1000 * (attempt + 1));
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

  return <img {...props} src={imageSrc} decoding="async" onLoad={(event) => {
    setFailed(false);
    onLoad?.(event);
  }} onError={(event) => {
    setFailed(true);
    onError?.(event);
  }} />;
}