<script>
    import { language } from '$lib/stores/language';
    import { industrialParkPhase2 } from '../../../lib/translations';
    import { onMount } from 'svelte';
    
    $: t = industrialParkPhase2[$language] || industrialParkPhase2.en;
    
    // Progress images data with dates
    let progressImages = [
      {
        src: "/aug2024.jpg",
        date: "AUG 2024",
        alt: "Site progress August 2024"
      },
      {
        src: "/nov2024.jpg",
        date: "NOV 2024",
        alt: "Site progress November 2024"
      },
      {
        src: "/feb2025.jpg",
        date: "FEB 2025",
        alt: "Site progress February 2025"
      }
      // You can add more images as needed
    ];
    
    let currentIndex = 0;
    
    function goToPrev() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = progressImages.length - 1;
      }
    }
    
    function goToNext() {
      if (currentIndex < progressImages.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }
    
    // Auto-play functionality
    let autoplayInterval;
    
    onMount(() => {
      startAutoplay();
      return () => clearInterval(autoplayInterval);
    });
    
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        goToNext();
      }, 5000);
    }
    
    function pauseAutoplay() {
      clearInterval(autoplayInterval);
    }
    
    function resumeAutoplay() {
      startAutoplay();
    }
</script>
  
<svelte:head>
  <title>{t.title} | Tenda Development</title>
</svelte:head>
  
