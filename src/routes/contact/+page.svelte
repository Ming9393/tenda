<script>
  import { language } from '$lib/stores/language';
  import { contact } from '../../lib/translations';
  import Contact from '../../lib/components/Contact.svelte';
  
  $: t = contact[$language] || contact.en;
</script>

<svelte:head>
  <title>{t.title} | Tenda Development</title>
</svelte:head>

<div class="pt-24">
  <Contact />
</div>






