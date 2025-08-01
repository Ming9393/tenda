<script>
    import { language } from '$lib/stores/language';
    import { industrialSpaces } from '../../lib/translations';
    import IndustrialSpaces from '../../lib/components/IndustrialSpaces.svelte';
    
    $: t = industrialSpaces[$language] || industrialSpaces.en;
  </script>
  
  <svelte:head>
    <title>{t.title} | Tenda Development</title>
  </svelte:head>
  
  <div class="pt-24">
    <IndustrialSpaces />
  </div>