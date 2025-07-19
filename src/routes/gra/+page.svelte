<script lang="ts">
  import { getRandomWord } from '$lib/dictionary';
  import { onMount } from 'svelte';
  
  let currentWord = '';
  let newWord = '';
  let wordChain: string[] = [];
  let isGameStarted = false;
  let showCustomInput = false;
  let customStartWord = '';
  let showResults = false;
  let inputElement: HTMLInputElement;
  let gameContainer: HTMLElement;
  
  onMount(() => {
    startNewGame();
  });
  
  function startNewGame() {
    currentWord = getRandomWord();
    wordChain = [currentWord];
    isGameStarted = false;
    showResults = false;
    newWord = '';
  }
  
  function startWithCustomWord() {
    if (customStartWord.trim()) {
      currentWord = customStartWord.trim().toUpperCase();
      wordChain = [currentWord];
      showCustomInput = false;
      customStartWord = '';
      isGameStarted = false;
      showResults = false;
    }
  }
  
  function addWord() {
    if (newWord.trim()) {
      const word = newWord.trim().toUpperCase();
      wordChain = [...wordChain, word];
      currentWord = word;
      newWord = '';
      isGameStarted = true;
      
      setTimeout(() => {
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
    }
  }
  
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      addWord();
    }
  }
  
  function finishGame() {
    showResults = true;
  }
  
  function resetGame() {
    startNewGame();
  }
  
  function toggleCustomInput() {
    showCustomInput = !showCustomInput;
    if (showCustomInput) {
      setTimeout(() => {
        const customInput = document.getElementById('custom-input');
        if (customInput) {
          customInput.focus();
        }
      }, 100);
    }
  }
</script>

<svelte:head>
  <title>Gra w Skojarzenia</title>
</svelte:head>

