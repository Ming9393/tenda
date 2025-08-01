<script>
  import { language } from '$lib/stores/language';
  import { hero } from '../translations';
  
  // Get translations for current language
  $: t = hero[$language] || hero.en;
</script>

<section class="relative h-screen flex items-center px-4 md:px-16 text-white">
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0  opacity-70"></div>
    <img src="/tendaHero.jpeg" alt="Hero" class="w-full h-full object-cover" />
  </div>
  
  <!-- <div class="relative z-10 max-w-3xl">
    <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6 md:mb-8">
      {t.title}
    </h1>
    <p class="text-lg md:text-xl mb-8">
      {t.description}
    </p>
    <a href="/projects" class="inline-block bg-[#ff7f27] text-white px-6 md:px-8 py-3 md:py-4 rounded-md text-base md:text-lg font-semibold hover:bg-[#e66f1e] transition-colors">
      {t.cta}
    </a>
  </div> -->
</section>