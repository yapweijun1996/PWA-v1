import { throttle } from './throttle.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      console.log('SW registered', reg);
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    }).catch(console.error);

    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  });
}


function initScrollVisibility() {
  const topbar = document.getElementById('topbar');
  const bottombar = document.getElementById('bottombar');
  if (!topbar || !bottombar) return;

  let lastY = window.scrollY;
  let accumulated = 0;
  const THRESHOLD = 50;

  const onScroll = throttle(() => {
    const currentY = window.scrollY;
    const diff = currentY - lastY;
    lastY = currentY;

    if (Math.sign(diff) !== Math.sign(accumulated)) {
      accumulated = diff;
    } else {
      accumulated += diff;
    }

    if (accumulated > THRESHOLD) {
      topbar.classList.add('hidden');
      bottombar.classList.add('hidden');
      accumulated = 0;
    } else if (accumulated < -THRESHOLD) {
      topbar.classList.remove('hidden');
      bottombar.classList.remove('hidden');
      accumulated = 0;
    }
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}

function setStatusReady() {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = 'Ready';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initScrollVisibility();
  setStatusReady();
});
