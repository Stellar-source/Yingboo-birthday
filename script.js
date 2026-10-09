function openGift(b){b.parentElement.classList.toggle("open")}
function surprise(){let o=document.getElementById("surprise");if(!o)return;o.classList.add("show");setTimeout(()=>{let l=document.getElementById("loading"),u=document.getElementById("unlock");if(l)l.style.display="none";if(u)u.style.display="block"},2600)}
function openLightbox(img){let box=document.getElementById("lightbox"),big=document.getElementById("lightboxImg"),cap=document.getElementById("lightboxCaption");if(!box||!big)return;big.src = img.src;cap.textContent=img.closest("figure")?.querySelector("figcaption")?.textContent||"";box.classList.add("show")}
function closeLightbox(e){if(e&&e.target&&e.target.id!=="lightbox"&&e.target.tagName!=="BUTTON")return;document.getElementById("lightbox")?.classList.remove("show")}
function setupMusic(){
  if(document.querySelector('.music-player')) return;
  const wrap=document.createElement('div'); wrap.className='music-player';
  wrap.innerHTML='<span class="song-dot"></span><span>OUR SONG • Did I Tell You That I Miss You</span><button type="button" id="musicToggle">▶</button><audio id="siteSong" preload="none" loop src="assets/music/did-i-tell-you-that-i-miss-you.mp3"></audio>';
  document.body.appendChild(wrap);
  const audio=wrap.querySelector('#siteSong'), btn=wrap.querySelector('#musicToggle');
  btn.addEventListener('click',()=>{
    if(audio.paused){audio.play().then(()=>{btn.textContent='❚❚';wrap.classList.add('playing')}).catch(()=>{btn.textContent='ADD SONG';});}
    else{audio.pause();btn.textContent='▶';wrap.classList.remove('playing');}
  });
  audio.addEventListener('ended',()=>{btn.textContent='▶';wrap.classList.remove('playing')});
}
function setupDecor(){
  if(!document.querySelector('.lily-bouquet')){const img=document.createElement('img');img.className='lily-bouquet';img.src='assets/lily-bouquet.svg';img.alt='Lily bouquet decoration';document.body.appendChild(img);}
}
document.addEventListener('DOMContentLoaded',()=>{setupMusic();setupDecor();document.querySelectorAll('.memory-photo img').forEach(img=>img.addEventListener('click',e=>{e.stopPropagation();openLightbox(img)}));});


// Seamless page navigation: keep one audio element alive while swapping page content.
function setupSeamlessNavigation(){
  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
    const target = new URL(href, window.location.href);
    if (target.origin !== window.location.origin || !target.pathname.endsWith('.html')) return;
    event.preventDefault();
    // START is the explicit user gesture that starts the song.
    if (link.classList.contains('btn') && /START EVENT/i.test(link.textContent)) {
      const audio = document.getElementById('siteSong');
      if (audio && audio.paused) {
        try { await audio.play(); const button=document.getElementById('musicToggle'); if(button) button.textContent='❚❚'; document.querySelector('.music-player')?.classList.add('playing'); } catch (_) {}
      }
    }
    await navigateTo(target.href, true);
  });
  window.addEventListener('popstate', () => navigateTo(window.location.href, false));
}
async function navigateTo(url, pushState){
  try {
    const response = await fetch(url, {headers:{'X-Requested-With':'YingbooSPA'}});
    if (!response.ok) throw new Error('Page load failed');
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const incoming = [...doc.body.children].filter(el => !el.classList.contains('music-player') && !el.classList.contains('lily-bouquet'));
    document.querySelectorAll('body > header, body > main, body > #surprise, body > #lightbox').forEach(el => el.remove());
    incoming.forEach(el => document.body.appendChild(document.importNode(el, true)));
    document.title = doc.title || 'Yingboo Birthday';
    if (pushState) history.pushState({}, '', url);
    window.scrollTo(0,0);
    setupDecor();
    document.querySelectorAll('.memory-photo img').forEach(img => img.addEventListener('click', e => {e.stopPropagation();openLightbox(img)}));
  } catch (err) {
    // If fetch navigation is unavailable (e.g. opening from a local file), use normal navigation.
    window.location.href = url;
  }
}
document.addEventListener('DOMContentLoaded', setupSeamlessNavigation);
