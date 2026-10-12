const f=document.getElementById('f'),cards=[...f.querySelectorAll('.q')],done=document.getElementById('done'),pr=document.getElementById('pr');
const has=c=>!!c.querySelector('input:checked');
const sh=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function shuffle(){const act=f.querySelector('.actions');sh([...cards]).forEach(c=>f.insertBefore(c,act));
cards.sort((a,b)=>a.compareDocumentPosition(b)&4?-1:1);
cards.forEach((c,i)=>{c.querySelector('.n').textContent=i+1;const o=c.querySelector('.opts');sh([...o.children]).forEach(l=>o.appendChild(l))})}
function upd(){const n=cards.filter(has).length;pr.textContent=n+' of '+cards.length+' answered'}
cards.forEach(c=>{c.addEventListener('change',()=>{c.classList.add('has');c.classList.remove('bad');upd()});
c.querySelector('.clr').addEventListener('click',()=>{c.querySelectorAll('input').forEach(i=>i.checked=false);c.classList.remove('has');upd()})});
f.addEventListener('submit',e=>{e.preventDefault();const miss=cards.filter(c=>!has(c));cards.forEach(c=>c.classList.toggle('bad',!has(c)));
if(miss.length){miss[0].scrollIntoView({behavior:'smooth',block:'center'});return}
let sc=0;cards.forEach(c=>{const a=c.dataset.a,v=c.querySelector('input:checked').value,ok=v===a;if(ok)sc++;c.classList.add(ok?'right':'wrong');
c.querySelectorAll('.opt').forEach(l=>{const i=l.querySelector('input');i.disabled=true;if(i.value===a)l.classList.add('ok');else if(i.value===v)l.classList.add('no')});
c.querySelector('.fb').textContent=ok?'1/1 point':'0/1 point · Correct answer: '+c.querySelector('input[value="'+a+'"]').nextElementSibling.textContent});
document.getElementById('sc').textContent=sc+' / '+cards.length+' ('+Math.round(100*sc/cards.length)+'%)';
f.classList.add('review');done.style.display='block';window.scrollTo(0,0)});
document.getElementById('clrall').addEventListener('click',()=>{if(confirm('This will remove your answers from all questions and cannot be undone.')){f.reset();cards.forEach(c=>c.classList.remove('has','bad'));upd()}});
document.getElementById('again').addEventListener('click',()=>{f.reset();f.classList.remove('review');done.style.display='none';
cards.forEach(c=>{c.classList.remove('has','bad','right','wrong');c.querySelectorAll('.opt').forEach(l=>{l.classList.remove('ok','no');l.querySelector('input').disabled=false});c.querySelector('.fb').textContent=''});shuffle();upd();window.scrollTo(0,0)});
upd();