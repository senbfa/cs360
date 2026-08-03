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

  function render(items){
    if(!items.length){
      results.innerHTML = '<div class="sr-empty">No matches</div>';
      return;
    }
    var order = ['Customer','Deal','Facility','Drawing'];
    var groups = {};
    items.forEach(function(i){ (groups[i.type] = groups[i.type] || []).push(i); });
    var html = '';
    order.forEach(function(type){
      if(!groups[type]) return;
      html += '<div class="sr-group">' + type + (groups[type].length > 1 ? 's' : '') + '</div>';
      groups[type].forEach(function(i){
        html += '<div class="sr-item" data-path="' + prefix + i.path + '">' +
                '<span class="sr-name">' + escapeHtml(i.name) + '</span>' +
                '<span class="sr-id">' + escapeHtml(i.id) + '</span>' +
                '</div>';
      });
    });
    results.innerHTML = html;
    Array.prototype.forEach.call(results.querySelectorAll('.sr-item'), function(el){
      el.addEventListener('click', function(){ location.href = el.getAttribute('data-path'); });
    });
  }

  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    if(!q){ results.classList.remove('on'); return; }
    var matches = GLOBAL_SEARCH_INDEX.filter(function(i){
      return i.name.toLowerCase().indexOf(q) !== -1 || i.id.toLowerCase().indexOf(q) !== -1;
    });
    render(matches.slice(0, 20));
    results.classList.add('on');
  });

  input.addEventListener('focus', function(){
    if(input.value.trim()) results.classList.add('on');
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('.navsearch')) results.classList.remove('on');
  });
});
