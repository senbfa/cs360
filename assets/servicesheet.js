/* Shared Service Request data + form templates + right-side sheet mechanics.
   Used by: Facility / Drawing pages (inline slide-over) and the standalone
   service_request.html (full-page, deep-linkable fallback). Single source
   of truth so both entry points stay in sync. */

const SS_FACILITIES = {
  'AA250114F1V01': { name:'Acquisition Term Loan', deal:'AA250112D1V01', ccy:'GBP', commitment:200000000,
    borrowers:['Meridian Foods PLC','Meridian Holdings Ltd'],
    products:['Cash Loan','Letter of Credit','Swingline'],
    covenants:[
      {key:'leverage', label:'Net Leverage', op:'<=', threshold:4.0, current:3.20, unit:'x'},
      {key:'intcov', label:'Interest Cover', op:'>=', threshold:3.0, current:4.10, unit:'x'},
      {key:'dscr', label:'DSCR', op:'>=', threshold:1.25, current:1.28, unit:'x'},
      {key:'capex', label:'Capex', op:'<=', threshold:20000000, current:14000000, unit:'£'}
    ]},
  'AA250310F1V01': { name:'Working Capital RCF', deal:'AA250310D1V01', ccy:'GBP', commitment:75000000,
    borrowers:['Meridian Foods PLC','Meridian Foods (Ireland) Ltd'],
    products:['Cash Loan','Letter of Credit'],
    covenants:[
      {key:'leverage', label:'Net Leverage', op:'<=', threshold:4.0, current:3.20, unit:'x'},
      {key:'intcov', label:'Interest Cover', op:'>=', threshold:3.0, current:4.10, unit:'x'},
      {key:'dscr', label:'DSCR', op:'>=', threshold:1.25, current:1.28, unit:'x'}
    ]},
  'AA250512F1V01': { name:'Multi-currency Trade Finance Facility', deal:'AA250512D1V01', ccy:'USD', commitment:40000000,
    borrowers:['Meridian Foods PLC','Meridian Holdings Ltd'],
    products:['Import Letter of Credit','Bank Guarantee'],
    covenants:[]}
};

const SS_DRAWINGS = {
  'AA250128L1V01': { facility:'AA250114F1V01', ccy:'GBP', outstanding:120000000, borrower:'Meridian Foods PLC' },
  'AA250128L1V02': { facility:'AA250114F1V01', ccy:'GBP', outstanding:50000000, borrower:'Meridian Foods PLC' },
  'AA250228L1V03': { facility:'AA250114F1V01', ccy:'EUR', outstanding:0, borrower:'Meridian Holdings Ltd' },
  'AA250315L2V01': { facility:'AA250310F1V01', ccy:'GBP', outstanding:30000000, borrower:'Meridian Foods PLC' },
  'AA250620L2V02': { facility:'AA250310F1V01', ccy:'GBP', outstanding:15000000, borrower:'Meridian Foods (Ireland) Ltd' },
  'AA250520L3V01': { facility:'AA250512F1V01', ccy:'USD', outstanding:12000000, borrower:'Meridian Foods PLC' },
  'AA250715L3V02': { facility:'AA250512F1V01', ccy:'USD', outstanding:5000000, borrower:'Meridian Holdings Ltd' }
};

const SS_REQUESTS = [
  { id:'new-drawing', label:'New Drawing' },
  { id:'process-repayment', label:'Process Repayment' },
  { id:'apply-prepayment', label:'Apply Prepayment' },
  { id:'record-covenant-test', label:'Record Covenant Test' },
  { id:'amend-facility', label:'Amend Facility' },
  { id:'increase-commitment', label:'Increase Commitment' },
  { id:'cancel-commitment', label:'Cancel Commitment' },
  { id:'close-facility', label:'Close Facility' }
];

function ssFmt(n, sym){ return sym + Number(n).toLocaleString('en-GB'); }
function ssCcySymbol(ccy){ return ccy === 'USD' ? '$' : (ccy === 'EUR' ? '€' : '£'); }
function ssToday(){ return '2026-07-09'; }
function ssGenRef(){ return 'SR-' + (10900 + Math.floor(Math.random() * 90)); }

let ssCtx = { action:'', facility:'', drawing:'', customer:'Meridian Foods PLC', ref:'' };
function ssSetCtx(c){
  ssCtx = Object.assign({ action:'', facility:'', drawing:'', customer:'Meridian Foods PLC', ref:'' }, c);
}

