/* Simple, purpose-built charts — replaces the one-size-fits-all timeline.
   - renderCompositionBar: Customer 360 — where exposure sits across facilities
   - renderEventBars: Facility — what's due next, and how much
   Both render ALL items passed in (no truncation); composition bar scales
   via proportional width, event bars via horizontal scroll if needed. */

function renderCompositionBar(barHostId, legendHostId, segments){
  const bar = document.getElementById(barHostId);
  bar.innerHTML = segments.map(s => `
    <div class="compbar-seg" style="width:${s.pct}%;background:${s.color}" onclick="${s.href ? `location.href='${s.href}'` : ''}" title="${s.title || ''}">
      <div class="compbar-avail" style="width:${100 - s.drawnPct}%"></div>
      ${s.pct > 12 ? `<span class="compbar-lbl">${s.label}</span>` : ''}
    </div>`).join('');

  if (legendHostId){
    const legend = document.getElementById(legendHostId);
    legend.innerHTML = segments.map(s => `
      <div class="cl" ${s.href ? `onclick="location.href='${s.href}'"` : ''}>
        <span class="sw" style="background:${s.color}"></span>
        <span class="nm">${s.label}<span class="sub"> · ${s.sub || ''}</span></span>
        <span class="pct">${s.drawnPct}% drawn</span>
        <span class="amt">${s.amountLabel}</span>
      </div>`).join('');
  }
}

function renderEventBars(hostId, events, countLabel){
  const host = document.getElementById(hostId);
  // Square-root scale: keeps smaller-but-still-material events legible instead
  // of collapsing to a sliver when amounts span an order of magnitude or more.
  const maxRoot = Math.sqrt(Math.max(...events.map(e => e.value), 1));
  host.innerHTML = events.map(e => `
    <div class="eventbar ${e.state || ''}" title="${e.title || ''}">
      <span class="amt">${e.amountLabel}</span>
      <div class="bar" style="height:${Math.max(10, (Math.sqrt(e.value) / maxRoot) * 100)}%"></div>
      <span class="date">${e.date}</span>
      <span class="lbl">${e.label || ''}</span>
    </div>`).join('');
  const countEl = document.getElementById(hostId + 'Count');
  if (countEl && countLabel) countEl.textContent = countLabel;
}
