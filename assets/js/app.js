/**
 * VEXPORT.CO.IN - MASTER INTERACTIVE ENGINE
 * Brand: Vexport Global Exports | Domain: vexport.co.in
 * Responsibilities:
 *  - 3-Step Smart Produce Router
 *  - Dynamic Category & Subtab Filtering
 *  - Real-time Product Search & Live Counter
 *  - Technical Specification Modal Drawer
 *  - Slide-out Live Price Estimation Drawer
 *  - Smart WhatsApp Desk with Pre-filled Chips
 *  - Form Submissions & Interactive Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmartRouter();
  initSpiceSubtabs();
  initPulseSubtabs();
  initProductSearchAndFilter();
  initPriceDrawer();
  initWhatsAppDesk();
  initSpecModals();
  initFaqAccordion();
  initStatsCounters();
  initQuoteModal();
});

// --- 1. Mobile Menu Engine ---
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('vexNavMenu');
  
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'bi bi-x-lg';
    } else {
      icon.className = 'bi bi-list';
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.querySelector('i').className = 'bi bi-list';
    }
  });

  // Close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.querySelector('i').className = 'bi bi-list';
    });
  });
}

// --- 2. Cognitive Clarity 3-Step Smart Produce Router ---
const ROUTER_DATABASE = {
  spices: {
    title: "Premium Indian Spices (Whole & Ground)",
    status: "Export Lots Ready in Packhouse",
    specs: {
      "Primary Grades": "Sangli Turmeric (Curcumin 4.5%+), Malabar Pepper (550GL), Teja Chillies",
      "Standard Packaging": "25kg / 50kg Food-grade Poly-lined PP Bags or Multiwall Paper",
      "Container Capacity": "12 to 18 MT per 20ft / 40ft FCL Container",
      "Reefer / Dry Spec": "Dry Clean Ventilated Box (Moisture < 10% Controlled)"
    },
    defaultPort: "Jebel Ali Port (UAE)",
    transitTimes: {
      "jebel-ali": "3 - 5 Days from JNPT Nhava Sheva",
      "singapore": "6 - 8 Days from JNPT / Chennai",
      "rotterdam": "18 - 22 Days via Suez Reefer Route",
      "new-york": "24 - 28 Days with Direct BL",
      "dammam": "5 - 7 Days from West Coast India"
    }
  },
  pulses: {
    title: "Indian Pulses, Grains & Basmati Rice",
    status: "100% Sortex Cleaned & Fumigated",
    specs: {
      "Primary Grades": "1121 XXL Basmati, Kabuli Chickpeas (42-44 / 75-80), Red Lentils",
      "Standard Packaging": "25kg / 50kg Jute, PP Bags or Branded 5kg Pouches",
      "Container Capacity": "24 to 26 MT per 20ft FCL Container",
      "Reefer / Dry Spec": "Dry Container with Desiccant Silica Bags"
    },
    defaultPort: "Jebel Ali Port (UAE)",
    transitTimes: {
      "jebel-ali": "4 - 5 Days from Kandla / JNPT",
      "singapore": "7 - 9 Days from Port of Mundra",
      "rotterdam": "20 - 24 Days with Phytosanitary Cleared",
      "new-york": "26 - 30 Days Direct Call",
      "dammam": "6 - 8 Days"
    }
  },
  onions: {
    title: "Nashik Export Red Onions (Lasalgaon)",
    status: "Live Harvest Stock in Lasalgaon Mandi",
    specs: {
      "Primary Grades": "45mm - 55mm & 55mm+ Export Graded, Thin Neck, Deep Red",
      "Standard Packaging": "5kg, 10kg, 25kg, 50kg Red Ventilated Mesh Bags",
      "Container Capacity": "29 MT per 40ft High-Cube Reefer Container",
      "Reefer / Dry Spec": "+2°C to +4°C with 65-70% Humidity Management"
    },
    defaultPort: "Jebel Ali Port (UAE)",
    transitTimes: {
      "jebel-ali": "3 - 4 Days from JNPT Mumbai",
      "singapore": "6 - 7 Days",
      "rotterdam": "16 - 19 Days",
      "new-york": "22 - 25 Days",
      "dammam": "4 - 6 Days"
    }
  },
  fruits: {
    title: "Fresh Fruits (Bhagwa Pomegranate & Bananas)",
    status: "Cold-Chain Monitored Farm Aggregation",
    specs: {
      "Primary Grades": "Bhagwa (Deep Red Arils, 200g+), Cavendish G9 Bananas (Caliber 39-44)",
      "Standard Packaging": "3.5kg / 7kg / 13kg Corrugated CFB with Foam Pads & Punnets",
      "Container Capacity": "14 to 20 MT per 40ft Reefer",
      "Reefer / Dry Spec": "+6°C for Pomegranates / +13.5°C Controlled Atmosphere Bananas"
    },
    defaultPort: "Jebel Ali Port (UAE)",
    transitTimes: {
      "jebel-ali": "3 - 5 Days from JNPT",
      "singapore": "7 - 8 Days",
      "rotterdam": "18 - 21 Days Reefer",
      "new-york": "Air Shipment (24 - 48 Hours)",
      "dammam": "5 - 7 Days"
    }
  }
};

function initSmartRouter() {
  const chips = document.querySelectorAll('.router-chip-btn');
  const portSelect = document.getElementById('routerPortSelect');
  const resultTitle = document.getElementById('routerResultTitle');
  const resultStatus = document.getElementById('routerResultStatus');
  const resultSpecs = document.getElementById('routerResultSpecs');
  const resultCta = document.getElementById('routerResultCta');

  if (!chips.length || !portSelect || !resultTitle) return;

  let currentCategory = 'spices';

  function updateRouterView() {
    const data = ROUTER_DATABASE[currentCategory];
    if (!data) return;

    resultTitle.textContent = data.title;
    resultStatus.textContent = data.status;

    const selectedPort = portSelect.value || 'jebel-ali';
    const transit = data.transitTimes[selectedPort] || "3 - 5 Days from JNPT India";

    resultSpecs.innerHTML = `
      <div><strong>Primary Grades:</strong> ${data.specs["Primary Grades"]}</div>
      <div><strong>Standard Packaging:</strong> ${data.specs["Standard Packaging"]}</div>
      <div><strong>Container Capacity:</strong> ${data.specs["Container Capacity"]}</div>
      <div><strong>Transit Time to Port:</strong> ${transit}</div>
    `;

    const commodityThumb = document.getElementById('routerProduceThumb');
    const COMMODITY_IMAGES = {
      spices: "assets/images/turmeric.jpg",
      pulses: "assets/images/basmati-rice.jpg",
      onions: "assets/images/onion.jpg",
      fruits: "assets/images/pomegranate.jpg"
    };
    if (commodityThumb) {
      commodityThumb.src = COMMODITY_IMAGES[currentCategory] || 'assets/images/turmeric.jpg';
      commodityThumb.alt = data.title;
    }

    resultCta.onclick = () => {
      openPriceDrawerWithProduct(data.title);
    };
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.commodity;
      updateRouterView();
    });
  });

  portSelect.addEventListener('change', updateRouterView);

  // Initial populate
  updateRouterView();
}

// --- 3. Subtabs for Spices ---
function initSpiceSubtabs() {
  const tabs = document.querySelectorAll('#spiceTabs .subtab-btn');
  const cards = document.querySelectorAll('#spiceGrid .product-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.spiceType === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- 4. Subtabs for Pulses & Grains ---
function initPulseSubtabs() {
  const tabs = document.querySelectorAll('#pulseTabs .subtab-btn');
  const cards = document.querySelectorAll('#pulseGrid .product-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.pulseType === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- 5. Global Product Live Search & Unified Filter Engine ---
function initProductSearchAndFilter() {
  const searchInput = document.getElementById('globalProductSearch');
  const countDisplay = document.getElementById('filteredProductsCount');

  if (!searchInput) return;

  const allProductCards = document.querySelectorAll('.product-card');

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    allProductCards.forEach(card => {
      const title = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();
      const meta = (card.querySelector('.product-specs-table')?.textContent || '').toLowerCase();
      
      if (title.includes(term) || desc.includes(term) || meta.includes(term)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} verified export commodities`;
    }
  });
}

// --- 6. Slide-Out "Check Today's Price / Live Mandi Rate" Drawer ---
function initPriceDrawer() {
  const drawer = document.getElementById('priceDrawer');
  const backdrop = document.getElementById('priceDrawerBackdrop');
  const triggers = document.querySelectorAll('.js-open-price-drawer, .js-price-panel-trigger');
  const closeBtn = document.getElementById('priceDrawerClose');
  const form = document.getElementById('priceDrawerForm') || document.getElementById('priceRequestForm');
  let resultBox = document.getElementById('priceDrawerResult');

  if (!drawer || !backdrop) return;

  // Create result box dynamically if not present (e.g. on product-detail.html)
  if (!resultBox && drawer.querySelector('.drawer-body')) {
    resultBox = document.createElement('div');
    resultBox.id = 'priceDrawerResult';
    resultBox.style.display = 'none';
    drawer.querySelector('.drawer-body').appendChild(resultBox);
  }

  function openDrawer(prefillProduct = '') {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (prefillProduct && form) {
      const prodInput = form.querySelector('[name="product_name"]') || document.getElementById('drawerCommodityInput');
      if (prodInput) prodInput.value = prefillProduct;
    }
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openPriceDrawerWithProduct = (productName) => {
    openDrawer(productName);
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prod = btn.dataset.product || btn.getAttribute('data-product') || '';
      openDrawer(prod);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const prodInput = form.querySelector('[name="product_name"]') || document.getElementById('drawerCommodityInput');
      const prodName = prodInput ? prodInput.value : 'Indian Agricultural Produce';
      const destInput = form.querySelector('[name="destination_port"]') || form.querySelector('input[placeholder*="Jebel Ali"]');
      const destination = destInput ? destInput.value : 'Discharge Port';
      const nameInput = form.querySelector('[name="buyer_name"]') || form.querySelector('input[placeholder*="importer@"]');
      const buyerInfo = nameInput ? nameInput.value : 'Valued Importer';

      form.style.display = 'none';
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="text-align:center; padding: 1.5rem 0;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #DCFCE7; color: #166534; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1rem;">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <h4 style="color:#0A3622; margin-bottom: 0.5rem;">FOB/CIF Rate Estimate Prepared</h4>
            <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1.25rem;">
              Hello <strong>${buyerInfo}</strong>, our Export Desk has generated the current container indicative rates for <strong>${prodName}</strong> discharging at <strong>${destination}</strong>.
            </p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem; font-size: 0.84rem; text-align: left; margin-bottom: 1.5rem;">
              <div style="margin-bottom: 0.35rem;"><strong>Indicative Range:</strong> Real-time Mandi linked rate locked for 48 hrs</div>
              <div style="margin-bottom: 0.35rem;"><strong>Port of Loading:</strong> JNPT Nhava Sheva / Mundra Port</div>
              <div><strong>Documentation:</strong> Phytosanitary, Certificate of Origin, SGS Inspection ready.</div>
            </div>
            <a href="https://wa.me/918007003698?text=${encodeURIComponent(`Hi Vexport Team, I requested rates on vexport.co.in for ${prodName} to ${destination}. Please share commercial proforma invoice.`)}" target="_blank" class="btn btn-gold btn-full">
              <i class="bi bi-whatsapp"></i> Finalize Deal on WhatsApp
            </a>
          </div>
        `;
      }
    });
  }
}

// --- 7. Smart WhatsApp Floating Desk ---
function initWhatsAppDesk() {
  const trigger = document.getElementById('waFloatingBtn');
  const popup = document.getElementById('waPopupBox');
  const closeBtn = document.getElementById('waPopupClose');
  const chips = document.querySelectorAll('.wa-chip');

  if (!trigger || !popup) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !trigger.contains(e.target) && popup.classList.contains('active')) {
      popup.classList.remove('active');
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.dataset.msg;
      const targetUrl = `https://wa.me/918007003698?text=${encodeURIComponent(msg)}`;
      window.open(targetUrl, '_blank');
      popup.classList.remove('active');
    });
  });
}

// --- 8. Technical Specification Modal Drawer ---
const COMMODITY_SPEC_DATABASE = {
  "sangli-turmeric": {
    name: "Sangli Salem Turmeric (Finger & Powder)",
    hsCode: "0910 30 10 / 0910 30 20",
    origin: "Sangli, Maharashtra / Nizamabad, India",
    curcumin: "3.5% to 5.2% (Lab Certified by HPLC)",
    moisture: "Max 9.5%",
    foreignMatter: "Max 0.5% (Sortex Grade)",
    packaging: "25kg / 50kg Multi-layer Paper Bag or Poly-lined PP Woven Bag",
    moq: "1 Container (12 to 18 MT)",
    certifications: "Spices Board of India, APEDA, FSSAI, US FDA Compliant"
  },
  "malabar-black-pepper": {
    name: "Malabar Bold Black Peppercorns",
    hsCode: "0904 11 10",
    origin: "Idukki & Wayanad, Kerala, India",
    curcumin: "Density: 550 GL / 580 GL (Grade Garbled)",
    moisture: "Max 11.0%",
    foreignMatter: "Max 0.2% Machine Cleaned",
    packaging: "25kg / 50kg Heavy-duty Jute or Craft Paper Bags",
    moq: "Air: 1 MT / Sea: 1 x 20ft (15 MT)",
    certifications: "Spices Board of India, APEDA, ISO 9001:2015"
  },
  "alleppey-cardamom": {
    name: "Alleppey Green Extra Bold Cardamom (AGEB)",
    hsCode: "0908 31 10",
    origin: "Cardamom Hills, Kerala / Tamil Nadu, India",
    curcumin: "Diameter: 7mm, 8mm+ Extra Bold Pods",
    moisture: "Max 10.0%",
    foreignMatter: "Nil (Hand picked & graded)",
    packaging: "10kg / 25kg Master Cartons with Food-grade Poly Liners",
    moq: "Air: 500 kg / Sea: 2 MT",
    certifications: "Spices Board, AGMARK, FSSAI"
  },
  "teja-red-chilli": {
    name: "Guntur S17 Teja Hot Red Chilli",
    hsCode: "0904 21 10",
    origin: "Guntur, Andhra Pradesh / Warangal, India",
    curcumin: "Pungency: 75,000 to 100,000 SHU (Scoville)",
    moisture: "Max 10.0% to 11.0%",
    foreignMatter: "Max 1.0% (Available Stemless & With Stem)",
    packaging: "25kg / 50kg Gunny Bags or Pressed Bales",
    moq: "1 x 40ft High Cube Container (14 MT Bales / 12 MT Bags)",
    certifications: "Spices Board, APEDA, SGS Pre-shipment inspected"
  },
  "cumin-seeds": {
    name: "Indian Machine Cleaned Cumin Seeds (Jeera)",
    hsCode: "0909 31 29",
    origin: "Unjha, Gujarat / Rajasthan, India",
    curcumin: "Purity: 99.0% / 99.5% Sortex Cleaned",
    moisture: "Max 8.5%",
    foreignMatter: "Max 0.5%",
    packaging: "25kg / 50kg PP Bags or Eco Jute Bags",
    moq: "1 x 20ft Container (13 MT)",
    certifications: "Spices Board, FSSAI, US FDA Lab Tested"
  },
  "basmati-1121": {
    name: "1121 XXL Extra Long Basmati Rice (Steam & Golden Sella)",
    hsCode: "1006 30 20",
    origin: "Punjab & Haryana Basmati GI Belt, India",
    curcumin: "Average Grain Length (AGL): 8.35mm to 8.40mm+",
    moisture: "Max 12.0%",
    foreignMatter: "100% Sortex Cleaned, Chalky Grain < 1%",
    packaging: "5kg, 10kg, 20kg, 40kg, 50kg BOPP / Non-Woven / Jute Bags",
    moq: "1 x 20ft Container (25 to 26 MT)",
    certifications: "APEDA, FSSAI, Export Inspection Agency (EIA)"
  },
  "kabuli-chickpeas": {
    name: "Indian Jumbo Kabuli Chickpeas (Garbanzo Beans)",
    hsCode: "0713 20 00",
    origin: "Madhya Pradesh & Maharashtra, India",
    curcumin: "Count: 42-44, 44-46 & 75-80 Count / Ounce",
    moisture: "Max 10.0% to 11.0%",
    foreignMatter: "Max 0.2% Machine Cleaned & Machine Graded",
    packaging: "25kg / 50kg Poly-lined Woven Bags",
    moq: "1 x 20ft Container (24 MT)",
    certifications: "APEDA, FSSAI, Phytosanitary Certificate Issued"
  },
  "nashik-red-onion": {
    name: "Nashik Export Grade Red Onions",
    hsCode: "0703 10 19",
    origin: "Lasalgaon & Panchvati, Nashik, Maharashtra, India",
    curcumin: "Size: 45mm - 55mm / 55mm+ Uniform Sizing",
    moisture: "Air-cured with intact dark outer skins",
    foreignMatter: "Zero Soil / 100% Sorted Bulbs",
    packaging: "5kg, 10kg, 25kg, 50kg Red Mesh Ventilated Bags",
    moq: "1 x 40ft Reefer Container (29 MT)",
    certifications: "APEDA, FSSAI, DGFT, Plant Quarantine Issued"
  },
  "bhagwa-pomegranate": {
    name: "Bhagwa Fresh Pomegranates",
    hsCode: "0810 90 10",
    origin: "Solapur & Sangli, Maharashtra, India",
    curcumin: "Brix Sugar: 15° to 16° Brix / Deep Ruby Red Arils",
    moisture: "Fruit weight: 200g - 250g / 250g - 300g (Grade A)",
    foreignMatter: "Zero pesticide residue, Global G.A.P. compliant",
    packaging: "3.5kg / 4kg CFB Cartons with Plastic Punnets",
    moq: "1 x 40ft Reefer Container (12 to 14 MT)",
    certifications: "APEDA, Global G.A.P., FSSAI"
  }
};

function initSpecModals() {
  const backdrop = document.getElementById('specModalBackdrop');
  const modalBox = document.getElementById('specModalBox');
  const closeBtn = document.getElementById('specModalClose');
  const detailsBtns = document.querySelectorAll('.js-open-spec-modal');

  if (!backdrop) return;

  function openSpecModal(key) {
    const data = COMMODITY_SPEC_DATABASE[key] || COMMODITY_SPEC_DATABASE["sangli-turmeric"];
    const modalTitle = document.getElementById('modalCommodityTitle');
    const modalList = document.getElementById('modalSpecsList');
    const modalRfqBtn = document.getElementById('modalRfqBtn');

    if (modalTitle) modalTitle.textContent = data.name;

    if (modalList) {
      modalList.innerHTML = `
        <div class="modal-spec-item"><strong>HS Tariff Code</strong><span>${data.hsCode}</span></div>
        <div class="modal-spec-item"><strong>Sourcing Region</strong><span>${data.origin}</span></div>
        <div class="modal-spec-item"><strong>Grade & Active Spec</strong><span>${data.curcumin}</span></div>
        <div class="modal-spec-item"><strong>Moisture Content</strong><span>${data.moisture}</span></div>
        <div class="modal-spec-item"><strong>Purity / Foreign Matter</strong><span>${data.foreignMatter}</span></div>
        <div class="modal-spec-item"><strong>Export Packaging</strong><span>${data.packaging}</span></div>
        <div class="modal-spec-item"><strong>Minimum Order (MOQ)</strong><span>${data.moq}</span></div>
        <div class="modal-spec-item"><strong>Statutory Approvals</strong><span>${data.certifications}</span></div>
      `;
    }

    if (modalRfqBtn) {
      modalRfqBtn.onclick = () => {
        closeSpecModal();
        openPriceDrawerWithProduct(data.name);
      };
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSpecModal() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const specKey = btn.dataset.specKey || 'sangli-turmeric';
      openSpecModal(specKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSpecModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeSpecModal();
  });
}

// --- 9. FAQ Accordion Logic ---
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --- 10. Animated Counter Numbers ---
function initStatsCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      let count = 0;
      const step = Math.ceil(target / 40);

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = count;
        }
      }, 35);
    });
  }

  window.addEventListener('scroll', () => {
    if (animated) return;
    const statsSection = document.querySelector('.vex-stats-strip');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      animated = true;
      runCounters();
    }
  });
}

// --- 11. Quote Modal Logic ---
function initQuoteModal() {
  const quoteModal = document.getElementById('universalQuoteModal') || document.getElementById('quoteModal');
  const quoteBtns = document.querySelectorAll('.js-open-quote-modal, .js-pd-open-quote');
  const closeBtns = document.querySelectorAll('#quoteModalClose, .btn-close-white');

  if (!quoteModal) return;

  function openQuote(product = '') {
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (product) {
      const prodField = quoteModal.querySelector('[name="product_interest"]') || document.getElementById('modalProductInput');
      if (prodField) prodField.value = product;
    }
  }

  function closeQuote() {
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  quoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuote(btn.dataset.product || btn.getAttribute('data-product') || '');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeQuote);
  });

  quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) closeQuote();
  });

  // Handle form submission inside quote modal
  const form = quoteModal.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const prodField = quoteModal.querySelector('[name="product_interest"]') || document.getElementById('modalProductInput');
      const prodName = prodField ? prodField.value : 'Export Produce';
      alert(`Thank you! Your quotation request for ${prodName} has been received by Vexport. Our Export Desk will contact you via WhatsApp & Email within 12 hours.`);
      closeQuote();
    });
  }

  // Global Escape key to close any active modal or drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuote();
      const priceDrawer = document.getElementById('priceDrawer');
      const priceBackdrop = document.getElementById('priceDrawerBackdrop');
      if (priceDrawer && priceDrawer.classList.contains('active')) {
        priceDrawer.classList.remove('active');
        if (priceBackdrop) priceBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
      const specBackdrop = document.getElementById('specModalBackdrop');
      if (specBackdrop && specBackdrop.classList.contains('active')) {
        specBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}
