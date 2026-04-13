<script>
  import { language } from '$lib/stores/language';
  import { hero } from '../translations';
  import { onMount } from 'svelte';

  $: t = hero[$language] || hero.en;

  const slides = [
    { src: '/tendaHero.jpeg', alt: 'Tenda Development' },
    { src: '/tendaIndustrialPark.jpeg', alt: 'Tenda Industrial Park' },
    { src: '/about.jpeg', alt: 'Tenda Industrial Property' },
    { src: '/gallery3.jpeg', alt: 'Master Plan' }
  ];

  let currentIndex = 0;
  let autoplayInterval;
  let hasFadedIn = false;

  function goToPrev() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  }

  function goToNext() {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  }

  onMount(() => {
    const startFade = setTimeout(() => {
      hasFadedIn = true;
    }, 1000);
    autoplayInterval = setInterval(goToNext, 4000);
    return () => {
      clearTimeout(startFade);
      clearInterval(autoplayInterval);
    };
  });
</script>

<section
  class="relative h-screen flex items-center px-4 md:px-16 text-white overflow-hidden opacity-0 translate-y-12 transition-all duration-700 ease-out {hasFadedIn ? 'opacity-100 translate-y-0' : ''}"
  aria-label="Hero carousel"
  on:mouseenter={() => clearInterval(autoplayInterval)}
  on:mouseleave={() => (autoplayInterval = setInterval(goToNext, 4000))}
>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <div
      class="flex h-full transition-transform duration-700 ease-in-out"
      style="width: {slides.length * 100}%; transform: translateX(-{currentIndex * (100 / slides.length)}%);"
    >
      {#each slides as slide, i}
        <div
          class="flex-shrink-0 h-full relative"
          style="width: {100 / slides.length}%;"
          aria-hidden={i !== currentIndex}
        >
          <div class="absolute inset-0 bg-black/40 z-[1]"></div>
          <img
            src={slide.src}
            alt={slide.alt}
            class="w-full h-full object-cover"
          />
        </div>
      {/each}
    </div>
  </div>

  <button
    class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
    on:click={goToPrev}
    aria-label="Previous slide"
  >
    <span class="text-2xl">&#10094;</span>
  </button>
  <button
    class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
    on:click={goToNext}
    aria-label="Next slide"
  >
    <span class="text-2xl">&#10095;</span>
  </button>

  <div class="flex justify-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
    {#each slides as _, i}
      <button
        class="w-2.5 h-2.5 rounded-full transition-colors {i === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}"
        on:click={() => (currentIndex = i)}
        aria-label="Go to slide {i + 1}"
      ></button>
    {/each}
  </div>
</section>
