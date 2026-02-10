<!-- Features.svelte -->
<script>
  import { language } from '$lib/stores/language';
  import { features } from '../translations';
  import { fade } from '../actions/fade';
  
  // Get translations for current language
  $: t = features[$language] || features.en;
</script>

<section class="py-12 md:py-16 px-4 md:px-8 bg-gray-50 text-[#021627]" use:fade={{ delay: 100, duration: 1000, y: 50 }}>
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center md:text-left">
      {t.title}
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each t.features as feature}
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <div class="text-3xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-semibold mb-3 text-[#021627]">{feature.title}</h3>
          <p class="text-gray-600 text-sm md:text-base">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>