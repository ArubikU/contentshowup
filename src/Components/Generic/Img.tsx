import React, { HTMLProps, useState } from "react";

/**
 * We extend `<img>`'s properties as we want our 
 * component to act as a drop-in replacement for it
 */
type ImgProps = HTMLProps<HTMLImageElement> & {
  /**
   * Optional fallback to render in place of a missing image
   * @default null
   */
  fallback?: React.ReactNode;
};

export function Image({ fallback = null, ...props }: ImgProps): JSX.Element {
  /**
   * is our image broken?
   */
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return fallback as JSX.Element || null;
  }

  return <img onError={handleError} {...props} />;
}