function ssBorrowerOptions(fac){
  if (!fac) return '<option>Meridian Foods PLC</option>';
  return fac.borrowers.map(b => `<option>${b}</option>`).join('');
}
function ssProductOptions(fac){
  if (!fac) return '<option>Cash Loan</option>';
  return fac.products.map(p => `<option>${p}</option>`).join('');
}
function ssFacilityField(){
  const fac = SS_FACILITIES[ssCtx.facility];
  return `<div class="field readonly"><label>Facility</label><input type="text" readonly value="${fac ? fac.name + ' — ' + ssCtx.facility : 'Not specified'}"></div>`;
}
function ssDrawingField(){
  const draw = SS_DRAWINGS[ssCtx.drawing];
  return `<div class="field readonly"><label>Drawing</label><input type="text" readonly value="${draw ? ssCtx.drawing + ' — ' + ssFmt(draw.outstanding, ssCcySymbol(draw.ccy)) + ' outstanding' : 'Not specified'}"></div>`;
}

const SS_FORMS = {
  'new-drawing': () => {
    const fac = SS_FACILITIES[ssCtx.facility];
    return `
    <div class="secttl">New Drawing Request</div>
    <div class="formgrid">
      ${ssFacilityField()}
      <div class="field"><label>Borrower</label><select id="f_borrower">${ssBorrowerOptions(fac)}</select></div>
      <div class="field"><label>Drawing Product</label><select id="f_product">${ssProductOptions(fac)}</select></div>
      <div class="field"><label>Currency</label><select id="f_ccy">${fac ? `<option>${fac.ccy}</option><option>USD</option><option>EUR</option><option>GBP</option>` : '<option>GBP</option>'}</select></div>
      <div class="field"><label>Amount</label><input type="number" id="f_amount" min="500000" step="500000" placeholder="e.g. 10000000" required></div>
      <div class="field"><label>Requested Drawdown Date</label><input type="date" id="f_date" min="${ssToday()}" required></div>
      <div class="field"><label>Interest Period</label><select id="f_period"><option>1 Month</option><option selected>3 Months</option><option>6 Months</option></select></div>
      <div class="field"><label>Value Date</label><input type="date" id="f_value" min="${ssToday()}" required></div>
      <div class="field span2"><label>Purpose / Reference</label><textarea id="f_purpose" placeholder="e.g. Working capital top-up, PO reference, etc."></textarea></div>
    </div>`;
  },
  'process-repayment': () => `
    <div class="secttl">Process Repayment</div>
    <div class="formgrid">
      ${ssFacilityField()}
      ${ssDrawingField()}
      <div class="field"><label>Repayment Type</label>
        <div class="radiogrp"><label class="radioopt"><input type="radio" name="rtype" checked>Scheduled</label><label class="radioopt"><input type="radio" name="rtype">Voluntary</label></div>
      </div>
      <div class="field"><label>Repayment Amount</label><input type="number" id="f_amount" min="1" required></div>
      <div class="field"><label>Repayment Date</label><input type="date" id="f_date" min="${ssToday()}" required value="${ssToday()}"></div>
      <div class="field"><label>Source Account</label><input type="text" value="GB29 NWBK 6016 1331 9268 19" readonly></div>
      <div class="field span2"><label>Notes</label><textarea id="f_notes" placeholder="Optional notes for operations"></textarea></div>
    </div>`,
  'apply-prepayment': () => `
    <div class="secttl">Apply Prepayment</div>
    <div class="formgrid">
      ${ssFacilityField()}
      ${ssDrawingField()}
      <div class="field"><label>Prepayment Amount</label><input type="number" id="f_amount" min="1" required></div>
      <div class="field"><label>Prepayment Date</label><input type="date" id="f_date" min="${ssToday()}" required value="${ssToday()}"></div>
      <div class="field"><label>Apply To</label>
        <div class="radiogrp"><label class="radioopt"><input type="radio" name="atype" checked>Reduce Principal</label><label class="radioopt"><input type="radio" name="atype">Reduce Commitment</label></div>
      </div>
      <div class="field"><label>Break Cost Estimate</label><input type="text" value="Calculated at settlement" readonly></div>
      <div class="field span2"><div class="checkrow"><input type="checkbox" id="f_break" required><span>I acknowledge that break costs may apply for prepayment outside a scheduled interest payment date, in accordance with the facility agreement.</span></div></div>
      <div class="field span2"><label>Notes</label><textarea id="f_notes"></textarea></div>
    </div>`,
  'record-covenant-test': () => {
    const fac = SS_FACILITIES[ssCtx.facility] || SS_FACILITIES['AA250114F1V01'];
    const rows = fac.covenants.length ? fac.covenants.map(c => `
      <div class="field">
        <label>${c.label} (${c.op === '<=' ? '≤' : '≥'} ${c.unit === '£' ? '£' + c.threshold.toLocaleString() : c.threshold + c.unit})</label>
        <input type="number" step="0.01" class="cov-input" data-key="${c.key}" data-op="${c.op}" data-th="${c.threshold}" value="${c.current}">
      </div>`).join('') : '<div class="field span2"><span class="hint">No financial covenants apply to this facility.</span></div>';
    return `
    <div class="secttl">Record Covenant Test</div>
    <div class="formgrid">
      ${ssFacilityField()}
      <div class="field"><label>Test Date</label><input type="date" id="f_date" value="${ssToday()}" required></div>
      <div class="field span2"><label>Compliance Certificate</label><input type="file" id="f_cert"><span class="hint">Upload the signed compliance certificate for this test period</span></div>
    </div>
    <hr class="divider">
    <div class="subsecttl">Covenant Results</div>
    <div class="formgrid" id="covGrid">${rows}</div>
    <div class="field span2" style="margin-top:12px"><span class="hint">Result: </span><span id="covResult" class="st st-a">Compliant</span></div>`;
  },
  'amend-facility': () => `
    <div class="secttl">Amend Facility</div>
    <div class="formgrid">
      ${ssFacilityField()}
      <div class="field"><label>Amendment Type</label><select id="f_type"><option>Margin Change</option><option>Covenant Reset</option><option>Extend Maturity</option><option>Extend Sub-limit Tenor</option><option>Other</option></select></div>
      <div class="field"><label>Effective Date</label><input type="date" id="f_date" min="${ssToday()}" required></div>
      <div class="field span2"><label>Description</label><textarea id="f_desc" placeholder="Describe the amendment and rationale" required></textarea></div>
      <div class="field"><label>Credit Approval Reference</label><input type="text" id="f_approval" placeholder="e.g. CR-2026-0451"></div>
      <div class="field"><label>Lender Consent</label><select><option>Not Required (bilateral)</option><option>Required — Obtained</option><option>Required — Pending</option></select></div>
    </div>`,
  'increase-commitment': () => {
    const fac = SS_FACILITIES[ssCtx.facility];
    const cur = fac ? fac.commitment : 0;
    return `
    <div class="secttl">Increase Commitment</div>
    <div class="formgrid">
      ${ssFacilityField()}
      <div class="field readonly"><label>Current Commitment</label><input type="text" id="f_current" readonly value="${fac ? ssFmt(cur, ssCcySymbol(fac.ccy)) : '—'}"></div>
      <div class="field"><label>Increase Amount</label><input type="number" id="f_increase" min="1" step="500000" oninput="ssUpdateNewTotal(${cur})" required></div>
      <div class="field readonly"><label>New Total Commitment</label><input type="text" id="f_newtotal" readonly value="${fac ? ssFmt(cur, ssCcySymbol(fac.ccy)) : '—'}"></div>
      <div class="field"><label>Effective Date</label><input type="date" id="f_date" min="${ssToday()}" required></div>
      <div class="field"><label>Facility Type</label><input type="text" value="Incremental / Accordion" readonly></div>
      <div class="field span2"><div class="checkrow"><input type="checkbox" id="f_consent" required><span>Lender consent and updated credit approval have been (or will be) obtained prior to the increase becoming effective.</span></div></div>
    </div>`;
  },
  'cancel-commitment': () => `
    <div class="secttl">Cancel Commitment</div>
    <div class="formgrid">
      ${ssFacilityField()}
      <div class="field"><label>Cancellation Type</label>
        <div class="radiogrp">
          <label class="radioopt"><input type="radio" name="ctype" value="partial" checked onclick="ssToggleCancelAmount(true)">Partial</label>
          <label class="radioopt"><input type="radio" name="ctype" value="full" onclick="ssToggleCancelAmount(false)">Full</label>
        </div>
      </div>
      <div class="field"><label>Cancellation Amount</label><input type="number" id="f_amount" min="1" step="500000"></div>
      <div class="field"><label>Effective Date</label><input type="date" id="f_date" min="${ssToday()}" required></div>
      <div class="field"><label>Reason</label><select><option>Reduced Funding Requirement</option><option>Refinanced Elsewhere</option><option>Covenant / Credit Driven</option><option>Other</option></select></div>
      <div class="field span2"><div class="checkrow"><input type="checkbox" id="f_confirm" required><span>I confirm the borrower has provided the contractual notice period required for this cancellation.</span></div></div>
    </div>`,
  'close-facility': () => `
    <div class="secttl">Close Facility</div>
    <div class="formgrid">
      ${ssFacilityField()}
      <div class="field"><label>Closure Date</label><input type="date" id="f_date" min="${ssToday()}" required></div>
      <div class="field"><label>Reason</label><select><option>Facility Matured / Repaid in Full</option><option>Refinanced</option><option>Cancelled by Borrower</option><option>Cancelled by Lender</option></select></div>
      <div class="field span2">
        <label>Closure Checklist</label>
        <div class="checkrow"><input type="checkbox" class="close-chk"><span>All drawings under this facility have been repaid in full</span></div>
      </div>
      <div class="field span2">
        <div class="checkrow"><input type="checkbox" class="close-chk"><span>All outstanding fees and interest have been settled</span></div>
      </div>
      <div class="field span2">
        <div class="checkrow"><input type="checkbox" class="close-chk"><span>Security and guarantees have been released / discharged</span></div>
      </div>
    </div>`
};

