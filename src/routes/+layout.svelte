<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	// Ensure language is initialized immediately
	const currentLang = $language;
	
	// Set HTML lang attribute on initial load
	onMount(() => {
	  document.documentElement.lang = $language;
	});
  </script>
  
  <div class="flex flex-col min-h-screen">
	<Nav />
	
	<main class="flex-grow">
	  <slot />
	</main>
	
	<Footer />
  </div>