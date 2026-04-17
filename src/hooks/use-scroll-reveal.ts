import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = (target: Element) => target.classList.add("visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "50px 0px 50px 0px" }
    );

    const attach = () => {
      const children = el.querySelectorAll(".reveal, .reveal-stagger");
      children.forEach((child) => {
        if (child.classList.contains("visible")) return;
        const rect = child.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          reveal(child);
        } else {
          observer.observe(child);
        }
      });
    };

    attach();

    // Re-attach when async children appear later (e.g. after data loads).
    const mutation = new MutationObserver(() => attach());
    mutation.observe(el, { childList: true, subtree: true });

    // Safety fallback: force-reveal anything still hidden after 500ms.
    const fallback = window.setTimeout(() => {
      const hidden = el.querySelectorAll(".reveal, .reveal-stagger");
      hidden.forEach((child) => {
        if (!child.classList.contains("visible")) {
          (child as HTMLElement).classList.add("visible");
          (child as HTMLElement).style.opacity = "1";
          (child as HTMLElement).style.transform = "none";
        }
      });
    }, 500);

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}
