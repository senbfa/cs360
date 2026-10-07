/* Simple, purpose-built charts — replaces the one-size-fits-all timeline.
   - renderCompositionBar: Customer 360 — where exposure sits across facilities
   - renderEventBars: Facility — what's due next, and how much
   Both render ALL items passed in (no truncation); composition bar scales
   via proportional width, event bars via horizontal scroll if needed. */

function renderCompositionBar(barHostId, legendHostId, segments){
  const bar = document.getElementById(barHostId);
  // The legend carries the same data as accessible, focusable links; the bar is a visual duplicate.
  if (legendHostId) bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = segments.map(s => `
    <div class="compbar-seg" style="width:${s.pct}%;background:${s.color}" ${s.href ? `onclick="location.href='${s.href}'"` : ''} title="${s.title || ''}" aria-label="${s.label}, ${Math.round(s.pct)}% of total exposure, ${s.drawnPct}% drawn">
      <div class="compbar-avail" style="width:${100 - s.drawnPct}%"></div>
      ${s.pct > 12 ? `<span class="compbar-lbl">${s.label}</span>` : ''}
    </div>`).join('');

  if (legendHostId){
    const legend = document.getElementById(legendHostId);
    legend.setAttribute('role', 'list');
    legend.innerHTML = segments.map(s => `
      <div class="cl" role="${s.href ? 'link' : 'listitem'}" aria-label="${s.label}, ${s.sub || ''}, ${Math.round(s.pct)}% of total, ${s.drawnPct}% drawn, ${s.amountLabel}" ${s.href ? `onclick="location.href='${s.href}'"` : ''}>
        <span class="sw" style="background:${s.color}" aria-hidden="true"></span>
        <span class="nm">${s.label}<span class="sub"> · ${s.sub || ''}</span></span>
        <span class="pct-total">${Math.round(s.pct)}% of total</span>
        <span class="pct">${s.drawnPct}% drawn</span>
        <span class="amt">${s.amountLabel}</span>
      </div>`).join('');
  }
}

function renderDonutChart(svgHostId, centerHostId, legendHostId, segments, centerValue, centerLabel){
  const svg = document.getElementById(svgHostId);
  const r = 64, cx = 80, cy = 80, sw = 20;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  let arcs = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--neutral-tint)" stroke-width="${sw}"/>`;
  segments.forEach(s => {
    const len = circumference * (s.pct / 100);
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${sw}" stroke-dasharray="${len} ${circumference}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += len;
  });
  svg.innerHTML = arcs;
  svg.setAttribute('role', 'img');
  svg.removeAttribute('aria-hidden');
  svg.setAttribute('aria-label', 'Donut chart. ' + centerValue + ' ' + centerLabel + '. ' +
    segments.map(s => `${s.label} ${Math.round(s.pct)}%`).join(', '));

  if (centerHostId){
    document.getElementById(centerHostId).innerHTML = `<b>${centerValue}</b><span>${centerLabel}</span>`;
  }

  if (legendHostId){
    const legend = document.getElementById(legendHostId);
    legend.setAttribute('role', 'list');
    legend.innerHTML = segments.map(s => `
      <div class="cl" role="${s.href ? 'link' : 'listitem'}" aria-label="${s.label}, ${s.sub || ''}, ${Math.round(s.pct)}% of total, ${s.drawnPct}% drawn, ${s.amountLabel}" ${s.href ? `onclick="location.href='${s.href}'"` : ''}>
        <span class="sw" style="background:${s.color}" aria-hidden="true"></span>
        <span class="nm">${s.label}<span class="sub"> · ${s.sub || ''}</span></span>
        <span class="pct-total">${Math.round(s.pct)}% of total</span>
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
  host.setAttribute('role', 'list');
  host.setAttribute('aria-label', countLabel || 'Upcoming scheduled events');
  host.innerHTML = events.map(e => `
    <div class="eventbar ${e.state || ''}" role="listitem" title="${e.title || ''}" aria-label="${e.date}: ${e.label || 'Event'}, ${e.amountLabel}${e.state === 'next' ? ', next due' : ''}">
      <span class="amt" aria-hidden="true">${e.amountLabel}</span>
      <div class="bar" aria-hidden="true" style="height:${Math.max(10, (Math.sqrt(e.value) / maxRoot) * 100)}%"></div>
      <span class="date" aria-hidden="true">${e.date}</span>
      <span class="lbl" aria-hidden="true">${e.label || ''}</span>
    </div>`).join('');
  const countEl = document.getElementById(hostId + 'Count');
  if (countEl && countLabel) countEl.textContent = countLabel;
}