function ssCtxBannerHTML(){
  const fac = SS_FACILITIES[ssCtx.facility];
  const draw = SS_DRAWINGS[ssCtx.drawing];
  let html = `<div class="cb"><span class="l">Customer</span><span class="v">${ssCtx.customer}</span></div>`;
  if (fac){
    html += `<div class="cb"><span class="l">Facility</span><span class="v">${fac.name} (${ssCtx.facility})</span></div>`;
    html += `<div class="cb"><span class="l">Commitment</span><span class="v">${ssFmt(fac.commitment, ssCcySymbol(fac.ccy))}</span></div>`;
  }
  if (draw){
    html += `<div class="cb"><span class="l">Drawing</span><span class="v">${ssCtx.drawing}</span></div>`;
    html += `<div class="cb"><span class="l">Outstanding</span><span class="v">${ssFmt(draw.outstanding, ssCcySymbol(draw.ccy))}</span></div>`;
  }
  if (ssCtx.ref) html += `<div class="cb"><span class="l">Existing Ref</span><span class="v">${ssCtx.ref}</span></div>`;
  return html;
}

function ssUpdateNewTotal(cur){
  const inc = Number(document.getElementById('f_increase').value || 0);
  const fac = SS_FACILITIES[ssCtx.facility];
  document.getElementById('f_newtotal').value = ssFmt(cur + inc, fac ? ssCcySymbol(fac.ccy) : '£');
}
function ssToggleCancelAmount(enabled){
  const el = document.getElementById('f_amount');
  el.disabled = !enabled;
  if (!enabled) el.value = '';
}
function ssEvalCovenant(op, actual, th){
  return op === '<=' ? actual <= th : actual >= th;
}
function ssWireCovenantResult(root){
  const grid = root.querySelector('#covGrid');
  if (!grid) return;
  const inputs = grid.querySelectorAll('.cov-input');
  if (!inputs.length) return;
  const update = () => {
    let compliant = true;
    inputs.forEach(inp => { if (!ssEvalCovenant(inp.dataset.op, Number(inp.value), Number(inp.dataset.th))) compliant = false; });
    const res = root.querySelector('#covResult');
    res.textContent = compliant ? 'Compliant' : 'Breach Detected';
    res.className = 'st ' + (compliant ? 'st-a' : 'st-c');
  };
  inputs.forEach(inp => inp.addEventListener('input', update));
  update();
}
function ssValidate(formEl){
  const requiredEls = formEl.querySelectorAll('[required]');
  for (const el of requiredEls){
    if (el.type === 'checkbox' && !el.checked){ el.reportValidity(); return false; }
    if (el.type !== 'checkbox' && !el.value){ el.reportValidity(); return false; }
  }
  const closeChks = formEl.querySelectorAll('.close-chk');
  for (const c of closeChks){
    if (!c.checked){ alert('All closure checklist items must be confirmed before submitting.'); return false; }
  }
  return true;
}

