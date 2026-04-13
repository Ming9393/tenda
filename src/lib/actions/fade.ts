/**
 * Fade-in animation for elements when they enter the viewport.
 * Re-triggers every time the element scrolls into view.
 */
export function fade(node, {
  delay = 0,
  duration = 1800,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  threshold = 0.1,
  y = 50
} = {}) {
  const transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

  function setHidden() {
    node.style.transition = 'none';
    node.style.opacity = '0';
    node.style.transform = `translateY(${y}px)`;
    node.offsetHeight; // force reflow so transition applies on next change
    node.style.transition = transition;
  }

  function setVisible() {
    node.style.opacity = '1';
    node.style.transform = 'translateY(0)';
  }

  setHidden();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(setVisible);
      } else {
        requestAnimationFrame(setHidden);
      }
    });
  }, {
    threshold,
    rootMargin: '0px 0px -50px 0px'
  });

  observer.observe(node);
  
  return {
    destroy() {
      if (observer) {
        observer.disconnect();
      }
    }
  };
}