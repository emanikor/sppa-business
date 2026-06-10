/* ============================================
   SPPA Website — main.js
   ============================================ */

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form submit
function submitContact() {
  const name  = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const msg   = document.getElementById('cmsg').value.trim();

  if (!name)  { alert('Please enter your name.');    return; }
  if (!email) { alert('Please enter your email.');   return; }
  if (!msg)   { alert('Please enter your message.'); return; }

  alert('Thank you, ' + name + '! We will get back to you shortly.');
}
