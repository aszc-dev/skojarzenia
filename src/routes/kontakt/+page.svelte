<script lang="ts">
  import { goto } from '$app/navigation';
  import Mail from '@lucide/svelte/icons/mail';
  import Github from '@lucide/svelte/icons/github';
  import Twitter from '@lucide/svelte/icons/twitter';

  let name = '';
  let email = '';
  let message = '';

  function handleSubmit() {
    setTimeout(() => {
      goto('/dziekujemy');
    }, 1000);
  }
</script>

<svelte:head>
  <title>Kontakt - Skojarzenia</title>
</svelte:head>

<!-- Hidden form for Netlify Forms discovery -->
<form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>

<div class="contact-container">
  <div class="contact-header">
    <h1 class="contact-title">KONTAKT</h1>
    <p class="contact-subtitle">Skontaktuj się z nami</p>
  </div>

  <div class="contact-content">
    <div class="contact-info">
      <div class="info-section">
        <h2 class="info-title">O PROJEKCIE</h2>
        <p class="info-text">
          Skojarzenia to eksperymentalna aplikacja do oczyszczania umysłu przez 
          swobodne tworzenie łańcuchów skojarzeń. Powstała z pasji do minimalistycznego 
          designu i wiary w siłę twórczego myślenia.
        </p>
      </div>

      <div class="info-section">
        <h2 class="info-title">DLACZEGO POWSTAŁA?</h2>
        <p class="info-text">
          W świecie pełnym szumu i ciągłego przepływu informacji, nasza aplikacja 
          oferuje moment ciszy i refleksji. To narzędzie do odkrywania ukrytych 
          połączeń w naszym umyśle.
        </p>
      </div>

      <div class="info-section">
        <h2 class="info-title">TECHNOLOGIA</h2>
        <p class="info-text">
          Zbudowana w SvelteKit z dbałością o każdy detal. Minimalistyczny kod, 
          maksymalny wpływ. Całkowicie open source i dostępna dla każdego.
        </p>
      </div>
    </div>

    <div class="contact-form-section">
        <form 
          class="contact-form" 
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          name="contact"
          method="POST"
          on:submit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <h2 class="form-title">NAPISZ DO NAS</h2>
          
          <div class="form-group">
            <label for="name" class="form-label">TWOJE IMIĘ</label>
            <input
              id="name"
              name="name"
              type="text"
              bind:value={name}
              class="form-input"
              placeholder="JAK MASZ NA IMIĘ?"
              required
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">ADRES EMAIL</label>
            <input
              id="email"
              name="email"
              type="email"
              bind:value={email}
              class="form-input"
              placeholder="TWÓJ@EMAIL.COM"
              required
            />
          </div>

          <div class="form-group">
            <label for="message" class="form-label">WIADOMOŚĆ</label>
            <textarea
              id="message"
              name="message"
              bind:value={message}
              class="form-textarea"
              placeholder="CO CHCESZ NAM PRZEKAZAĆ?"
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" disabled={!name.trim() || !email.trim() || !message.trim()}>
            WYŚLIJ WIADOMOŚĆ
          </button>
        </form>
    </div>
  </div>

  <div class="contact-footer">
    <div class="social-links">
      <h3 class="social-title">ZNAJDŹ NAS</h3>
      <div class="social-grid">
        <a href="mailto:hi@aszc.dev" class="social-link">
          <div class="social-icon">
            <Mail size={32} />
          </div>
          <span>EMAIL</span>
        </a>
        <a href="https://github.com/skojarzenia" class="social-link">
          <div class="social-icon">
            <Github size={32} />
          </div>
          <span>GITHUB</span>
        </a>
        <a href="https://twitter.com/skojarzenia" class="social-link">
          <div class="social-icon">
            <Twitter size={32} />
          </div>
          <span>TWITTER</span>
        </a>
      </div>
    </div>

    <div class="philosophy">
      <h3 class="philosophy-title">FILOZOFIA</h3>
      <blockquote class="philosophy-quote">
        "Czasem najlepszym sposobem na uporządkowanie myśli jest pozwolenie im 
        na całkowitą swobodę. W chaosie skojarzeń kryje się porządek, którego 
        nie dostrzegamy na pierwszy rzut oka."
      </blockquote>
      <div class="philosophy-author">— Twórcy Skojarzeń</div>
    </div>
  </div>
</div>

<style>
  .contact-container {
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    font-family: 'Playfair Display', serif;
  }

  .contact-header {
    text-align: center;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: linear-gradient(45deg, #ffffff, #cccccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .contact-subtitle {
    font-size: 1.3rem;
    color: #888;
    margin: 0;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .info-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .info-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #ffffff;
  }

  .info-text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #cccccc;
    margin: 0;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
  }

  .contact-form-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: fit-content;
  }

  .form-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    background: linear-gradient(45deg, #ffffff, #cccccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-label {
    font-size: 0.9rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }

  .form-input,
  .form-textarea {
    padding: 1rem 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    padding: 1.2rem 2rem;
    border: none;
    border-radius: 50px;
    background: linear-gradient(45deg, #333333, #555555);
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(45deg, #444444, #666666);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  .contact-footer {
    margin-top: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5rem;
  }

  .social-links {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .social-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #ffffff;
  }

  .social-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }

  .social-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    text-decoration: none;
    color: #cccccc;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .social-link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .social-link:hover .social-icon {
    color: #ffffff;
  }

  .social-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #cccccc;
    transition: color 0.3s ease;
  }

  .philosophy {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .philosophy-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #ffffff;
  }

  .philosophy-quote {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #cccccc;
    margin: 0 0 1rem 0;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
    font-style: italic;
    border-left: 3px solid rgba(255, 255, 255, 0.3);
    padding-left: 1rem;
  }

  .philosophy-author {
    font-size: 0.9rem;
    color: #888;
    text-align: right;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    .contact-title {
      font-size: 2rem;
    }
    
    .contact-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .contact-footer {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .social-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .form-title {
      font-size: 1.5rem;
    }
  }
</style> 