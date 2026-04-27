document.addEventListener('DOMContentLoaded', () => {
  const fetchBtn = document.getElementById('fetch-btn');
  const outputContainer = document.getElementById('joke-output');

  if (!fetchBtn || !outputContainer) return; // Prevent errors if not on the joke page

  const API_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  async function getJoke() {
    // Set loading state
    fetchBtn.disabled = true;
    fetchBtn.style.opacity = '0.7';
    fetchBtn.textContent = 'Fetching...';
    
    outputContainer.innerHTML = `
      <div class="loader">
        > Downloading logic module... 
        <span style="color: var(--accent);">●</span>
        <span style="color: var(--accent);">●</span>
        <span style="color: var(--accent);">●</span>
      </div>
    `;

    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'API returned an error');
      }

      // Delay slightly for visual effect of matrix loading
      setTimeout(() => {
        if (data.type === 'single') {
          outputContainer.innerHTML = `
            <div class="joke-single">> ${data.joke}</div>
          `;
        } else if (data.type === 'twopart') {
          outputContainer.innerHTML = `
            <div class="joke-setup">> ${data.setup}</div>
            <div class="joke-delivery">  ${data.delivery}</div>
          `;
        }
      }, 400);

    } catch (error) {
      console.error("Fetch error:", error);
      outputContainer.innerHTML = `
        <div class="error-msg">
          <span>[ERROR]</span> Failed to connect to joke server.
          <br>${error.message}
        </div>
      `;
    } finally {
      setTimeout(() => {
        fetchBtn.disabled = false;
        fetchBtn.style.opacity = '1';
        fetchBtn.textContent = '$ fetch_joke --type programming';
      }, 400);
    }
  }

  fetchBtn.addEventListener('click', getJoke);
});
