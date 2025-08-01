/**
 * Fade-in animation for elements when they enter the viewport
 */
export function fade(node, {
  delay = 0,
  duration = 800,
  easing = t => t,
  threshold = 0.1,
  y = 20
} = {}) {
  // Initial styles - hidden and slightly translated
  node.style.opacity = '0';
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
  
  // Create intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When element is visible, fade it in
        setTimeout(() => {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
        }, 100); // Small additional delay for better visual effect
        
        // Stop observing after animation is triggered
        observer.unobserve(node);
      }
    });
  }, {
    threshold,
    rootMargin: '0px 0px -100px 0px' // Trigger slightly before element is fully in view
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