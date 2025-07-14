import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    if (!name || !email || !message) {
      return fail(400, { missing: true });
    }

    throw redirect(303, '/dziekujemy');
  }
} satisfies Actions; 