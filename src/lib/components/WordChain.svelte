<script lang="ts">
  import { fly, fade, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';
  
  export let wordChain: string[];
  
  // Custom smooth transition
  function smoothMove(node: Element, { duration = 400 }) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    
    return {
      duration,
      css: (t: number) => {
        const eased = cubicOut(t);
        return `
          transform: ${transform} translateY(${(1 - eased) * 100}px);
          opacity: ${eased};
        `;
      }
    };
  }
</script>

<div class="word-chain">
  <!-- Wszystkie słowa w jednej liście dla płynnych animacji -->
  <div class="word-list">
    {#each wordChain.slice(-4) as word, index (word)}
      <div 
        class="word-item" 
        class:current={index === wordChain.slice(-4).length - 1}
        class:fade-3={index === 0 && wordChain.slice(-4).length > 1}
        class:fade-2={index === 1 && wordChain.slice(-4).length > 2} 
        class:fade-1={index === 2 && wordChain.slice(-4).length > 3}
        animate:flip={{ duration: 500, easing: cubicOut }}
        in:smoothMove={{ duration: 500 }}
        out:fade={{ duration: 300 }}
      >
        {word}
      </div>
    {/each}
  </div>
</div>

<style>
  .word-chain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 420px;
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .word-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    height: 100%;
    justify-content: center;
    position: relative;
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

  .word-item:not(.current) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform: scale(0.9);
    font-size: 1.6rem;
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

  @media (max-width: 768px) {
    .word-item {
      font-size: 1.5rem;
    }
    
    .word-item.current {
      font-size: 2rem;
    }
    
    .word-item.fade-2 {
      font-size: 1.2rem;
    }
    
    .word-item.fade-3 {
      font-size: 1rem;
    }
  }
</style> 