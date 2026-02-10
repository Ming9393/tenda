<!-- Nav.svelte -->
<script>
  import { language } from '$lib/stores/language';
  import {nav} from '../translations';
  import { onMount } from 'svelte';
  
  let isMenuOpen = false;
  let isLangDropdownOpen = false;

  $: t = nav[$language] || nav.en;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
  
  function toggleLangDropdown() {
    isLangDropdownOpen = !isLangDropdownOpen;
  }

  function setLanguage(lang) {
    $language = lang;
    isLangDropdownOpen = false;
  }
  
  // Close dropdown when clicking outside
  let langDropdownRef;
  function handleClickOutside(event) {
    if (langDropdownRef && !langDropdownRef.contains(event.target)) {
      isLangDropdownOpen = false;
    }
  }
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>
  
  <nav class="fixed h-20 w-full z-50 bg-[#021627] py-3 px-4 md:px-8">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-white text-xl md:text-2xl font-bold ">
        <img src="/tendaLogo-bgrm.png" alt="Tenda Development" class="h-14" />
        
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden text-white p-2"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg 
          class="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {#if !isMenuOpen}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          {:else}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          {/if}
        </svg>
      </button>
      
      <!-- Add this to your Desktop Menu section -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="text-white font-exo text-md hover:text-gray-300">{t.home}</a>
        <a href="/projects" class="text-white font-exo text-md hover:text-gray-300">{t.projects}</a>
        <a href="/about" class="text-white font-exo text-md hover:text-gray-300">{t.about}</a>
        <a href="/contact" class="text-white font-exo text-md hover:text-gray-300">{t.contact}</a>
  
  <!-- Language Dropdown -->
  <!-- Replace the existing language dropdown with this -->
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2">
      <!-- Globe Icon -->
      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      
      <div class="flex">
        <button 
          class="px-2 py-0.5 text-md transition-colors {$language === 'en' ? 'text-white font-medium border-b-2 border-[#ff7f27]' : 'text-gray-400 hover:text-gray-300'}"
          on:click={() => setLanguage('en')}
        >
          EN
        </button>
        <span class="text-gray-400 px-1">|</span>
        <button 
          class="px-2 py-0.5 text-md transition-colors {$language === 'zh' ? 'text-white font-medium border-b-2 border-[#ff7f27]' : 'text-gray-400 hover:text-gray-300'}"
          on:click={() => setLanguage('zh')}
        >
          中文
        </button>
      </div>
    </div>
  </div>
</div>

  
    <!-- Mobile Menu -->
    <!-- Mobile Menu -->
    {#if isMenuOpen}
    <div class="md:hidden absolute top-full left-0 right-0 bg-[#1a2942] py-4 px-4 shadow-lg">
      <div class="flex flex-col space-y-4">
        <a href="/" class="text-white hover:text-gray-300 py-2" on:click={closeMenu}>{t.home}</a>
        <a href="/projects" class="text-white hover:text-gray-300 py-2" on:click={closeMenu}>{t.projects}</a>
        <a href="/about" class="text-white hover:text-gray-300 py-2" on:click={closeMenu}>{t.about}</a>
        <a href="/contact" class="text-white hover:text-gray-300 py-2" on:click={closeMenu}>{t.contact}</a>
    
    <!-- Mobile Language Toggle -->
    <div class="mt-2 pt-2 border-t border-white/10">
      <div class="flex items-center space-x-2">
        <!-- Globe Icon -->
        <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        
        <div class="flex">
          <button 
            class="px-2 py-0.5 text-sm transition-colors {$language === 'en' ? 'text-white font-medium border-b-2 border-[#ff7f27]' : 'text-gray-400 hover:text-gray-300'}"
            on:click={() => setLanguage('en')}
          >
            EN
          </button>
          <span class="text-gray-400 px-1">|</span>
          <button 
            class="px-2 py-0.5 text-sm transition-colors {$language === 'zh' ? 'text-white font-medium border-b-2 border-[#ff7f27]' : 'text-gray-400 hover:text-gray-300'}"
            on:click={() => setLanguage('zh')}
          >
            中文
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
  </nav>