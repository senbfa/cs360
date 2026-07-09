document.addEventListener('DOMContentLoaded', function(){
  var container = document.querySelector('.ph-left');
  if(!container) return;

  var VISIBLE = 3;
  var pills = Array.prototype.slice.call(container.children).filter(function(el){
    return el.classList && el.classList.contains('pill');
  });
  if(pills.length <= VISIBLE) return;

  var overflow = pills.slice(VISIBLE);

  var wrap = document.createElement('div');
  wrap.className = 'pill-more-wrap';

  var moreBtn = document.createElement('button');
  moreBtn.type = 'button';
  moreBtn.className = 'pill pill-more';
  moreBtn.setAttribute('aria-haspopup', 'true');
  moreBtn.textContent = '+' + overflow.length + ' more';

  var popover = document.createElement('div');
  popover.className = 'pill-popover';
  overflow.forEach(function(p){ popover.appendChild(p); });

  wrap.appendChild(moreBtn);
  wrap.appendChild(popover);
  container.appendChild(wrap);

  moreBtn.addEventListener('click', function(e){
    e.stopPropagation();
    wrap.classList.toggle('on');
  });
  document.addEventListener('click', function(e){
    if(wrap.classList.contains('on') && !wrap.contains(e.target)){
      wrap.classList.remove('on');
    }
  });
});
