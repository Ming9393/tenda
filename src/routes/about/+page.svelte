<script>
    import { language } from '$lib/stores/language';
    import { about } from '../../lib/translations';
    import About from '../../lib/components/About.svelte';
    
    $: t = about[$language] || about.en;
  </script>
  
  <svelte:head>
    <title>{t.title} | Tenda Development</title>
  </svelte:head>
  
  <div class="pt-24">
    <About />
  </div>