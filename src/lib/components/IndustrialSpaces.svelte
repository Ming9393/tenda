<!-- IndustrialSpaces.svelte -->
<script>
  import { language } from '$lib/stores/language';
  import { industrialSpaces } from '../translations';
  
  // Get translations for current language
  $: t = industrialSpaces[$language] || industrialSpaces.en;
  
  // Create an array that adds the image path to each space
  // Now with two phases of the industrial park
  $: spaces = [
    {
      ...t.spaces[0],
      title: "Tenda Industrial Park Phase 1",
      image: "/gallery1.jpeg"
    },
    {
      ...t.spaces[0], // Use the same base data but with different title/image
      title: "Tenda Industrial Park Phase 2",
      image: "/gallery2.jpeg"
    }
  ];
</script>

<section class="py-12 md:py-24 px-4 md:px-8 bg-gray-100" id="industrialSpaces">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold text-[#021627] mb-8 md:mb-16 text-center">
      {t.title}
    </h2>
    
    <!-- Center container with grid layout -->
    <div class="w-full">
      <!-- Grid for the two spaces side by side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {#each spaces as space, index}
          <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
            <div class="relative group">
              <a href={index === 0 ? '/projects/tenda_industrial_park' : '/projects/tenda_industrial_park_phase2'}>
                <img src={space.image} alt={space.title} class="w-full h-48 md:h-80 object-cover" />
              </a>
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <!-- Add a small phase indicator -->
              <div class="absolute bottom-4 left-4 bg-[#ff7f27] text-white px-3 py-1 rounded font-medium">
                Phase {index + 1}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>