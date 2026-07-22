/* ============================================================
   LUXARS — LIQUID GLASS SCRIPT
   ============================================================ */

// ----- Mock Data -----
const photographers = [
  {
    id: 1, name: "Sofía Ramírez", specialty: "Retratos", rating: 4.9, price: 180,
    avatar: "https://i.pravatar.cc/300?img=1",
    portfolio: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=400&fit=crop"
    ],
    bio: "Fotógrafa profesional especializada en retratos con más de 8 años de experiencia. Apasionada por capturar la esencia única de cada persona.",
    location: "Medellín", experience: "8 años", deliveries: "5-7 días hábiles"
  },
  {
    id: 2, name: "Mateo Giraldo", specialty: "Eventos", rating: 4.7, price: 250,
    avatar: "https://i.pravatar.cc/300?img=3",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&h=400&fit=crop"
    ],
    bio: "Especialista en cobertura de eventos sociales y corporativos. Cobertura en todo el Valle de Aburrá.",
    location: "Envigado", experience: "6 años", deliveries: "7-10 días hábiles"
  },
  {
    id: 3, name: "Valentina Orozco", specialty: "Moda", rating: 4.8, price: 320,
    avatar: "https://i.pravatar.cc/300?img=5",
    portfolio: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=400&fit=crop"
    ],
    bio: "Fotógrafa de moda y editorial. Trabajos publicados en revistas nacionales e internacionales.",
    location: "Medellín", experience: "10 años", deliveries: "3-5 días hábiles"
  },
  {
    id: 4, name: "Andrés Castaño", specialty: "Bodas", rating: 4.9, price: 450,
    avatar: "https://i.pravatar.cc/300?img=8",
    portfolio: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464054313797-e27fb58e90a9?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464695436052-e2b1e37de202?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1415183995122-d18d9e6c1f8b?w=500&h=400&fit=crop"
    ],
    bio: "Fotógrafo especializado en bodas. Narrativa visual con un estilo documental y romántico.",
    location: "Sabaneta", experience: "12 años", deliveries: "10-14 días hábiles"
  },
  {
    id: 5, name: "Camila Duque", specialty: "Producto", rating: 4.6, price: 150,
    avatar: "https://i.pravatar.cc/300?img=9",
    portfolio: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526948128577-703ee1aeb6c2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=400&fit=crop"
    ],
    bio: "Fotografía de producto y e-commerce. Imágenes que venden, con calidad profesional.",
    location: "Medellín", experience: "5 años", deliveries: "2-4 días hábiles"
  },
  {
    id: 6, name: "Felipe Restrepo", specialty: "Arquitectura", rating: 4.7, price: 200,
    avatar: "https://i.pravatar.cc/300?img=12",
    portfolio: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494526585158-c7b6e060f4b1?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop"
    ],
    bio: "Fotógrafo de arquitectura e interiores. Proyectos residenciales, comerciales y hoteleros.",
    location: "Bello", experience: "7 años", deliveries: "5-7 días hábiles"
  }
];

// ----- Render helpers -----
function createCard(photographer) {
  const hasPromo = photographer.id === 2 || photographer.id === 4 || photographer.id === 5;
  return `
    <article class="card photographer-card" data-id="${photographer.id}">
      ${hasPromo ? '<div class="promo-badge"></div>' : ''}
      <div class="card__img" style="background-image: url('${photographer.portfolio[0]}');"></div>
      <a href="#" class="card_link">
        <div class="card__img--hover" style="background-image: url('${photographer.portfolio[0]}');"></div>
      </a>
      <div class="card__info">
        <div class="card__info-header">
          <span class="card__category"><i class="fas fa-camera"></i> ${photographer.specialty}</span>
          <div class="card__rating">
            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(photographer.rating))}
            ${photographer.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
            <span>${photographer.rating}</span>
          </div>
        </div>
        <h3 class="card__title">${photographer.name}</h3>
        <div class="card__by">
          <span class="card__price">Desde $${photographer.price}.000 COP</span>
        </div>
        <div class="card__actions">
          <button class="btn btn-primary view-profile"><i class="fas fa-user"></i> Ver perfil</button>
          <button class="btn btn-outline book-now"><i class="fas fa-calendar-plus"></i> Reservar</button>
        </div>
      </div>
    </article>
  `;
}

