/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Get language from cookies
    const lang = event.cookies.get('language') || 'en';
    
    // Replace %lang% in app.html with actual language
    return await resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', lang)
    });
  }