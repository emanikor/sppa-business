/* ============================================
   SPPA Donate Page — donate.js
   ============================================ */

let selectedAmount = 500;

// Select a preset amount
function selectAmount(btn, amount) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (amount > 0) {
    selectedAmount = amount;
    document.getElementById('customAmount').value = amount;
  } else {
    document.getElementById('customAmount').value = '';
    document.getElementById('customAmount').focus();
  }
  updateMpesaAmount();
}

// Keep M-Pesa amount in sync with input
document.getElementById('customAmount').addEventListener('input', function () {
  selectedAmount = parseInt(this.value) || 0;
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
  updateMpesaAmount();
});

function updateMpesaAmount() {
  const v = document.getElementById('customAmount').value;
  const el = document.getElementById('mpesa-amount');
  if (el) el.textContent = 'KSH ' + (parseInt(v) || 0).toLocaleString();
}

// Switch payment method tab
function switchPay(btn, method) {
  document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + method).classList.add('active');
}

// Auto-format card number: 1234 5678 9012 3456
function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(\d{4})/g, '$1 ').trim();
}

// Auto-format expiry: MM / YY
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2);
  input.value = v;
}

// Generate unique reference number
function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'SPPA-';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

// Submit donation
function submitDonation() {
  const fname  = document.getElementById('fname').value.trim();
  const email  = document.getElementById('email').value.trim();
  const phone  = document.getElementById('phone').value.trim();
  const amount = parseInt(document.getElementById('customAmount').value) || 0;

  if (!fname)     { alert('Please enter your first name.');       return; }
  if (!email)     { alert('Please enter your email address.');    return; }
  if (!phone)     { alert('Please enter your phone number.');     return; }
  if (amount < 1) { alert('Please enter a valid amount.');        return; }

  const ref = generateRef();
  document.getElementById('successRef').textContent = 'Ref: ' + ref;
  document.getElementById('successOverlay').classList.add('show');
}

// Close success overlay
document.getElementById('closeSuccess').addEventListener('click', function () {
  document.getElementById('successOverlay').classList.remove('show');
});
