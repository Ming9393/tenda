/**
 * Fade-in animation for elements when they enter the viewport
 */
export function fade(node, {
  delay = 0,
  duration = 1800,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  threshold = 0.1,
  y = 50
} = {}) {
  // Initial styles - hidden and slightly translated
  node.style.opacity = '0';
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
  
  // Create intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When element is visible, fade it in and slide up
        requestAnimationFrame(() => {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
        });
        
        // Stop observing after animation is triggered
        observer.unobserve(node);
      }
    });
  }, {
    threshold,
    rootMargin: '0px 0px -50px 0px' // Trigger when element is about to enter viewport
  });
  
  // Start observing the element
  observer.observe(node);
  
  return {
    destroy() {
      if (observer) {
        observer.disconnect();
      }
    }
  };
}