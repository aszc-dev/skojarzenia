<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
</script>

<div class="app">
  <header class="header">
    <nav class="nav">
      <a href="/" class="logo">SKOJARZENIA</a>
      <div class="nav-links">
        <a href="/" class:active={$page.url.pathname === '/'}>HOME</a>
        <a href="/gra" class:active={$page.url.pathname === '/gra'}>GRA</a>
        <a href="/kontakt" class:active={$page.url.pathname === '/kontakt'}>KONTAKT</a>
      </div>
    </nav>
  </header>

  <main class="main">
    <slot />
  </main>

  <footer class="footer">
    <p>
      Projekt open-source tworzony przy pomocy narzędzi AI. Zobacz kod na
      <a href="https://github.com/aszc-dev/skojarzenia/" target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
  </footer>
</div>

<style>
  :global(html) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background: #0a0a0a;
    color: #ffffff;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }

  :global(*) {
    box-sizing: border-box;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: #ffffff;
    letter-spacing: 2px;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-links a {
    text-decoration: none;
    color: #cccccc;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: #ffffff;
  }

  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #ffffff;
  }

  .main {
    flex: 1;
    min-height: calc(100vh - 140px);
  }

  .footer {
    padding: 2rem;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    border-top: 1px solid #333;
  }

  .footer a {
    color: #888;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .footer a:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .nav {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      gap: 1rem;
    }
  }
</style> 