import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(".reveal, .reveal-stagger");

    // Immediately mark any elements already in the viewport as visible
    children.forEach((child) => {
      const rect = child.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        child.classList.add("visible");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.01, rootMargin: "50px 0px 50px 0px" }
    );

    children.forEach((child) => {
      if (!child.classList.contains("visible")) {
        observer.observe(child);
      }
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
