<!-- Gallery.svelte (previously FAQ.svelte) -->
<!-- Gallery.svelte (previously FAQ.svelte) -->
<script>
  import { onMount } from 'svelte';
  import { language } from '$lib/stores/language';
  import { gallery } from '../translations';
  import { fade } from '../actions/fade';
  
  // Get translations for current language
  $: t = gallery[$language] || gallery.en;
  
  let currentSlide = 0;
  let totalSlides = 4; // Ensure this matches the number of images
  
  // Use translations for images
  $: images = t.images ? t.images.map((img, index) => ({
    src: `/gallery${index+1}.jpeg`,
    // title: img.title,
    // description: img.description
  })) : [];
  
  // Ensure totalSlides is updated if images length changes
  $: if (images.length > 0) {
    totalSlides = images.length;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  function goToSlide(index) {
    currentSlide = index;
  }
  
  onMount(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  });
</script>


<section class="py-16 px-8 bg-gray-100" use:fade={{ delay: 0, duration: 1800, y: 60 }}>
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-[#1a2942] mb-12">{t.title}</h2>
    
    <div class="relative overflow-hidden rounded-lg shadow-xl h-[600px]">
      <!-- Slides container -->
      <div class="relative h-full">
        {#each images as image, i}
          <div class="absolute inset-0 transition-opacity duration-500 ease-in-out"
               style="opacity: {currentSlide === i ? '1' : '0'}">
            <img src={image.src} alt={image.title} class="w-full h-full object-cover" />
            <div class="absolute inset-0  opacity-50"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 class="text-3xl font-semibold mb-2">{image.title}</h3>
              <p class="text-lg">{image.description}</p>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Navigation arrows -->
      <button 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors"
        on:click={prevSlide}
        aria-label={t.prevSlide}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-colors"
        on:click={nextSlide}
        aria-label={t.nextSlide}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      <!-- Indicators -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {#each Array(totalSlides) as _, i}
          <button 
            class="w-3 h-3 rounded-full transition-colors {currentSlide === i ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}"
            on:click={() => goToSlide(i)}
            aria-label={`${t.goToSlide} ${i + 1}`}
          ></button>
        {/each}
      </div>
    </div>
    
    <!-- Thumbnails -->
<div class="grid grid-cols-4 gap-4 mt-6">
  {#each images as image, i}
    <button 
      class="overflow-hidden rounded-lg {currentSlide === i ? 'ring-4 ring-[#ff7f27]' : ''}" 
      on:click={() => goToSlide(i)}
    >
      <img src={image.src} alt={`${t.thumbnail} ${i + 1}`} class="w-full h-24 object-cover" />
    </button>
  {/each}
</div>
  </div>
</section>