/* ---- Right-side sheet ---- */
function ssEnsureSheetDom(){
  if (document.getElementById('svcSheetOverlay')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="sheet-overlay" id="svcSheetOverlay"></div>
    <div class="sheet-panel" id="svcSheetPanel">
      <div class="sheet-head">
        <span class="ttl" id="svcSheetTitle">Service Request</span>
        <button class="sheet-close" id="svcSheetCloseBtn" type="button">&#10005;</button>
      </div>
      <div class="sheet-body" id="svcSheetBody"></div>
      <div class="sheet-foot">
        <button class="btn" id="svcSheetCancelBtn" type="button">Cancel</button>
        <button class="btn btn-primary" id="svcSheetSubmit" type="button">Submit Request</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  document.getElementById('svcSheetOverlay').addEventListener('click', closeServiceSheet);
  document.getElementById('svcSheetCloseBtn').addEventListener('click', closeServiceSheet);
  document.getElementById('svcSheetCancelBtn').addEventListener('click', closeServiceSheet);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeServiceSheet(); });
}

function openServiceSheet(actionId, ctxObj){
  ssEnsureSheetDom();
  const panel = document.getElementById('svcSheetPanel');
  panel.style.width = '50vw';
  ssSetCtx(Object.assign({ action: actionId }, ctxObj || {}));
  const req = SS_REQUESTS.find(r => r.id === actionId);
  document.getElementById('svcSheetTitle').textContent = req ? req.label : 'Service Request';
  const body = document.getElementById('svcSheetBody');
  const formFn = SS_FORMS[actionId];
  body.innerHTML = `
    <div class="ctxbanner">${ssCtxBannerHTML()}</div>
    <div class="banner-success" id="svcSheetSuccess">
      <div class="bs-icon">&#10003;</div>
      <div><strong id="svcSheetSuccessTitle">Request submitted</strong><div id="svcSheetSuccessBody" style="margin-top:2px"></div></div>
    </div>
    <form id="svcSheetForm">${formFn ? formFn() : '<p class="hint">Unknown request type.</p>'}</form>`;
  ssWireCovenantResult(body);

  const submitBtn = document.getElementById('svcSheetSubmit');
  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit Request';
  submitBtn.onclick = () => {
    const form = document.getElementById('svcSheetForm');
    if (!ssValidate(form)) return;
    const ref = ssGenRef();
    document.getElementById('svcSheetSuccessTitle').textContent = `Request submitted — ${ref}`;
    document.getElementById('svcSheetSuccessBody').textContent = 'Routed to Credit Operations for review. You will be notified once actioned.';
    document.getElementById('svcSheetSuccess').classList.add('on');
    submitBtn.disabled = true;
    form.querySelectorAll('input,select,textarea,button').forEach(el => el.setAttribute('disabled', 'disabled'));
  };

  document.getElementById('svcSheetOverlay').classList.add('on');
  document.getElementById('svcSheetPanel').classList.add('on');

  const menu = document.getElementById('svcMenu');
  if (menu) menu.classList.remove('on');
}

