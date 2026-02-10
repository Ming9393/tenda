<script>
  import { language } from '$lib/stores/language';
  import { about } from '../translations';
  import { fade } from '../actions/fade';
  
  // Get current translation based on selected language
  $: t = about[$language] || about.en;
</script>

<section class="py-16 px-8 bg-white" id='about' use:fade={{ delay: 0, duration: 1800, y: 60 }}>
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 class="text-4xl font-bold text-[#1a2942] mb-6">
        {t.title}
      </h2>
      
      {#each t.paragraphs as paragraph}
        <p class="text-gray-600 mb-4">
          {paragraph}
        </p>
      {/each}
    </div>
    
    <div class="relative shadow-xl rounded-lg overflow-hidden">
      <img src="/about.jpeg" alt="Tenda Development Industrial Property" class="w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#021627]/80 to-transparent p-6">
        <!-- <p class="text-white text-xl font-semibold">{t.caption}</p> -->
      </div>
    </div>
  </div>
</section>