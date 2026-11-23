(function(){
'use strict';
var tel='tel:+79201335353',number='+7 (920) 133-53-53';
var css='.lm-overlay{position:fixed;inset:0;z-index:9999;background:rgba(24,14,19,.65);display:grid;place-items:center;padding:20px}.lm-dialog{position:relative;width:min(440px,100%);background:#fffaf8;border-radius:24px;box-shadow:0 25px 80px #0004;padding:35px 28px;text-align:center;color:#252025;font-family:Manrope,Arial,sans-serif}.lm-dialog h2{font:600 32px/1.2 Georgia,serif;margin:0 0 14px}.lm-dialog p{line-height:1.6;color:#71666a}.lm-dialog .lm-number{display:block;font-size:clamp(23px,4vw,30px);font-weight:800;color:#dd283b;margin:15px 0 23px;text-decoration:none}.lm-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.lm-actions button,.lm-actions a{border:1px solid #dd283b;border-radius:30px;padding:12px 18px;font:700 13px Manrope,Arial,sans-serif;background:#dd283b;color:#fff;cursor:pointer;text-decoration:none}.lm-actions a{background:transparent;color:#8e1b32}.lm-close{position:absolute;top:7px;right:15px;background:none;border:0;font-size:29px;cursor:pointer;color:#71666a}';
var style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
var overlay=null,last=null;
function mobile(){return window.matchMedia('(max-width:767px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)}
function close(){if(!overlay)return;overlay.remove();overlay=null;document.body.style.overflow='';document.removeEventListener('keydown',onKey);if(last)last.focus()}
function onKey(e){if(e.key==='Escape')close()}
function open(a){
if(overlay)return;
last=a;overlay=document.createElement('div');overlay.className='lm-overlay';overlay.innerHTML='<div class="lm-dialog" role="dialog" aria-modal="true" aria-labelledby="lm-title"><button type="button" class="lm-close" aria-label="Закрыть">×</button><h2 id="lm-title">Запись в Лазер Мед</h2><p>Для записи позвоните администратору клиники:</p><a class="lm-number" href="'+tel+'">'+number+'</a><div class="lm-actions"><button class="lm-copy" type="button">Скопировать номер</button><a href="'+tel+'">Позвонить</a></div><p class="lm-status" aria-live="polite" style="font-size:12px;min-height:20px"></p></div>';
document.body.appendChild(overlay);document.body.style.overflow='hidden';
overlay.querySelector('.lm-close').addEventListener('click',close);
overlay.addEventListener('click',function(e){if(e.target===overlay)close()});
document.addEventListener('keydown',onKey);
overlay.querySelector('.lm-copy').addEventListener('click',function(){var status=overlay.querySelector('.lm-status');if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(number).then(function(){status.textContent='Номер скопирован'},function(){status.textContent='Выделите и скопируйте номер выше'})}else{status.textContent='Выделите и скопируйте номер выше'}});
overlay.querySelector('.lm-close').focus()
}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="tel:"]');if(!a||mobile()||e.ctrlKey||e.metaKey||e.defaultPrevented||overlay&&overlay.contains(a))return;e.preventDefault();open(a)});
})();