const openBtn = document.getElementById('openBurger');
const closeBtn = document.getElementById('closeBurger');
const menu = document.getElementById('mobMenu');
openBtn.addEventListener('click', () => menu.classList.add('open'));
closeBtn.addEventListener('click', () => menu.classList.remove('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const BOT_TOKEN = "8820461859:AAHVfvKC80hyjyiKDnVOBG0F_kcPIjFrfi4";
const CHAT_ID = -1003579180254;

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // отменяем перезагрузку страницы

  const name = document.getElementById("fname").value.trim();
  const phone = document.getElementById("fphone").value.trim();
  const address = document.getElementById("faddress").value.trim();
  const spec = document.getElementById("fspec").value;
  const comment = document.getElementById("fcomment").value.trim();

  const text = `
🏥 <b>Новая заявка</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📍 <b>Адрес:</b> ${address}
👨‍⚕️ <b>Специалист:</b> ${spec}
💬 <b>Комментарий:</b> ${comment || "—"}

🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}
  `.trim();

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Отправка...';

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });

    const data = await res.json();
    console.log("TG ответ:", data);

    if (data.ok) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Заявка отправлена!';
      btn.style.background = "#22c55e";
      document.getElementById("contactForm").reset();
    } else {
      throw new Error(data.description);
    }
  } catch (err) {
    console.error("Ошибка:", err);
    alert("Ошибка: " + err.message);
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Отправить заявку';
  }
});