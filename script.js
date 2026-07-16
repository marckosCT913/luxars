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
document.getElementById('sidebarClose').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
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

// ----- Init -----
renderGrid('featuredGrid', photographers.slice(0, 3));
renderGrid('catalogGrid', photographers);
initBlobButtons();
