function openGift(b){b.parentElement.classList.toggle("open")}
function surprise(){let o=document.getElementById("surprise");if(!o)return;o.classList.add("show");setTimeout(()=>{let l=document.getElementById("loading"),u=document.getElementById("unlock");if(l)l.style.display="none";if(u)u.style.display="block"},2600)}
function openLightbox(img){let box=document.getElementById("lightbox"),big=document.getElementById("lightboxImg"),cap=document.getElementById("lightboxCaption");if(!box||!big)return;big.src=img.currentSrc||img.src;cap.textContent=img.closest("figure")?.querySelector("figcaption")?.textContent||"";box.classList.add("show")}
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
