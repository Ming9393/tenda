import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// More robust way to get stored language
function getStoredLanguage() {
  if (!browser) return 'en';
  
  try {
    const stored = localStorage.getItem('language');
    return stored ? stored : 'en';
  } catch (e) {
    console.error('Error accessing localStorage:', e);
    return 'en';
  }
}

// Create the store with the stored or default language
export const language = writable(getStoredLanguage());

// Save language preference when it changes
if (browser) {
  language.subscribe(value => {
    try {
      // Store in localStorage
      localStorage.setItem('language', value);
      
      // Also set a cookie for server-side rendering
      document.cookie = `language=${value}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Update HTML lang attribute for accessibility
      document.documentElement.lang = value;
    } catch (e) {
      console.error('Error saving language preference:', e);
    }
  });
}