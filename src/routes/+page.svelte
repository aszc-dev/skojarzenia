<script lang="ts">
  import { goto } from '$app/navigation';
  
  function startGame() {
    goto('/gra');
  }
</script>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">SKOJARZENIA</h1>
      <p class="hero-subtitle">Oczyszczanie umysłu przez twórcze myślenie</p>
      <p class="hero-description">
        Pozwól swojemu umysłowi wędrować swobodnie. Twórz łańcuchy skojarzeń, które 
        uwolnią Twoje myśli od codziennych ograniczeń.
      </p>
      <button class="cta-button" on:click={startGame}>
        ROZPOCZNIJ GRĘ
      </button>
    </div>
    <div class="hero-visual">
      <div class="floating-words">
        <span>MYŚLI</span>
        <span>WOLNOŚĆ</span>
        <span>KREATYWNOŚĆ</span>
        <span>SPOKÓJ</span>
      </div>
    </div>
  </div>
</section>

<section class="benefits">
  <div class="container">
    <h2 class="section-title">DLACZEGO SKOJARZENIA?</h2>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon">🧠</div>
        <h3>OCZYSZCZANIE UMYSŁU</h3>
        <p>
          Wypisywanie chaotycznych myśli na papier pozwala uporządkować chaos 
          w głowie i znaleźć wewnętrzny spokój.
        </p>
      </div>
      
      <div class="benefit-card">
        <div class="benefit-icon">⚡</div>
        <h3>UWOLNIENIE KREATYWNOŚCI</h3>
        <p>
          Swobodne skojarzenia otwierają nieoczekiwane ścieżki myślenia, 
          prowadząc do nowych pomysłów i rozwiązań.
        </p>
      </div>
      
      <div class="benefit-card">
        <div class="benefit-icon">🎯</div>
        <h3>REDUKCJA STRESU</h3>
        <p>
          Gdy myśli przestają krążyć w kółko w głowie, umysł znajduje 
          naturalną równowagę i wewnętrzny spokój.
        </p>
      </div>
      
      <div class="benefit-card">
        <div class="benefit-icon">🌟</div>
        <h3>ODKRYWANIE SIEBIE</h3>
        <p>
          Łańcuchy skojarzeń ujawniają ukryte połączenia między myślami, 
          pomagając lepiej zrozumieć siebie.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="how-it-works">
  <div class="container">
    <h2 class="section-title">JAK TO DZIAŁA?</h2>
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <h3>OTRZYMUJESZ SŁOWO</h3>
        <p>System losuje słowo ze słownika lub wpisujesz własne</p>
      </div>
      
      <div class="step">
        <div class="step-number">2</div>
        <h3>TWORZYSZ ŁAŃCUCH</h3>
        <p>Dopisujesz kolejne słowa, które Ci się kojarzą</p>
      </div>
      
      <div class="step">
        <div class="step-number">3</div>
        <h3>ANALIZUJESZ WYNIK</h3>
        <p>Przeglądasz swój łańcuch skojarzeń i odkrywasz wzorce</p>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2>GOTOWY NA OCZYSZCZENIE UMYSŁU?</h2>
    <p>Zacznij już teraz i poczuj różnicę</p>
    <button class="cta-button" on:click={startGame}>
      ROZPOCZNIJ GRĘ
    </button>
  </div>
</section>

<style>
  .hero {
    min-height: 80vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero-content {
    max-width: 600px;
    z-index: 2;
    position: relative;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    line-height: 1.1;
    letter-spacing: 3px;
    background: linear-gradient(45deg, #ffffff, #cccccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0 0 2rem 0;
    color: #cccccc;
    letter-spacing: 1px;
  }

  .hero-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0 0 3rem 0;
    color: #aaaaaa;
  }

  .cta-button {
    background: linear-gradient(45deg, #333333, #555555);
    color: white;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(45deg, #444444, #666666);
  }

  .hero-visual {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  .floating-words {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 0.3;
  }

  .floating-words span {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 2px;
    animation: float 6s ease-in-out infinite;
  }

  .floating-words span:nth-child(2) {
    animation-delay: 1.5s;
  }

  .floating-words span:nth-child(3) {
    animation-delay: 3s;
  }

  .floating-words span:nth-child(4) {
    animation-delay: 4.5s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .benefits {
    padding: 5rem 0;
    background: #111111;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin: 0 0 3rem 0;
    letter-spacing: 2px;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .benefit-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .benefit-card:hover {
    transform: translateY(-5px);
  }

  .benefit-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .benefit-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: 1px;
  }

  .benefit-card p {
    color: #cccccc;
    line-height: 1.6;
    margin: 0;
  }

  .how-it-works {
    padding: 5rem 0;
    background: #0a0a0a;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-top: 3rem;
  }

  .step {
    text-align: center;
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #333333, #555555);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.5rem auto;
    color: white;
  }

  .step h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: 1px;
  }

  .step p {
    color: #cccccc;
    line-height: 1.6;
    margin: 0;
  }

  .cta-section {
    padding: 5rem 0;
    background: #111111;
    text-align: center;
  }

  .cta-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: 2px;
  }

  .cta-section p {
    font-size: 1.2rem;
    color: #cccccc;
    margin: 0 0 2rem 0;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .hero-visual {
      display: none;
    }
    
    .section-title {
      font-size: 2rem;
    }
    
    .benefits-grid {
      grid-template-columns: 1fr;
    }
    
    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