<div class="game-container" bind:this={gameContainer}>
  {#if !showResults}
    <div class="game-header">
      <h1 class="game-title">SKOJARZENIA</h1>
      <p class="game-subtitle">Pozwól swojemu umysłowi wędrować swobodnie</p>
    </div>

    <div class="game-content">
      {#if !isGameStarted}
        <div class="start-section">
          <div class="current-word-display">
            <div class="word-label">TWOJE PIERWSZE SŁOWO:</div>
            <div class="current-word">{currentWord}</div>
          </div>
          
          <div class="start-actions">
            <button class="action-btn primary" on:click={() => isGameStarted = true}>
              ROZPOCZNIJ Z TYM SŁOWEM
            </button>
            <button class="action-btn secondary" on:click={startNewGame}>
              LOSUJ NOWE SŁOWO
            </button>
            <button class="action-btn secondary" on:click={toggleCustomInput}>
              {showCustomInput ? 'ANULUJ' : 'WPISZ WŁASNE'}
            </button>
          </div>

          {#if showCustomInput}
            <div class="custom-input-section">
              <input
                id="custom-input"
                type="text"
                bind:value={customStartWord}
                placeholder="WPISZ SWOJE SŁOWO..."
                class="custom-input"
                on:keypress={(e) => e.key === 'Enter' && startWithCustomWord()}
              />
              <button class="action-btn primary" on:click={startWithCustomWord}>
                ZACZNIJ Z TYM SŁOWEM
              </button>
            </div>
          {/if}
        </div>
      {:else}
        <div class="word-chain">
          <!-- Poprzednie słowa (maksymalnie 3, zanikające w górę) -->
          {#if wordChain.length > 1}
            <div class="previous-words">
              {#each wordChain.slice(-4, -1).reverse() as word, index}
                <div 
                  class="word-item previous" 
                  class:fade-3={index === 0}
                  class:fade-2={index === 1} 
                  class:fade-1={index === 2}
                  style="animation-delay: {index * 0.1}s"
                >
                  {word}
                </div>
              {/each}
            </div>
          {/if}
          
          <!-- Obecne słowo (wycentrowane) -->
          <div class="current-word-container">
            <div class="word-item current">
              {wordChain[wordChain.length - 1]}
            </div>
          </div>
        </div>

        <div class="input-section">
          <input
            bind:this={inputElement}
            type="text"
            bind:value={newWord}
            placeholder="JAKIE JEST TWOJE SKOJARZENIE?"
            class="word-input"
            on:keypress={handleKeyPress}
            autocomplete="off"
          />
          <div class="input-actions">
            <button class="action-btn primary" on:click={addWord} disabled={!newWord.trim()}>
              DODAJ SŁOWO
            </button>
            <button class="action-btn secondary" on:click={finishGame}>
              ZAKOŃCZ GRĘ
            </button>
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <div class="results-section">
      <h2 class="results-title">TWÓJ ŁAŃCUCH SKOJARZEŃ</h2>
      <div class="results-chain">
        {#each wordChain as word, index}
          <div class="result-word" style="animation-delay: {index * 0.15}s">
            {word}
          </div>
          {#if index < wordChain.length - 1}
            <div class="result-arrow">→</div>
          {/if}
        {/each}
      </div>
      
      <div class="results-stats">
        <div class="stat">
          <div class="stat-number">{wordChain.length}</div>
          <div class="stat-label">SŁÓW W ŁAŃCUCHU</div>
        </div>
        <div class="stat">
          <div class="stat-number">{wordChain[0]}</div>
          <div class="stat-label">SŁOWO POCZĄTKOWE</div>
        </div>
        <div class="stat">
          <div class="stat-number">{wordChain[wordChain.length - 1]}</div>
          <div class="stat-label">SŁOWO KOŃCOWE</div>
        </div>
      </div>
      
      <div class="results-actions">
        <button class="action-btn primary" on:click={resetGame}>
          NOWA GRA
        </button>
        <button class="action-btn secondary" on:click={() => navigator.clipboard.writeText(wordChain.join(' → '))}>
          KOPIUJ ŁAŃCUCH
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%);
    font-family: 'Playfair Display', serif;
  }

  .game-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .game-title {
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

  .game-subtitle {
    font-size: 1.2rem;
    color: #888;
    margin: 0;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .game-content {
    max-width: 800px;
    width: 100%;
  }

  .start-section {
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .current-word-display {
    margin-bottom: 2rem;
  }

  .word-label {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .current-word {
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 2rem;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .start-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .action-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
  }

  .action-btn.primary {
    background: linear-gradient(45deg, #333333, #555555);
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(45deg, #444444, #666666);
  }

  .action-btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #cccccc;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .action-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .custom-input-section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .custom-input {
    padding: 1rem 2rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    backdrop-filter: blur(10px);
    min-width: 300px;
  }

  .custom-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .custom-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  .word-chain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .previous-words {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    position: relative;
  }

  .current-word-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
  }

  .word-item {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    padding: 1rem 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    animation: slideInFromBottom 0.6s ease-out;
  }

  .word-item.current {
    color: #ffffff;
    background: linear-gradient(45deg, #333333, #555555);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    font-size: 2.5rem;
    z-index: 10;
  }

  .word-item.previous {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform: scale(0.9);
    font-size: 1.6rem;
    animation: fadeInFromTop 0.4s ease-out;
  }

  .word-item.fade-1 {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.08);
    transform: scale(0.85);
  }

  .word-item.fade-2 {
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
    transform: scale(0.8);
    font-size: 1.4rem;
  }

  .word-item.fade-3 {
    color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.03);
    transform: scale(0.75);
    font-size: 1.2rem;
  }



  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeInFromTop {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .input-section {
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .word-input {
    width: 100%;
    padding: 1.5rem 2rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
  }

  .word-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .word-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  .input-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .results-section {
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 1000px;
    width: 100%;
  }

  .results-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 3rem 0;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: linear-gradient(45deg, #ffffff, #cccccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .results-chain {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .result-word {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeIn 0.5s ease-out;
  }

  .result-arrow {
    font-size: 1.5rem;
    color: #666;
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .results-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .stat {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .results-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .game-title {
      font-size: 2rem;
    }
    
    .current-word {
      font-size: 2rem;
    }
    
    .word-item {
      font-size: 1.5rem;
    }
    
    .word-input {
      font-size: 1.2rem;
    }
    
    .results-title {
      font-size: 2rem;
    }
    
    .result-word {
      font-size: 1.2rem;
    }
    
    .input-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .results-actions {
      flex-direction: column;
      align-items: center;
    }
  }
</style> 