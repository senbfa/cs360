document.addEventListener('DOMContentLoaded', function(){

  // ---- count-up animation for KPI / health numbers ----
  var DURATION = 900;
  document.querySelectorAll('[data-target]').forEach(function(el){
    var target = parseFloat(el.getAttribute('data-target'));
    if(isNaN(target)) return;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;
    function frame(ts){
      if(start === null) start = ts;
      var progress = Math.min((ts - start) / DURATION, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if(progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });

  // ---- generic "show more" toggles (scales any capped list to its true length) ----
  document.querySelectorAll('.showmore[data-target]').forEach(function(btn){
    var target = document.getElementById(btn.getAttribute('data-target'));
    if(!target) return;
    btn.addEventListener('click', function(){
      var expanded = target.style.display !== 'none';
      target.style.display = expanded ? 'none' : '';
      btn.textContent = expanded ? btn.getAttribute('data-more-label') : btn.getAttribute('data-less-label');
    });
  });

  // ---- customer search filter (scales "My Customers" to any book size) ----
  var custSearch = document.getElementById('custSearchInput');
  var custList = document.getElementById('custList');
  var custEmpty = document.getElementById('custEmpty');
  if(custSearch && custList){
    var custCards = Array.prototype.slice.call(custList.querySelectorAll('.custrow[data-name]'));
    custSearch.addEventListener('input', function(){
      var q = custSearch.value.trim().toLowerCase();
      var visibleCount = 0;
      custCards.forEach(function(card){
        var match = !q || card.getAttribute('data-name').indexOf(q) !== -1;
        card.style.display = match ? '' : 'none';
        if(match) visibleCount++;
      });
      if(custEmpty) custEmpty.style.display = visibleCount ? 'none' : '';
    });
  }

  var grid = document.getElementById('dashGrid');
  if(!grid) return;

  var STORAGE_KEY = 'cs360DashboardOrder';

  function widgets(){
    return Array.prototype.slice.call(grid.querySelectorAll(':scope > .widget'));
  }

  function restoreOrder(){
    var saved;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch(e){ saved = null; }
    if(!saved || !saved.length) return;
    saved.forEach(function(id){
      var el = grid.querySelector('.widget[data-widget="' + id + '"]');
      if(el) grid.appendChild(el);
    });
  }

  function saveOrder(){
    var order = widgets().map(function(w){ return w.getAttribute('data-widget'); });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); } catch(e){}
  }

  restoreOrder();

  var resetBtn = document.getElementById('resetLayoutBtn');
  if(resetBtn){
    resetBtn.addEventListener('click', function(){
      try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
      location.reload();
    });
  }

  var dragging = null;

  widgets().forEach(function(w){
    var handle = w.querySelector('.wgt-handle');
    if(!handle) return;

    handle.setAttribute('draggable', 'true');

    handle.addEventListener('dragstart', function(e){
      dragging = w;
      w.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', w.getAttribute('data-widget')); } catch(err){}
      try { e.dataTransfer.setDragImage(w, 24, 24); } catch(err){}
    });

    handle.addEventListener('dragend', function(){
      w.classList.remove('dragging');
      dragging = null;
      widgets().forEach(function(x){ x.classList.remove('drag-over'); });
      saveOrder();
    });

    w.addEventListener('dragover', function(e){
      if(!dragging || dragging === w) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      w.classList.add('drag-over');
    });

    w.addEventListener('dragleave', function(){
      w.classList.remove('drag-over');
    });

    w.addEventListener('drop', function(e){
      e.preventDefault();
      w.classList.remove('drag-over');
      if(!dragging || dragging === w) return;
      var all = widgets();
      var dragIdx = all.indexOf(dragging);
      var dropIdx = all.indexOf(w);
      if(dragIdx < dropIdx) w.after(dragging); else w.before(dragging);
    });
  });
});
