const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteContent = document.getElementById('quote-content');
const quoteCount = document.getElementById('quote-count');
const newQuoteButton = document.getElementById('new-quote');
const copyQuoteButton = document.getElementById('copy-quote');
const shareQuoteButton = document.getElementById('share-quote');
const toast = document.getElementById('toast');

let currentQuote = null;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function renderQuote(quote, count) {
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = `— ${quote.author}`;
  quoteCount.innerHTML = `${String(count).padStart(2, '0')} <span>/ 36</span>`;
  quoteContent.classList.remove('is-changing');
  currentQuote = quote;
}

async function getNewQuote() {
  newQuoteButton.disabled = true;
  newQuoteButton.setAttribute('aria-busy', 'true');
  quoteContent.classList.add('is-changing');

  try {
    const exclude = currentQuote ? `?exclude=${encodeURIComponent(currentQuote.id)}` : '';
    const response = await fetch(`/api/quote/random${exclude}`);
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const data = await response.json();
    if (!data.success || !data.quote) throw new Error('The server returned an invalid quote.');

    window.setTimeout(() => {
      renderQuote(data.quote, data.quote.id);
      newQuoteButton.disabled = false;
      newQuoteButton.removeAttribute('aria-busy');
    }, 170);
  } catch (error) {
    quoteContent.classList.remove('is-changing');
    newQuoteButton.disabled = false;
    newQuoteButton.removeAttribute('aria-busy');
    showToast('Could not load a quote. Please try again.');
    console.error('Unable to load quote:', error);
  }
}

function getShareText() {
  return `“${currentQuote.text}” — ${currentQuote.author}`;
}

async function copyQuote() {
  if (!currentQuote) return;

  try {
    await navigator.clipboard.writeText(getShareText());
  } catch (error) {
    // Older browsers may not offer Clipboard API; use the built-in copy command as a fallback.
    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = getShareText();
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand('copy');
    temporaryInput.remove();
    if (!copied) {
      showToast('Copy is not available in this browser.');
      return;
    }
  }

  showToast('Quote copied to clipboard.');
}

async function shareQuote() {
  if (!currentQuote) return;
  const shareData = { title: 'A thought to carry', text: getShareText() };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error.name !== 'AbortError') showToast('Unable to share this quote.');
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(`${getShareText()}\n${window.location.href}`);
    showToast('Share is not available; quote link copied instead.');
  } catch (error) {
    showToast('Sharing is not supported in this browser.');
  }
}

newQuoteButton.addEventListener('click', getNewQuote);
copyQuoteButton.addEventListener('click', copyQuote);
shareQuoteButton.addEventListener('click', shareQuote);

// Load the first quote as soon as the page is ready.
getNewQuote();
