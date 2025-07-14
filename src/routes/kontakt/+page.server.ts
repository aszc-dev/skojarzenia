// Ten plik istnieje, aby SvelteKit wiedział, że ta trasa może obsługiwać akcje POST.
// W środowisku produkcyjnym, Netlify Forms przechwyci zgłoszenie przed SvelteKit.
// W środowisku deweloperskim, bez tego pliku, otrzymalibyśmy błąd 405.
export const actions = {}; 