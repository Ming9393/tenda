<script>
  import { language } from '$lib/stores/language';
  import { contact } from '../translations';
  
  $: t = contact[$language] || contact.en;
  
  let formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  const whatsappNumber = '60136392321';
  
  /** @param {SubmitEvent} event */
  function handleSubmit(event) {
    event.preventDefault();
    const message = [
      'Hi, I would like to know more about the factories that you are selling!',
      '',
      'Below are my information:',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || '-'}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`
    ].join('\r\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
</script>

<section class="py-16 px-4 md:px-8 bg-white" id="contact">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-bold text-[#1a2942] mb-4">
        {t.title}
      </h2>
      <p class="text-xl text-gray-600 mb-2">{t.subtitle}</p>
      <p class="text-gray-500">{t.description}</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div>
        <form on:submit={handleSubmit} class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              {t.form.name}
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7f27] focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              {t.form.email}
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7f27] focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              {t.form.phone}
            </label>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7f27] focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              {t.form.subject}
            </label>
            <input
              type="text"
              id="subject"
              bind:value={formData.subject}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7f27] focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              {t.form.message}
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7f27] focus:border-transparent outline-none transition resize-none"
            ></textarea>
          </div>
          
          <button
            type="submit"
            class="w-full bg-[#ff7f27] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e66f1f] transition-colors"
          >
            {t.form.send}
          </button>
        </form>
      </div>
      
      <!-- Contact Information -->
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-bold text-[#1a2942] mb-6">
            {t.contactInfo.title}
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-[#ff7f27] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium text-gray-700">{t.contactInfo.address.label}</p>
                <p class="text-gray-600">{t.contactInfo.address.value}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 text-[#ff7f27] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p class="font-medium text-gray-700">{t.contactInfo.tel.label}</p>
                <a href="tel:0333239222" class="text-[#ff7f27] hover:underline">
                  {t.contactInfo.tel.value}
                </a>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 text-[#ff7f27] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-medium text-gray-700">{t.contactInfo.email.label}</p>
                <a href="mailto:tendadevelop@gmail.com" class="text-[#ff7f27] hover:underline">
                  {t.contactInfo.email.value}
                </a>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 text-[#ff7f27] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p class="font-medium text-gray-700">{t.contactInfo.fax.label}</p>
                <p class="text-gray-600">{t.contactInfo.fax.value}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 text-[#ff7f27] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p class="font-medium text-gray-700">{t.contactInfo.regNo.label}</p>
                <p class="text-gray-600">{t.contactInfo.regNo.value}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-8">
          <h3 class="text-2xl font-bold text-[#1a2942] mb-6">
            {t.officeHours.title}
          </h3>
          
          <div class="space-y-2 text-gray-600">
            <p>{t.officeHours.weekdays}</p>
            <p>{t.officeHours.weekend}</p>
            <p>{t.officeHours.closed}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

