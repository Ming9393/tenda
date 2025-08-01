<!-- Features.svelte -->
<script>
  import { language } from '$lib/stores/language';
  import { features } from '../translations';
  
  // Get translations for current language
  $: t = features[$language] || features.en;
</script>

<section class="py-12 md:py-16 px-4 md:px-8 bg-[#021627] text-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center md:text-left">
      {t.title}
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each t.features as feature}
        <div class="border border-white/10 rounded-lg p-6 hover:bg-white/5 transition-colors duration-300">
          <div class="text-3xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-semibold mb-3">{feature.title}</h3>
          <p class="text-gray-300 text-sm md:text-base">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>