// ----- Blob Button Initializer -----
function initBlobButtons() {
  document.querySelectorAll('.btn:not(.blob-initialized)').forEach(btn => {
    btn.classList.add('blob-initialized');
    const inner = btn.innerHTML;
    btn.innerHTML = `
      <span class="btn-text">${inner}</span>
      <span class="blob-btn__inner">
        <span class="blob-btn__blobs">
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
        </span>
      </span>
    `;
  });
}

function renderGrid(containerId, data) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = data.map(createCard).join('');
  initBlobButtons();
}

// ----- Navigation -----
const navLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navLinks');

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add('active');

  navLinks.forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`[data-page="${pageId}"]`).forEach(l => l.classList.add('active'));

  navList.classList.remove('open');
  hamburger.classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page === 'auth') {
      document.querySelector('.auth-tab[data-tab="login"]').click();
    }
    navigateTo(page);
  });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('open');
});

// ----- Search tags -----
document.querySelectorAll('.tag-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    document.getElementById('quickSearch').value = wrapper.dataset.filter;
    navigateTo('catalog');
    document.getElementById('filterSpecialty').value = wrapper.dataset.filter;
    applyFilters();
  });
});

document.getElementById('quickSearchBtn').addEventListener('click', () => {
  const val = document.getElementById('quickSearch').value.trim();
  if (val) navigateTo('catalog');
});

// ----- Catalog filters -----
function applyFilters() {
  const specialty = document.getElementById('filterSpecialty').value;
  const maxPrice = parseInt(document.getElementById('filterPrice').value);

  let filtered = photographers;
  if (specialty) filtered = filtered.filter(p => p.specialty === specialty);
  filtered = filtered.filter(p => p.price <= maxPrice);

  renderGrid('catalogGrid', filtered);
}

document.getElementById('applyFilters').addEventListener('click', applyFilters);

document.getElementById('filterPrice').addEventListener('input', function () {
  document.getElementById('priceValue').textContent = this.value;
});

// Sidebar toggle (mobile)
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('open');
});
// Close sidebar: X button or backdrop click
document.getElementById('sidebar').addEventListener('click', function (e) {
  if (e.target === this || e.target.closest('.sidebar-close')) {
    this.classList.remove('open');
  }
});

// ----- Profile view -----
document.addEventListener('click', e => {
  const card = e.target.closest('.photographer-card');
  if (!card) return;

  if (e.target.closest('.book-now')) {
    navigateTo('dashboard');
    return;
  }

  if (!e.target.closest('.view-profile')) return;

  const id = parseInt(card.dataset.id);
  const p = photographers.find(x => x.id === id);
  if (!p) return;

  const gallery = p.portfolio.map(url =>
    `<img src="${url}" alt="Portfolio" />`
  ).join('');

  document.getElementById('profileContent').innerHTML = `
    <div class="glass-card profile-header">
      <img class="avatar" src="${p.avatar}" alt="${p.name}" />
      <div class="info">
        <h1>${p.name}</h1>
        <div class="meta">
          <span><i class="fas fa-camera"></i> ${p.specialty}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${p.location}</span>
          <span><i class="fas fa-briefcase"></i> ${p.experience}</span>
          <span><i class="fas fa-star" style="color:#FF0000"></i> ${p.rating}</span>
        </div>
        <p style="color:var(--text-secondary);margin-top:8px;">${p.bio}</p>
      </div>
    </div>
    <div class="glass-card">
      <h3 style="margin-bottom:16px;"><i class="fas fa-images"></i> Portafolio</h3>
      <div class="profile-gallery">${gallery}</div>
    </div>
    <div class="glass-card profile-details">
      <div>
        <h3>Detalles del servicio</h3>
        <div class="detail-item"><h4>Precio desde</h4><p style="font-size:1.4rem;font-weight:700;color:#FF0000;">$${p.price}.000 COP</p></div>
        <div class="detail-item"><h4>Tiempo de entrega</h4><p>${p.deliveries}</p></div>
        <div class="detail-item"><h4>Ubicación</h4><p>${p.location}, Valle de Aburrá</p></div>
      </div>
      <div>
        <h3>Disponibilidad</h3>
        <div class="detail-item">
          <p style="color:var(--text-secondary);margin-bottom:12px;">Selecciona una fecha para verificar disponibilidad:</p>
          <input type="date" style="width:100%;padding:12px 16px;border-radius:var(--radius-sm);background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--text-primary);outline:none;" />
          <button class="btn btn-primary" style="margin-top:12px;width:100%;justify-content:center;" onclick="navigateTo('dashboard')">
            <i class="fas fa-calendar-check"></i> Solicitar reserva
          </button>
        </div>
      </div>
    </div>
  `;

  navigateTo('profile');
  initBlobButtons();
});

