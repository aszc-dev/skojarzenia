<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Sparkles } from '@lucide/svelte';

  onMount(() => {
    setTimeout(() => {
      goto('/');
    }, 8000);
  });
</script>

<svelte:head>
  <title>Dziękujemy - Skojarzenia</title>
</svelte:head>

<div class="thank-you-page">
  <div class="thank-you-content">
    <div class="thank-you-icon">
      <Sparkles size={64} />
    </div>
    <h1 class="thank-you-title">DZIĘKUJEMY!</h1>
    <p class="thank-you-message">
      Twoja wiadomość została pomyślnie wysłana!<br>
      Otrzymaliśmy ją i skontaktujemy się z Tobą wkrótce na podany przez Ciebie adres email.
    </p>
    <div class="thank-you-note">
      <p>Za chwilę zostaniesz przekierowany na stronę główną...</p>
    </div>
    <a href="/" class="back-home-btn">
      WRÓĆ NA STRONĘ GŁÓWNĄ
    </a>
  </div>
</div>

<style>
  .thank-you-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    font-family: 'Playfair Display', serif;
  }

  .thank-you-content {
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 4rem 3rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 600px;
    width: 100%;
    animation: fadeIn 0.8s ease-out;
  }

  .thank-you-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    color: #ffffff;
    animation: bounce 2s infinite;
  }

  .thank-you-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: linear-gradient(45deg, #ffffff, #cccccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .thank-you-message {
    font-size: 1.3rem;
    line-height: 1.7;
    color: #cccccc;
    margin: 0 0 3rem 0;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
  }

  .thank-you-note {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
    margin: 2rem 0 3rem 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .thank-you-note p {
    margin: 0;
    font-size: 1rem;
    color: #888;
    font-family: 'Inter', sans-serif;
    font-style: italic;
  }

  .back-home-btn {
    display: inline-block;
    padding: 1.2rem 2.5rem;
    background: linear-gradient(45deg, #333333, #555555);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .back-home-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(45deg, #444444, #666666);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .thank-you-title {
      font-size: 2rem;
    }
    
    .thank-you-message {
      font-size: 1.1rem;
    }
    
    .thank-you-content {
      padding: 3rem 2rem;
    }
  }
</style> 