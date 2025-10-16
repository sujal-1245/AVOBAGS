import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function SuitcaseLottie({ path, className = "w-64 h-64" }) {
  const containerRef = useRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false, // we'll handle looping manually
      autoplay: true,
      path,
    });

    let direction = 1;

    anim.addEventListener("complete", () => {
      direction = -direction;       // reverse direction
      anim.setDirection(direction);  // set new direction
      anim.play();                   // play again
    });

    return () => anim.destroy();
  }, [path]);

  return <div ref={containerRef} className={className}></div>;
}
