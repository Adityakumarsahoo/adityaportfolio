import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const trailingPos = useRef({ x: 0, y: 0 });
  const trailingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable custom cursor on mobile touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      positionRef.current = newPos;
      setPosition(newPos);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Track mouse enter/leave on interactive components
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive") ||
        target.style.cursor === "pointer"
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    // Custom animation loop for the trailing ring to create elastic lag feedback
    let frameId: number;
    const updateTrailing = () => {
      if (trailingRef.current) {
        // Damping calculation for smooth delay tracking
        const dx = positionRef.current.x - trailingPos.current.x;
        const dy = positionRef.current.y - trailingPos.current.y;
        trailingPos.current.x += dx * 0.15;
        trailingPos.current.y += dy * 0.15;

        trailingRef.current.style.transform = `translate3d(${trailingPos.current.x - 16}px, ${trailingPos.current.y - 16}px, 0)`;
      }
      frameId = requestAnimationFrame(updateTrailing);
    };
    frameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-indigo-500 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${clicked ? 0.7 : hovered ? 1.5 : 1})`,
        }}
      />

      {/* Trailing Ring */}
      <div
        ref={trailingRef}
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-difference ${
          clicked
            ? "border-purple-400 bg-purple-400/20 scale-75"
            : hovered
            ? "border-pink-500 bg-pink-500/10 scale-125"
            : "border-indigo-400"
        }`}
      />
    </>
  );
}