<div class="p-auto">
  <!-- Hero Section -->
  <div class="relative h-screen min-h-[400px]">
    <div class="absolute inset-0">
      <img src="/tendaIndustrialPark.jpeg" alt="Tenda Industrial Park" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-[#1a2942] opacity-60"></div>
    </div>
    <div class="relative z-10 h-full flex items-center">
      <div class="container mx-auto px-4 md:px-8">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
        <p class="text-xl text-white max-w-2xl">{t.subtitle}</p>
      </div>
    </div>
  </div>
  
  <!-- Overview Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-[#1a2942] mb-6">{t.overview.title}</h2>
          {#each t.overview.paragraphs as paragraph}
            <p class="mb-4 text-gray-700">{paragraph}</p>
          {/each}
        </div>
        <div class="rounded-lg overflow-hidden shadow-xl">
          <img src="/tendaIndustrialPark.jpeg" alt="Industrial Park Aerial View" class="w-full h-auto" />
        </div>
      </div>
    </div>
  </section>

  <!-- Master Plan Section -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h2 class="text-3xl md:text-5xl font-bold text-[#1a2942] mb-12 text-center">{t.masterPlan?.title || "Master Plan"}</h2>
      
      <div class="w-full">
        <div class="rounded-lg overflow-hidden shadow-xl">
          <img 
            src="/gallery3.jpeg" 
            alt="Tenda Industrial Park Master Plan" 
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
  
  <!-- Features Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex justify-center items-center shadow-lg bg-gray-500 max-w-5xl  m-auto overflow-hidden">
        <div class="relative w-full">
          <img src='/feature1.jpeg' alt='Phase 1 Features' class="w-full h-auto" />
          <!-- Gray gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-800/80 via-gray-600/60 to-gray-400/20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Site Progress Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 md:px-8">
      <h2 class="text-3xl font-bold text-[#1a2942] mb-12 text-center">{t.siteProgress?.title || "Site Progress"}</h2>
      
      <div class="relative w-full">
        <!-- Gallery container with navigation arrows -->
        <div 
          class="relative overflow-hidden aspect-video w-full max-w-6xl mx-auto rounded-lg shadow-xl" 
          on:mouseenter={pauseAutoplay}
          on:mouseleave={resumeAutoplay}
        >
          <!-- Current image -->
          <div class="relative w-full h-full">
            <img 
              src={progressImages[currentIndex].src} 
              alt={progressImages[currentIndex].alt}
              class="w-full h-full object-cover"
            />
            
            <!-- Date overlay -->
            <div class="absolute bottom-4 right-4 bg-red-600 text-white py-1 px-4 font-bold rounded">
              {progressImages[currentIndex].date}
            </div>
          </div>
          
          <!-- Navigation buttons -->
          <button 
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-black/80 text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-r-lg hover:bg-black/90 transition-colors"
            on:click={goToPrev}
            aria-label="Previous image"
          >
            <span class="text-red-500 text-xl md:text-3xl">&#10094;</span>
            <span class="sr-only">Prev</span>
          </button>
          
          <button 
            class="absolute right-0 top-1/2 -translate-y-1/2 bg-black/80 text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-l-lg hover:bg-black/90 transition-colors"
            on:click={goToNext}
            aria-label="Next image"
          >
            <span class="text-red-500 text-xl md:text-3xl">&#10095;</span>
            <span class="sr-only">Next</span>
          </button>
        </div>
        
        <!-- Thumbnail indicators -->
        <div class="flex justify-center mt-4 gap-2">
          {#each progressImages as _, i}
            <button 
              class="w-3 h-3 rounded-full {i === currentIndex ? 'bg-red-600' : 'bg-gray-300'} transition-colors"
              on:click={() => currentIndex = i}
              aria-label={`Go to image ${i + 1}`}
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </section>
  
  <!-- Specification Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Tenure</p>
            <p class="text-xl font-bold text-[#1a2942]">Freehold (10 Acres)</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Property Type</p>
            <p class="text-xl font-bold text-[#1a2942]">Semi-D (12 units)</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Land Area</p>
            <p class="text-xl font-bold text-[#1a2942]">21,301 sq ft - 38,847 sq ft</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Built-Up Area</p>
            <p class="text-xl font-bold text-[#1a2942]">15,875 sq ft - 29,065 sq ft</p>
          </div>
        </div>

       
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Project Status</p>
            <p class="text-xl font-bold text-[#1a2942]">on going (75%)</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Location</p>
            <p class="text-xl font-bold text-[#1a2942]">Telok Panglima Garang</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 md:col-span-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
          </svg>
          <div>
            <p class="font-medium text-gray-500">Sales Status</p>
            <p class="text-xl font-bold text-[#1a2942]">85% Sold Out</p>
          </div>
        </div>

      </div>
    </div>
  </section>
  
  <!-- Location Section -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h2 class="text-3xl md:text-5xl font-bold text-[#1a2942] mb-12 text-center">{t.location.title}</h2>
      
      <div class="w-full">
        <div class="rounded-lg overflow-hidden shadow-xl">
          <img 
            src="/gallery4.jpeg" 
            alt="Tenda Industrial Park Location Map" 
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
  
  <!-- Location Details Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 md:px-8">
      <h2 class="text-3xl font-bold text-[#1a2942] mb-12 text-center">{t.locationDetails?.title || "Location Details"}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-xl font-semibold mb-4">{t.location.subtitle}</h3>
          <p class="mb-6 text-gray-700">{t.location.description}</p>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-[#ff7f27] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4 class="font-medium text-[#1a2942]">{t.location.address.title}</h4>
                <p class="text-gray-600">{t.location.address.value}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-5 h-5 text-[#ff7f27] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 class="font-medium text-[#1a2942]">{t.location.timing.title}</h4>
                <p class="text-gray-600">{t.location.timing.value}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5629673505713!2d101.4982403!3d2.9181458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb1e215555555%3A0x7501d0299def92cb!2sWC6R%2BQF%20Telok%20Panglima%20Garang%2C%20Selangor%2C%20Malaysia!5e0!3m2!1sen!2sus!4v1665546547015!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allow="fullscreen"
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Tenda Industrial Park Location"
              aria-label="Map showing the location of Tenda Industrial Park in Telok Panglima Garang, Selangor"
            ></iframe>
          </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="py-16 bg-[#1a2942] text-white">
    <div class="container mx-auto px-4 md:px-8 text-center">
      <h2 class="text-3xl font-bold mb-6">{t.cta.title}</h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto">{t.cta.description}</p>
      <a href="#contact" class="inline-block bg-[#ff7f27] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#e66f1e] transition-colors">
        {t.cta.button}
      </a>
    </div>
  </section>
</div>