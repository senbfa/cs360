function toggleQuickNav(evt, id){
  evt.stopPropagation();
  var menu = document.getElementById(id);
  if (!menu) return;
  document.querySelectorAll('.quicknav-menu.on').forEach(function(m){
    if (m !== menu) m.classList.remove('on');
  });
  menu.classList.toggle('on');
}
document.addEventListener('click', function(e){
  document.querySelectorAll('.quicknav-menu.on').forEach(function(menu){
    var wrap = menu.closest('.quicknav-wrap');
    if (wrap && !wrap.contains(e.target)) menu.classList.remove('on');
  });
});