// Back button
document.getElementById('backToCatalog').addEventListener('click', () => {
  navigateTo('catalog');
  initBlobButtons();
});

// ----- Auth tabs -----
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(`auth-${tab.dataset.tab}`).classList.add('active');
  });
});

document.querySelectorAll('.auth-alt a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const tab = link.dataset.tab;
    document.querySelector(`.auth-tab[data-tab="${tab}"]`).click();
  });
});

// ----- Quote form -----
document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('✅ Solicitud de cotización enviada con éxito. El fotógrafo te contactará pronto.');
});

// ----- Scroll navbar effect -----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ----- Carousel auto-slide -----
(function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;
  const total = slides.length;
  let interval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + total) % total;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startAuto() { interval = setInterval(next, 4000); }
  function stopAuto() { clearInterval(interval); }

  // Pause on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();
})();

// ----- Booking System (Reservas Module) -----
const occupiedSlots = [
  { photographerId: 1, date: '2026-05-15', time: '14:00' },
  { photographerId: 3, date: '2026-05-20', time: '10:00' },
  { photographerId: 2, date: '2026-06-01', time: '16:00' }
];
let myReservations = [];
let pendingBooking = null;
let bookingIdCounter = 100;

function sanitizeInput(str) {
  if (!str) return '';
  return String(str).replace(/[<>"';&\\]/g, '').trim();
}

function detectSQLInjection(str) {
  const sqlPatterns = /('|--|;|\bDROP\b|\bDELETE\b|\bINSERT\b|\bUPDATE\b|\bUNION\b|\bSELECT\b|\bOR\b|\bAND\b|\bEXEC\b|\bxp_)/i;
  return sqlPatterns.test(str);
}

function initBookingSystem() {
  const sel = document.getElementById('bookPhotographer');
  if (!sel) return;
  photographers.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} — ${p.specialty} ($${p.price}.000/h)`;
    sel.appendChild(opt);
  });

  document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
  document.getElementById('btnConfirmPayment').addEventListener('click', handleConfirmPayment);
  document.getElementById('btnCancelPayment').addEventListener('click', () => {
    document.getElementById('paymentStep').style.display = 'none';
    document.getElementById('bookingForm').style.display = 'block';
  });
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const feedback = document.getElementById('bookingFeedback');
  feedback.className = 'booking-feedback';
  feedback.style.display = 'none';

  const photographerId = parseInt(document.getElementById('bookPhotographer').value);
  const dateStr = document.getElementById('bookDate').value;
  const timeStr = document.getElementById('bookTime').value;
  const eventType = document.getElementById('bookEventType').value;
  const location = document.getElementById('bookLocation').value;
  const notes = document.getElementById('bookNotes').value;

  // --- Validation ---

  // Required fields
  if (!photographerId || !dateStr || !timeStr || !eventType || !location) {
    feedback.textContent = '⚠️ Todos los campos obligatorios deben completarse.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // Sanitize inputs
  const sanitizedLocation = sanitizeInput(location);
  const sanitizedNotes = sanitizeInput(notes);

  // SQL Injection detection
  if (detectSQLInjection(sanitizedLocation) || detectSQLInjection(sanitizedNotes) || detectSQLInjection(eventType)) {
    feedback.textContent = '🚫 Datos inválidos detectados. Por favor ingresa información válida.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // Validate date/time format (no letters)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    feedback.textContent = '⚠️ La fecha contiene caracteres inválidos. Usa el formato AAAA-MM-DD.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }
  if (!timeRegex.test(timeStr)) {
    feedback.textContent = '⚠️ La hora contiene caracteres inválidos. Usa el formato HH:MM.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // Year validation: must be current year
  const currentYear = new Date().getFullYear();
  const year = parseInt(dateStr.split('-')[0]);
  if (year !== currentYear) {
    feedback.textContent = `⚠️ Solo se permiten reservas en el año actual (${currentYear}). El año ingresado es ${year}.`;
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  const selectedDate = new Date(dateStr + 'T' + timeStr);
  const now = new Date();

  // Past date validation
  if (selectedDate < now) {
    feedback.textContent = '⚠️ No puedes reservar una fecha u hora anterior al momento actual.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // Same date+time as current moment
  const diffMs = Math.abs(selectedDate - now);
  if (diffMs < 60000) {
    feedback.textContent = '⚠️ No puedes reservar para el mismo minuto en que realizas la reserva. Elige otro horario.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // CP001: Check availability (occupied slot)
  const isOccupied = occupiedSlots.some(s =>
    s.photographerId === photographerId && s.date === dateStr && s.time === timeStr
  );
  if (isOccupied) {
    feedback.textContent = '⚠️ Este horario ya no se encuentra disponible. Por favor selecciona otra fecha u horario.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // CP001: Check against own reservations
  const ownOccupied = myReservations.some(r =>
    r.photographerId === photographerId && r.date === dateStr && r.time === timeStr && r.status !== 'Cancelada'
  );
  if (ownOccupied) {
    feedback.textContent = '⚠️ Ya tienes una reserva activa en este horario con este fotógrafo.';
    feedback.className = 'booking-feedback error';
    feedback.style.display = 'block';
    return;
  }

  // All validations passed → proceed to payment (CP003)
  const photographer = photographers.find(p => p.id === photographerId);
  pendingBooking = {
    photographerId, photographerName: photographer.name,
    photographerAvatar: photographer.avatar, photographerSpecialty: photographer.specialty,
    date: dateStr, time: timeStr, eventType, location: sanitizedLocation,
    notes: sanitizedNotes, price: photographer.price
  };

  showPaymentStep(pendingBooking);
}

function showPaymentStep(booking) {
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('bookingFeedback').style.display = 'none';

  const details = document.getElementById('paymentDetails');
  details.innerHTML = `
    <div class="payment-detail-item"><span>Fotógrafo</span><span><strong>${booking.photographerName}</strong></span></div>
    <div class="payment-detail-item"><span>Servicio</span><span>${booking.eventType}</span></div>
    <div class="payment-detail-item"><span>Fecha</span><span>${booking.date}</span></div>
    <div class="payment-detail-item"><span>Hora</span><span>${booking.time}</span></div>
    <div class="payment-detail-item"><span>Ubicación</span><span>${booking.location}</span></div>
    <div class="payment-detail-item"><span>Notas</span><span>${booking.notes || '—'}</span></div>
    <div class="payment-detail-item" style="border-bottom:none;font-weight:700;">
      <span>Total</span><span style="color:var(--accent-red);font-size:1.1rem;">$${booking.price}.000 COP</span>
    </div>
  `;

  document.getElementById('paymentStep').style.display = 'block';
  document.getElementById('paymentStep').scrollIntoView({ behavior: 'smooth' });
}

function handleConfirmPayment() {
  if (!pendingBooking) return;
  const feedback = document.getElementById('bookingFeedback');

  bookingIdCounter++;
  const id = 'RES-' + bookingIdCounter;

  const reservation = {
    id,
    ...pendingBooking,
    status: 'Confirmada',
    createdAt: new Date().toISOString()
  };

  myReservations.unshift(reservation);

  // Block the slot
  occupiedSlots.push({
    photographerId: reservation.photographerId,
    date: reservation.date,
    time: reservation.time
  });

  document.getElementById('paymentStep').style.display = 'none';
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('bookingForm').reset();

  feedback.textContent = '✅ ¡Reserva confirmada con éxito! Revisa los detalles en "Mis reservas".';
  feedback.className = 'booking-feedback success';
  feedback.style.display = 'block';

  renderMyReservations();
  pendingBooking = null;

  feedback.scrollIntoView({ behavior: 'smooth' });
}

function renderMyReservations() {
  const container = document.getElementById('reservasListContainer');
  const stats = document.getElementById('reservasStatsMini');

  const active = myReservations.filter(r => r.status === 'Confirmada').length;
  const pending = myReservations.filter(r => r.status === 'Pendiente').length;
  const canceled = myReservations.filter(r => r.status === 'Cancelada').length;

  stats.innerHTML = `
    <span><strong>${active}</strong> Activas</span>
    <span><strong>${pending}</strong> Pendientes</span>
    <span><strong>${canceled}</strong> Canceladas</span>
  `;

  if (myReservations.length === 0) {
    container.innerHTML = `
      <div class="reservas-empty">
        <i class="fas fa-calendar"></i>
        <p>Aún no tienes reservas. Usa el formulario para agendar tu primera sesión.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = myReservations.map(r => {
    const statusClass = r.status === 'Confirmada' ? 'confirmed' : r.status === 'Cancelada' ? 'pending' : 'pending';
    return `
      <div class="reservas-item" data-res-id="${r.id}">
        <img src="${r.photographerAvatar}" alt="" />
        <div class="reservas-item-info">
          <strong>${r.photographerName}</strong>
          <span>${r.eventType} · ${r.date} a las ${r.time} · ${r.location}</span>
        </div>
        <span class="status-badge ${statusClass}">${r.status}</span>
        <div class="reservas-item-actions">
          ${r.status !== 'Cancelada' ? `<button class="btn-cancel" data-res-id="${r.id}">Cancelar</button>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // CP002: Cancel handler
  container.querySelectorAll('.btn-cancel').forEach(btn => {
    btn.addEventListener('click', function () {
      const resId = this.dataset.resId;
      const res = myReservations.find(r => r.id === resId);
      if (!res) return;

      if (!confirm('¿Estás seguro de cancelar esta reserva?')) return;

      res.status = 'Cancelada';

      // CP002: Free the slot in occupiedSlots
      const idx = occupiedSlots.findIndex(s =>
        s.photographerId === res.photographerId && s.date === res.date && s.time === res.time
      );
      if (idx !== -1) occupiedSlots.splice(idx, 1);

      renderMyReservations();
    });
  });
}
// ----- Upload System (Portafolio Module) -----
const UPLOAD_USERS = [
  { email: 'admin@luxars.com', pass: 'admin123', role: 'admin', name: 'Admin LuxArs' },
  { email: 'foto@luxars.com', pass: 'foto123', role: 'photographer', name: 'Fotógrafo Test' }
];
let uploadSession = null;
let selectedFile = null;

function initUploadSystem() {
  const btnUpload = document.getElementById('btnUploadImages');
  if (!btnUpload) return;

  // "Subir imágenes" → check auth
  btnUpload.addEventListener('click', () => {
    if (uploadSession) {
      openUploadModal();
    } else {
      document.getElementById('uploadAuthOverlay').style.display = 'flex';
    }
  });

  // "Nuevo proyecto" → same auth check
  document.getElementById('btnNewProject').addEventListener('click', () => {
    if (uploadSession) {
      openUploadModal();
    } else {
      document.getElementById('uploadAuthOverlay').style.display = 'flex';
    }
  });

  // Auth form submit
  document.getElementById('uploadAuthForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('uploadAuthEmail').value.trim();
    const pass = document.getElementById('uploadAuthPass').value.trim();
    const errorEl = document.getElementById('uploadAuthError');

    const user = UPLOAD_USERS.find(u => u.email === email && u.pass === pass);
    if (!user) {
      errorEl.textContent = '❌ Credenciales incorrectas. Solo administradores y fotógrafos pueden subir contenido.';
      errorEl.style.display = 'block';
      return;
    }

    uploadSession = user;
    errorEl.style.display = 'none';
    document.getElementById('uploadAuthOverlay').style.display = 'none';

    const status = document.getElementById('uploaderStatus');
    status.textContent = `✅ Sesión iniciada como ${user.name} (${user.role}).`;
    status.className = 'uploader-status success';
    status.style.display = 'block';
    setTimeout(() => { status.style.display = 'none'; }, 4000);

    openUploadModal();
  });

  // Close auth overlay
  document.getElementById('uploadAuthClose').addEventListener('click', () => {
    document.getElementById('uploadAuthOverlay').style.display = 'none';
  });
  document.getElementById('uploadAuthOverlay').addEventListener('click', function (e) {
    if (e.target === this) this.style.display = 'none';
  });

  // Modal controls
  document.getElementById('uploadModalClose').addEventListener('click', closeUploadModal);
  document.getElementById('uploadModalCancel').addEventListener('click', closeUploadModal);
  document.getElementById('uploadModalOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeUploadModal();
  });

  // Type selector
  document.querySelectorAll('.upload-type-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.upload-type-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedFile = null;
      document.getElementById('uploadFileName').style.display = 'none';
      document.getElementById('uploadPreview').style.display = 'none';

      const accept = this.dataset.type === 'imagen'
        ? 'image/jpeg,image/png,image/webp'
        : 'video/mp4,video/quicktime';
      document.getElementById('uploadFileInput').accept = accept;
    });
  });

  // Drop zone
  const dropzone = document.getElementById('uploadDropzone');
  const fileInput = document.getElementById('uploadFileInput');

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  });

  fileInput.addEventListener('change', function () {
    if (this.files[0]) handleFileSelect(this.files[0]);
  });

  // Submit
  document.getElementById('uploadSubmit').addEventListener('click', handleUploadSubmit);
}

