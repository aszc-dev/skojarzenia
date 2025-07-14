import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    
    // W development mode po prostu logujemy dane
    console.log('📨 Contact form submission (dev mode):', {
      name: data.get('name'),
      email: data.get('email'), 
      message: data.get('message')
    });
    
    // Na produkcji Netlify obsłuży formularz przed dotarciem tutaj
    // W dev mode przekierowujemy na stronę podziękowania
    throw redirect(303, '/dziekujemy');
  }
}; 