function closeServiceSheet(){
  const overlay = document.getElementById('svcSheetOverlay');
  const panel = document.getElementById('svcSheetPanel');
  if (overlay) overlay.classList.remove('on');
  if (panel) panel.classList.remove('on');
  document.body.style.overflow = '';
}

/* ---- Top-bar dropdown triggers: "Service Action" menu + product switcher ---- */
function toggleSvcMenu(evt){
  evt.stopPropagation();
  const menu = document.getElementById('svcMenu');
  if (menu) menu.classList.toggle('on');
}
function toggleTitleMenu(evt){
  evt.stopPropagation();
  const menu = document.getElementById('titleMenu');
  if (menu) menu.classList.toggle('on');
}
document.addEventListener('click', (e) => {
  const svcMenu = document.getElementById('svcMenu');
  if (svcMenu && svcMenu.classList.contains('on') && !svcMenu.contains(e.target) && !e.target.closest('.svc-trigger')) {
    svcMenu.classList.remove('on');
  }
  const titleMenu = document.getElementById('titleMenu');
  if (titleMenu && titleMenu.classList.contains('on') && !titleMenu.contains(e.target) && !e.target.closest('.title-trigger')) {
    titleMenu.classList.remove('on');
  }
});

let isResizing = false;
document.addEventListener('mousedown', (e) => {
  const panel = document.getElementById('svcSheetPanel');
  if (!panel || !panel.classList.contains('on')) return;
  const rect = panel.getBoundingClientRect();
  const isNearLeftEdge = e.clientX <= (rect.left + 12);
  if (!isNearLeftEdge) return;
  isResizing = true;
  e.preventDefault();
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';

  const handleMouseMove = (e) => {
    if (!isResizing || !panel) return;
    const minWidth = 300;
    const maxWidth = window.innerWidth * 0.9;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      panel.style.width = newWidth + 'px';
    }
  };

  const handleMouseUp = () => {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});