function handleFileSelect(file) {
  const maxBytes = 50 * 1024 * 1024;
  if (file.size > maxBytes) {
    alert('El archivo supera el máximo de 50MB');
    return;
  }
  selectedFile = file;
  document.getElementById('uploadFileName').textContent = '📎 ' + file.name;
  document.getElementById('uploadFileName').style.display = 'block';

  // Preview
  const preview = document.getElementById('uploadPreview');
  const activeType = document.querySelector('.upload-type-btn.active');
  if (activeType && activeType.dataset.type === 'imagen' && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else if (activeType && activeType.dataset.type === 'video' && file.type.startsWith('video/')) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<video src="${e.target.result}" controls></video>`;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none';
  }
}

function openUploadModal() {
  document.getElementById('uploadTitle').value = '';
  document.getElementById('uploadDesc').value = '';
  document.getElementById('uploadTags').value = '';
  document.getElementById('uploadFileName').style.display = 'none';
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('uploadFeedback').style.display = 'none';
  selectedFile = null;
  document.getElementById('uploadModalOverlay').style.display = 'flex';
}

function closeUploadModal() {
  document.getElementById('uploadModalOverlay').style.display = 'none';
}

function handleUploadSubmit() {
  const feedback = document.getElementById('uploadFeedback');
  feedback.style.display = 'none';

  const title = document.getElementById('uploadTitle').value.trim();
  const desc = document.getElementById('uploadDesc').value.trim();
  const tagsStr = document.getElementById('uploadTags').value.trim();

  if (!title) {
    feedback.textContent = '⚠️ El título es obligatorio.';
    feedback.className = 'upload-feedback error';
    feedback.style.display = 'block';
    return;
  }

  if (!selectedFile) {
    feedback.textContent = '⚠️ Debes seleccionar un archivo.';
    feedback.className = 'upload-feedback error';
    feedback.style.display = 'block';
    return;
  }

  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
  const type = document.querySelector('.upload-type-btn.active')?.dataset?.type || 'imagen';

  // Simulate upload — add the uploaded item to the portfolio grid
  const reader = new FileReader();
  reader.onload = function (e) {
    const container = document.getElementById('uploadedItems');
    const imgUrl = type === 'imagen' ? e.target.result : 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop';
    const item = document.createElement('div');
    item.className = 'portfolio-item uploaded-item';
    item.innerHTML = `
      <img src="${imgUrl}" alt="${title}" />
      <div class="portfolio-overlay">
        <h4>${title}</h4>
        <span>${desc ? desc.substring(0, 30) + (desc.length > 30 ? '...' : '') : 'Subido recientemente'}</span>
      </div>
    `;
    container.appendChild(item);

    feedback.textContent = '✅ Contenido subido exitosamente al portafolio.';
    feedback.className = 'upload-feedback success';
    feedback.style.display = 'block';

    setTimeout(() => {
      closeUploadModal();
      feedback.style.display = 'none';
    }, 1500);
  };

  if (type === 'imagen') {
    reader.readAsDataURL(selectedFile);
  } else {
    // For video, use a placeholder image
    reader.onload({ target: { result: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop' } });
  }
}
renderGrid('featuredGrid', photographers.slice(0, 3));
renderGrid('catalogGrid', photographers);
renderGrid('fotografosGrid', photographers);
initBlobButtons();
initBookingSystem();
initUploadSystem();
