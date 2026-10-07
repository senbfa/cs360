const GLOBAL_SEARCH_INDEX = [
  { type: 'Customer', name: 'Meridian Foods PLC', id: 'CUST 482211', path: 'customer_360.html' },

  { type: 'Deal', name: 'Acquisition Financing Package', id: 'AA250112D1V01', path: 'deals/deal_1.html' },
  { type: 'Deal', name: 'Working Capital Facility Agreement', id: 'AA250310D1V01', path: 'deals/deal_2.html' },
  { type: 'Deal', name: 'Trade Finance Facility', id: 'AA250512D1V01', path: 'deals/deal_3.html' },

  { type: 'Facility', name: 'Acquisition Term Loan', id: 'AA250114F1V01', path: 'facilities/facility_1.html' },
  { type: 'Facility', name: 'Working Capital RCF', id: 'AA250310F1V01', path: 'facilities/facility_2.html' },
  { type: 'Facility', name: 'Multi-currency Trade Finance Facility', id: 'AA250512F1V01', path: 'facilities/facility_3.html' },

  { type: 'Drawing', name: 'Cash Loan', id: 'AA250128L1V01', path: 'drawings/drawing_1a.html' },
  { type: 'Drawing', name: 'Cash Loan', id: 'AA250128L1V02', path: 'drawings/drawing_1b.html' },
  { type: 'Drawing', name: 'Cash Loan (Pending)', id: 'AA250228L1V03', path: 'drawings/drawing_1c.html' },
  { type: 'Drawing', name: 'Cash Loan (Revolving)', id: 'AA250315L2V01', path: 'drawings/drawing_2a.html' },
  { type: 'Drawing', name: 'Letter of Credit', id: 'AA250620L2V02', path: 'drawings/drawing_2b.html' },
  { type: 'Drawing', name: 'Import Letter of Credit', id: 'AA250520L3V01', path: 'drawings/drawing_3a.html' },
  { type: 'Drawing', name: 'Bank Guarantee', id: 'AA250715L3V02', path: 'drawings/drawing_3b.html' }
];

document.addEventListener('DOMContentLoaded', function(){
  var input = document.getElementById('globalSearch');
  var results = document.getElementById('searchResults');
  if(!input || !results) return;

  var prefix = /\/(deals|facilities|drawings|service-requests)\//.test(location.pathname) ? '../' : '';

  function escapeHtml(s){
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  var active = -1;
  function options(){ return Array.prototype.slice.call(results.querySelectorAll('.sr-item')); }
  function setActive(i){
    var opts = options();
    opts.forEach(function(o){ o.classList.remove('active'); o.setAttribute('aria-selected', 'false'); });
    active = (i < 0 || !opts.length) ? -1 : (i >= opts.length ? 0 : i);
    if(active < 0){ input.removeAttribute('aria-activedescendant'); return; }
    var o = opts[active];
    o.classList.add('active'); o.setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', o.id);
    if(o.scrollIntoView) o.scrollIntoView({ block: 'nearest' });
  }
  function open(){ results.classList.add('on'); input.setAttribute('aria-expanded', 'true'); }
  function close(){ results.classList.remove('on'); input.setAttribute('aria-expanded', 'false'); setActive(-1); }

  function render(items){
    active = -1;
    input.removeAttribute('aria-activedescendant');
    if(!items.length){
      results.innerHTML = '<div class="sr-empty" role="presentation">No matches</div>';
      if(window.a11yAnnounce) a11yAnnounce('No results');
      return;
    }
    var order = ['Customer','Deal','Facility','Drawing'];
    var groups = {};
    items.forEach(function(i){ (groups[i.type] = groups[i.type] || []).push(i); });
    var html = '', n = 0;
    order.forEach(function(type){
      if(!groups[type]) return;
      html += '<div class="sr-group" role="presentation">' + type + (groups[type].length > 1 ? 's' : '') + '</div>';
      groups[type].forEach(function(i){
        html += '<div class="sr-item" role="option" aria-selected="false" id="sr-opt-' + (n++) + '"' +
                ' aria-label="' + escapeHtml(i.name + ', ' + i.type + ', ' + i.id) + '"' +
                ' data-path="' + prefix + i.path + '">' +
                '<span class="sr-name">' + escapeHtml(i.name) + '</span>' +
                '<span class="sr-id">' + escapeHtml(i.id) + '</span>' +
                '</div>';
      });
    });
    results.innerHTML = html;
    Array.prototype.forEach.call(results.querySelectorAll('.sr-item'), function(el){
      el.addEventListener('click', function(){ location.href = el.getAttribute('data-path'); });
    });
    if(window.a11yAnnounce) a11yAnnounce(items.length + (items.length === 1 ? ' result' : ' results') + ' available. Use up and down arrows to review.');
  }

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-haspopup', 'listbox');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', 'searchResults');
  results.setAttribute('role', 'listbox');
  results.setAttribute('aria-label', 'Search results');

  input.addEventListener('keydown', function(e){
    var opts = options();
    if(e.key === 'ArrowDown'){ e.preventDefault(); if(!results.classList.contains('on') && input.value.trim()) open(); setActive(active + 1); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); setActive(active <= 0 ? opts.length - 1 : active - 1); }
    else if(e.key === 'Home' && opts.length && results.classList.contains('on')){ e.preventDefault(); setActive(0); }
    else if(e.key === 'End' && opts.length && results.classList.contains('on')){ e.preventDefault(); setActive(opts.length - 1); }
    else if(e.key === 'Enter' && active >= 0 && opts[active]){ e.preventDefault(); location.href = opts[active].getAttribute('data-path'); }
    else if(e.key === 'Escape' && results.classList.contains('on')){ e.preventDefault(); close(); }
    else if(e.key === 'Tab'){ close(); }
  });

  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    if(!q){ close(); return; }
    var matches = GLOBAL_SEARCH_INDEX.filter(function(i){
      return i.name.toLowerCase().indexOf(q) !== -1 || i.id.toLowerCase().indexOf(q) !== -1;
    });
    render(matches.slice(0, 20));
    open();
  });

  input.addEventListener('focus', function(){
    if(input.value.trim()) open();
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('.navsearch')) close();
  });
});
