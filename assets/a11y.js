/* Accessibility layer (WCAG 2.2 AA / Material accessibility guidance).
   Progressive enhancement shared by every page:
   - landmarks, skip link, heading roles, breadcrumb + table semantics
   - keyboard access + roles for click-only elements (rows, cards, menu items)
   - menus / tabs / collapsibles with aria-expanded, aria-selected, arrow-key support
   - form label association
   - screen-reader speech output via polite / assertive live regions: window.a11yAnnounce(msg, urgent)
   Idempotent: safe to re-run when content is re-rendered (a MutationObserver does so). */
(function(){
  'use strict';

  var uid = 0;
  function nid(p){ return 'a11y-' + p + '-' + (++uid); }
  function all(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function txt(el){ return (el.textContent || '').replace(/\s+/g, ' ').trim(); }
  function setIf(el, attr, val){ if(!el.hasAttribute(attr)) el.setAttribute(attr, val); }
  function reduceMotion(){ return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* ---------- Speech output (live regions) ---------- */
  var polite, assertive;
  function ensureLive(){
    if(polite) return;
    function mk(role, live){
      var d = document.createElement('div');
      d.className = 'sr-only';
      d.setAttribute('role', role);
      d.setAttribute('aria-live', live);
      d.setAttribute('aria-atomic', 'true');
      document.body.appendChild(d);
      return d;
    }
    polite = mk('status', 'polite');
    assertive = mk('alert', 'assertive');
  }
  window.a11yAnnounce = function(msg, urgent){
    ensureLive();
    var r = urgent ? assertive : polite;
    r.textContent = '';
    setTimeout(function(){ r.textContent = msg; }, 60);
  };

  /* ---------- Landmarks, skip link, headings ---------- */
  function landmarks(){
    var top = document.querySelector('.topnav');
    if(top) setIf(top, 'role', 'banner');
    var main = document.querySelector('.body');
    if(main){ setIf(main, 'role', 'main'); if(!main.id) main.id = 'main-content'; setIf(main, 'tabindex', '-1'); }
    if(main && !document.querySelector('.skip-link')){
      var a = document.createElement('a');
      a.className = 'skip-link';
      a.href = '#' + main.id;
      a.textContent = 'Skip to main content';
      a.addEventListener('click', function(){ setTimeout(function(){ main.focus(); }, 0); });
      document.body.insertBefore(a, document.body.firstChild);
    }
    all('.navsearch, .custsearch').forEach(function(el){ setIf(el, 'role', 'search'); });
    all('.pagehead').forEach(function(el){ setIf(el, 'role', 'region'); setIf(el, 'aria-label', 'Page header'); });
    all('.hdr').forEach(function(el){ setIf(el, 'role', 'region'); setIf(el, 'aria-label', 'Record summary'); });
    all('.ph-crumbs').forEach(function(c){
      setIf(c, 'role', 'navigation'); setIf(c, 'aria-label', 'Breadcrumb');
      all('.sep', c).forEach(function(s){ s.setAttribute('aria-hidden', 'true'); });
      all('.current', c).forEach(function(s){ setIf(s, 'aria-current', 'page'); });
    });
    var rn = document.getElementById('reqnav');
    if(rn){ setIf(rn, 'role', 'navigation'); setIf(rn, 'aria-label', 'Service request types'); }
  }

  function headings(){
    function h(sel, level){
      all(sel).forEach(function(el){
        if(/^H[1-6]$/.test(el.tagName) || el.hasAttribute('role')) return;
        el.setAttribute('role', 'heading'); el.setAttribute('aria-level', level);
      });
    }
    h('.greet', 1);
    h('.pagehead .title-switcher', 1);
    h('.cardh .ttl, .sectionhdr .t, .secttl', 2);
    h('.subsecttl', 3);
  }

  /* ---------- Names for icon-only / decorative content ---------- */
  function names(){
    all('svg').forEach(function(s){
      if(s.hasAttribute('role') || s.hasAttribute('aria-label') || s.hasAttribute('aria-labelledby')) return;
      s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    });
    all('.av, .navavatar, .custrow-chev, .tt-chev, .qn-chev, .sb-icon, .ci').forEach(function(el){
      el.setAttribute('aria-hidden', 'true');
    });
    all('a[title], button[title]').forEach(function(el){
      if(!txt(el) && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', el.getAttribute('title'));
    });
    all('span[title], div[title]').forEach(function(el){
      if(el.hasAttribute('onclick') || el.hasAttribute('role') || el.hasAttribute('aria-label')) return;
      if(el.classList.contains('navicon')) return;
      if(!txt(el)){ el.setAttribute('role', 'img'); el.setAttribute('aria-label', el.getAttribute('title')); }
    });
    var logoff = document.querySelector('.logoff-btn');
    if(logoff){ setIf(logoff, 'aria-label', 'Log off'); setIf(logoff, 'type', 'button'); }
    all('.navicon').forEach(function(el){
      setIf(el, 'role', 'button'); setIf(el, 'tabindex', '0');
      setIf(el, 'aria-label', el.getAttribute('title') || 'Settings'); el.setAttribute('data-a11y-click', '1');
    });
    all('.risk').forEach(function(el){ setIf(el, 'aria-label', 'Risk rating ' + txt(el)); });
    var gs = document.getElementById('globalSearch');
    if(gs) setIf(gs, 'aria-label', 'Search customer, deal, facility or drawing');
    var cs = document.getElementById('custSearchInput');
    if(cs) setIf(cs, 'aria-label', 'Search my customers');
    var pb = document.getElementById('prevBtn'); if(pb) setIf(pb, 'aria-label', 'Previous page');
    var nb = document.getElementById('nextBtn'); if(nb) setIf(nb, 'aria-label', 'Next page');
    var fp = document.getElementById('finPrev'); if(fp) setIf(fp, 'aria-label', 'Previous summary page');
    var fn = document.getElementById('finNext'); if(fn) setIf(fn, 'aria-label', 'Next summary page');
    all('.pag-info').forEach(function(el){ setIf(el, 'aria-live', 'polite'); setIf(el, 'aria-atomic', 'true'); });
    var ce = document.getElementById('custEmpty'); if(ce) setIf(ce, 'role', 'status');
    all('button').forEach(function(b){ setIf(b, 'type', 'button'); });
  }

  /* ---------- Mobile menu toggle (hidden checkbox + label) ---------- */
  function burger(){
    var cb = document.getElementById('navToggle');
    var lb = document.querySelector('label.navburger');
    if(!cb || !lb || lb.hasAttribute('data-a11y')) return;
    lb.setAttribute('data-a11y', '1');
    lb.setAttribute('role', 'button'); lb.setAttribute('tabindex', '0');
    lb.setAttribute('aria-label', 'Main menu');
    var sync = function(){ lb.setAttribute('aria-expanded', cb.checked ? 'true' : 'false'); };
    cb.addEventListener('change', sync); sync();
    lb.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); cb.checked = !cb.checked; sync(); }
    });
  }

  /* ---------- Click-only elements -> keyboard operable ---------- */
  var NATIVE = /^(A|BUTTON|INPUT|SELECT|TEXTAREA|LABEL|SUMMARY)$/;
  function clickables(){
    all('[onclick]').forEach(function(el){
      if(NATIVE.test(el.tagName) || el.hasAttribute('data-a11y-click')) return;
      var js = el.getAttribute('onclick') || '';
      el.setAttribute('data-a11y-click', '1');
      var inMenu = el.classList.contains('mi') || el.classList.contains('tm-item');
      var isRow = el.tagName === 'TR';
      var inert = !!el.closest('[aria-hidden="true"]');
      if(inMenu) el.setAttribute('role', 'menuitem');
      else if(!isRow && !el.hasAttribute('role')) el.setAttribute('role', /location\.href/.test(js) ? 'link' : 'button');
      el.setAttribute('tabindex', (inMenu || inert) ? '-1' : '0');
      if(!isRow && !txt(el) && el.getAttribute('title')) el.setAttribute('aria-label', el.getAttribute('title'));
    });
    all('.compbar-seg').forEach(function(el){
      if(el.hasAttribute('aria-label')) return;
      var t = el.getAttribute('title') || txt(el);
      if(t) el.setAttribute('aria-label', t);
    });
    all('.collapse-head').forEach(function(el){
      var m = /toggleCollapse\('([^']+)'/.exec(el.getAttribute('onclick') || '');
      if(m) setIf(el, 'aria-controls', m[1]);
      el.setAttribute('aria-expanded', el.classList.contains('closed') ? 'false' : 'true');
    });
  }

  document.addEventListener('keydown', function(e){
    var el = e.target;
    if(!el || !el.hasAttribute || !el.hasAttribute('data-a11y-click') || e.target !== el) return;
    var role = el.getAttribute('role');
    var space = e.key === ' ' || e.key === 'Spacebar';
    if(e.key === 'Enter' || (space && role !== 'link' && el.tagName !== 'TR')){
      e.preventDefault(); el.click();
    }
  });

  /* ---------- Menus (title switcher, quick nav, service actions, pill overflow) ---------- */
  var MENU_TRIGGERS = [
    { trig: '.title-trigger', menu: function(){ return document.getElementById('titleMenu'); } },
    { trig: '.svc-trigger', menu: function(){ return document.getElementById('svcMenu'); } },
    { trig: '.quicknav-trigger', menu: function(t){
        var m = /'([^']+)'\s*\)/.exec(t.getAttribute('onclick') || ''); return m && document.getElementById(m[1]); } }
  ];
  function menuItems(menu){ return all('[role="menuitem"]', menu); }
  function closeMenu(menu, trigger){
    menu.classList.remove('on');
    if(trigger) trigger.focus();
  }
  function menus(){
    MENU_TRIGGERS.forEach(function(def){
      all(def.trig).forEach(function(t){
        var menu = def.menu(t);
        if(!menu || t.hasAttribute('data-a11y-menu')) return;
        t.setAttribute('data-a11y-menu', '1');
        if(!menu.id) menu.id = nid('menu');
        t.setAttribute('aria-haspopup', 'menu');
        t.setAttribute('aria-controls', menu.id);
        t.setAttribute('aria-expanded', menu.classList.contains('on') ? 'true' : 'false');
        menu.setAttribute('role', 'menu');
        var head = menu.querySelector('.tm-head');
        if(head){ menu.setAttribute('aria-label', txt(head)); head.setAttribute('aria-hidden', 'true'); }
        else menu.setAttribute('aria-label', txt(t));
        t._a11yMenu = menu;
        menu._a11yTrigger = t;
        // keyboard-initiated open lands on the first item
        t.addEventListener('click', function(e){
          if(e.detail === 0) setTimeout(function(){
            if(menu.classList.contains('on')){ var it = menuItems(menu); if(it[0]) it[0].focus(); }
          }, 0);
        });
        t.addEventListener('keydown', function(e){
          if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
          e.preventDefault();
          if(!menu.classList.contains('on')) t.click();
          var it = menuItems(menu);
          if(it.length) (e.key === 'ArrowDown' ? it[0] : it[it.length - 1]).focus();
        });
        menu.addEventListener('keydown', function(e){
          var it = menuItems(menu), i = it.indexOf(document.activeElement);
          if(e.key === 'ArrowDown'){ e.preventDefault(); it[(i + 1) % it.length].focus(); }
          else if(e.key === 'ArrowUp'){ e.preventDefault(); it[(i - 1 + it.length) % it.length].focus(); }
          else if(e.key === 'Home'){ e.preventDefault(); it[0].focus(); }
          else if(e.key === 'End'){ e.preventDefault(); it[it.length - 1].focus(); }
          else if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); closeMenu(menu, t); }
          else if(e.key === 'Tab'){ menu.classList.remove('on'); }
        });
      });
    });
    var more = document.querySelector('.pill-more');
    if(more && !more.hasAttribute('data-a11y-menu')){
      more.setAttribute('data-a11y-menu', '1');
      var wrap = more.closest('.pill-more-wrap');
      var pop = wrap && wrap.querySelector('.pill-popover');
      if(pop){ if(!pop.id) pop.id = nid('more'); more.setAttribute('aria-controls', pop.id); more.removeAttribute('aria-haspopup'); }
      more.setAttribute('aria-expanded', 'false');
      more.setAttribute('aria-label', txt(more).replace(/^\+/, '') + ' — show hidden status labels');
      wrap.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && wrap.classList.contains('on')){ wrap.classList.remove('on'); more.focus(); }
      });
    }
  }

  /* ---------- Tabs (side tabs, main tabs) + request nav ---------- */
  function tabset(listSel, itemSel, panelId, vertical){
    all(listSel).forEach(function(list){
      var items = all(itemSel, list);
      if(!items.length) return;
      var panel = panelId && document.getElementById(panelId);
      list.setAttribute('role', 'tablist');
      if(vertical) list.setAttribute('aria-orientation', 'vertical');
      if(!list.hasAttribute('aria-label')) list.setAttribute('aria-label', vertical ? 'Detail sections' : 'Customer sections');
      if(panel && !panel.id) panel.id = nid('panel');
      var active = -1;
      items.forEach(function(it, i){
        if(!it.id) it.id = nid('tab');
        it.setAttribute('role', 'tab');
        var on = it.classList.contains('on');
        if(on) active = i;
        it.setAttribute('aria-selected', on ? 'true' : 'false');
        it.setAttribute('tabindex', on ? '0' : '-1');
        if(panel) it.setAttribute('aria-controls', panel.id);
      });
      if(active < 0){ items[0].setAttribute('tabindex', '0'); }
      if(panel){
        panel.setAttribute('role', 'tabpanel'); panel.setAttribute('tabindex', '0');
        if(active >= 0) panel.setAttribute('aria-labelledby', items[active].id);
      }
      if(list.hasAttribute('data-a11y-tabs')) return;
      list.setAttribute('data-a11y-tabs', '1');
      list.addEventListener('keydown', function(e){
        var cur = all(itemSel, list), i = cur.indexOf(document.activeElement);
        if(i < 0) return;
        var next = -1, fwd = vertical ? 'ArrowDown' : 'ArrowRight', back = vertical ? 'ArrowUp' : 'ArrowLeft';
        if(e.key === fwd) next = (i + 1) % cur.length;
        else if(e.key === back) next = (i - 1 + cur.length) % cur.length;
        else if(e.key === 'Home') next = 0;
        else if(e.key === 'End') next = cur.length - 1;
        else if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); cur[i].click(); return; }
        if(next < 0) return;
        e.preventDefault(); cur[next].focus(); cur[next].click();
      });
    });
  }
  function tabs(){
    tabset('.sidetabs', '.sidetab', 'detailbody', true);
    tabset('#mainTabs', '.maintab', 'mainContent', false);
    var rn = document.getElementById('reqnav');
    if(rn) all('.rn', rn).forEach(function(it){
      it.setAttribute('role', 'button'); it.setAttribute('tabindex', '0'); it.setAttribute('data-a11y-click', '1');
      if(it.classList.contains('on')) it.setAttribute('aria-current', 'true'); else it.removeAttribute('aria-current');
    });
  }

  /* ---------- Tables ---------- */
  function tables(){
    all('table').forEach(function(t){
      all('thead th', t).forEach(function(th){ setIf(th, 'scope', 'col'); });
      if(t.getAttribute('aria-label') || t.getAttribute('aria-labelledby') || t.querySelector('caption')) return;
      var ctx = t.closest('.card, .detailbody, .collapse-body, #mainContent');
      var prev = t.previousElementSibling;
      var label = (prev && /secttl|subsecttl/.test(prev.className) && txt(prev)) ||
                  (ctx && txt(ctx.querySelector('.cardh .ttl, .sectionhdr .t, .secttl') || document.createElement('i')));
      var tab = document.querySelector('.maintab.on, .sidetab.on');
      t.setAttribute('aria-label', label || (tab && txt(tab)) || 'Data table');
    });
  }

  /* ---------- Forms ---------- */
  function forms(){
    all('.field').forEach(function(f){
      var label = f.querySelector(':scope > label');
      var group = f.querySelector(':scope > .radiogrp');
      if(!label) return;
      if(group){
        if(!label.id) label.id = nid('lbl');
        group.setAttribute('role', 'radiogroup'); group.setAttribute('aria-labelledby', label.id);
        return;
      }
      var ctl = f.querySelector('input:not([type=hidden]), select, textarea');
      if(!ctl || label.hasAttribute('for') || label.contains(ctl)) return;
      if(!ctl.id) ctl.id = nid('f');
      label.setAttribute('for', ctl.id);
    });
    all('.checkrow').forEach(function(row){
      var ctl = row.querySelector('input'); var span = row.querySelector('span');
      if(!ctl || !span || ctl.hasAttribute('aria-labelledby') || ctl.id && document.querySelector('label[for="' + ctl.id + '"]')) return;
      if(!span.id) span.id = nid('chk');
      ctl.setAttribute('aria-labelledby', span.id);
    });
    all('input[required], select[required], textarea[required]').forEach(function(c){ c.setAttribute('aria-required', 'true'); });
    all('.hint').forEach(function(h){ setIf(h, 'role', 'note'); });
  }
  // clear aria-invalid once the user edits a field
  document.addEventListener('input', function(e){
    if(e.target && e.target.getAttribute && e.target.getAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid');
  });
  document.addEventListener('invalid', function(e){
    if(e.target && e.target.setAttribute) e.target.setAttribute('aria-invalid', 'true');
  }, true);

  /* ---------- Outside-click / Escape for popups handled elsewhere; sync dynamic state ---------- */
  function syncState(){
    all('[data-a11y-menu]').forEach(function(t){
      var m = t._a11yMenu; if(m) t.setAttribute('aria-expanded', m.classList.contains('on') ? 'true' : 'false');
    });
    var more = document.querySelector('.pill-more');
    if(more){ var w = more.closest('.pill-more-wrap'); if(w) more.setAttribute('aria-expanded', w.classList.contains('on') ? 'true' : 'false'); }
    all('.collapse-head').forEach(function(el){ el.setAttribute('aria-expanded', el.classList.contains('closed') ? 'false' : 'true'); });
    all('.sidetab, .maintab').forEach(function(it){
      var on = it.classList.contains('on');
      it.setAttribute('aria-selected', on ? 'true' : 'false'); it.setAttribute('tabindex', on ? '0' : '-1');
      if(on){ var p = document.getElementById('detailbody') || document.getElementById('mainContent'); if(p && p.getAttribute('role') === 'tabpanel') p.setAttribute('aria-labelledby', it.id); }
    });
    all('#reqnav .rn').forEach(function(it){
      if(it.classList.contains('on')) it.setAttribute('aria-current', 'true'); else it.removeAttribute('aria-current');
    });
  }

  /* ---------- Speech announcements for state changes ---------- */
  var announced = new WeakMap();
  function announceChanges(muts){
    muts.forEach(function(m){
      if(m.type !== 'attributes') return;
      var el = m.target;
      if(m.attributeName === 'class'){
        var on = el.classList && el.classList.contains('on');
        if(el.classList && el.classList.contains('finpage') && on){
          var pages = all('.finpage'); var n = pages.indexOf(el) + 1;
          var rows = all('.row', el).map(function(r){ return txt(r); }).join('. ');
          window.a11yAnnounce('Summary page ' + n + ' of ' + pages.length + '. ' + rows);
        } else if(el.classList && el.classList.contains('svc-banner') && on){
          window.a11yAnnounce(txt(el), el.classList.contains('banner-error'));
        } else if(el.classList && el.classList.contains('collapse-head')){
          window.a11yAnnounce(txt(el.querySelector('.t, .ttl') || el) + (el.classList.contains('closed') ? ' collapsed' : ' expanded'));
        }
      }
    });
  }

  function enhance(){
    landmarks(); headings(); names(); burger(); clickables();
    menus(); tabs(); tables(); forms(); syncState();
  }

  var scheduled = false;
  function schedule(){
    if(scheduled) return; scheduled = true;
    (window.requestAnimationFrame || setTimeout)(function(){ scheduled = false; enhance(); });
  }

  function start(){
    ensureLive();
    enhance();
    var mo = new MutationObserver(function(muts){
      announceChanges(muts);
      var structural = muts.some(function(m){ return m.type === 'childList'; });
      if(structural) schedule(); else syncState();
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    // Escape closes any open popup menu from anywhere inside it
    document.addEventListener('keydown', function(e){
      if(e.key !== 'Escape') return;
      all('.title-menu.on, .svc-menu.on, .quicknav-menu.on').forEach(function(m){
        if(m.contains(document.activeElement) || (m._a11yTrigger === document.activeElement)) closeMenu(m, m._a11yTrigger);
      });
    });
  }
  window.a11yEnhance = enhance;
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
