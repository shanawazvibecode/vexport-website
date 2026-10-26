/**
 * Vexport Global Exports - Dynamic Product Detail Page Controller
 * Powers full 11-section product profiles with interactive gallery, specs table, and RFQ triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Parse URL Parameter
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('product') || 'sangli-turmeric';

  // Fallback to sangli-turmeric if not found in data
  if (!VEXPORT_PRODUCTS_DATA[productId]) {
    productId = 'sangli-turmeric';
  }

  const p = VEXPORT_PRODUCTS_DATA[productId];

  // 2. Set Page Title & Meta
  document.title = `${p.name} | Vexport Global Agro & Spices Exports India`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${p.name} export supplier from India. Grade-A specifications, lab tested, custom packaging, MOQ: ${p.quickFacts.moq}. Request CIF/FOB container quote.`);
  }

  // 3. Render Breadcrumbs
  const breadcrumbCurrent = document.getElementById('pdBreadcrumbCurrent');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = p.name;

  // 4. Render Gallery & Thumbnails
  const mainImg = document.getElementById('pdMainImage');
  const mainImgLink = document.getElementById('pdMainImageLink');
  const thumbRow = document.getElementById('pdThumbRow');

  if (mainImg) {
    mainImg.src = p.mainImage;
    mainImg.alt = `${p.name} — Vexport Commercial Export Image`;
  }
  if (mainImgLink) {
    mainImgLink.href = p.mainImage;
  }

  if (thumbRow && p.gallery && p.gallery.length > 0) {
    thumbRow.innerHTML = '';
    p.gallery.forEach((imgSrc, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `pd-thumb ${idx === 0 ? 'active' : ''}`;
      thumb.setAttribute('data-full', imgSrc);
      thumb.innerHTML = `<img src="${imgSrc}" alt="${p.name} thumbnail ${idx + 1}" loading="lazy">`;
      
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImg) {
          mainImg.style.opacity = '0.4';
          setTimeout(() => {
            mainImg.src = imgSrc;
            mainImg.style.opacity = '1';
          }, 150);
        }
        if (mainImgLink) mainImgLink.href = imgSrc;
      });

      thumbRow.appendChild(thumb);
    });
  }

  // 5. Render Hero Info Panel
  const catBadge = document.getElementById('pdCategoryBadge');
  if (catBadge) {
    catBadge.innerHTML = `<i class="bi ${p.categoryIcon || 'bi-tag'}"></i> ${p.category}`;
  }

  const availBadge = document.getElementById('pdAvailBadge');
  if (availBadge) {
    availBadge.textContent = p.badge || p.availability;
  }

  const titleEl = document.getElementById('pdTitle');
  if (titleEl) titleEl.textContent = p.name;

  const descEl = document.getElementById('pdShortDesc');
  if (descEl) descEl.textContent = p.shortDesc;

  // 6. Quick Facts Grid
  const quickFactsGrid = document.getElementById('pdQuickFacts');
  if (quickFactsGrid && p.quickFacts) {
    quickFactsGrid.innerHTML = `
      <div class="fact-card"><i class="bi bi-patch-check-fill text-success"></i><div><strong>Availability</strong><span>${p.quickFacts.availability}</span></div></div>
      <div class="fact-card"><i class="bi bi-geo-alt-fill text-primary"></i><div><strong>Origin Belts</strong><span>${p.quickFacts.origin}</span></div></div>
      <div class="fact-card"><i class="bi bi-boxes text-warning"></i><div><strong>Container MOQ</strong><span>${p.quickFacts.moq}</span></div></div>
      <div class="fact-card"><i class="bi bi-upc-scan text-muted"></i><div><strong>Export HS Code</strong><span>${p.quickFacts.hsCode}</span></div></div>
      <div class="fact-card"><i class="bi bi-calendar3 text-info"></i><div><strong>Harvest Season</strong><span>${p.quickFacts.season}</span></div></div>
      <div class="fact-card"><i class="bi bi-box-seam-fill text-danger"></i><div><strong>Primary Packaging</strong><span>${p.quickFacts.packaging}</span></div></div>
    `;
  }

  // 7. Dynamic WhatsApp & Quote Buttons
  const waBtn = document.getElementById('pdWhatsAppBtn');
  const stickyWaBtn = document.getElementById('stickyWaBtn');
  const waMsg = encodeURIComponent(`Hello Vexport Team, I am an international buyer. I am looking to import a container shipment of ${p.name} (HS: ${p.quickFacts.hsCode}). Please share CIF/FOB pricing, specifications, and loading schedule.`);
  const waUrl = `https://wa.me/918007003698?text=${waMsg}`;

  if (waBtn) waBtn.href = waUrl;
  if (stickyWaBtn) stickyWaBtn.href = waUrl;

  const quoteBtns = document.querySelectorAll('.js-pd-open-quote');
  quoteBtns.forEach(btn => {
    btn.setAttribute('data-product', p.name);
  });

  const priceTrigger = document.querySelector('.js-price-panel-trigger');
  if (priceTrigger) {
    priceTrigger.setAttribute('data-product', p.name);
  }

  // 8. Full Technical Specification Table
  const specsTable = document.getElementById('pdSpecsTable');
  if (specsTable && p.fullSpecs) {
    specsTable.innerHTML = '';
    p.fullSpecs.forEach(spec => {
      const row = document.createElement('div');
      row.className = 'spec-row';
      row.innerHTML = `
        <div class="spec-label">${spec.label}</div>
        <div class="spec-value">${spec.value}</div>
      `;
      specsTable.appendChild(row);
    });
  }

  // 9. Why Buyers Choose Section
  const whyChooseTitle = document.getElementById('pdWhyChooseTitle');
  if (whyChooseTitle) whyChooseTitle.textContent = `Why Global Importers Choose Vexport ${p.name}`;

  const whyChooseBody = document.getElementById('pdWhyChooseBody');
  if (whyChooseBody && p.whyChoose) {
    whyChooseBody.innerHTML = p.whyChoose;
  }

  // 10. Packaging Options Grid
  const packGrid = document.getElementById('pdPackagingGrid');
  if (packGrid && p.packagingOptions) {
    packGrid.innerHTML = '';
    p.packagingOptions.forEach(opt => {
      const card = document.createElement('div');
      card.className = 'col-6 col-md-4 col-lg-3';
      card.innerHTML = `
        <div class="pack-card">
          <div class="pack-icon"><i class="bi ${opt.icon || 'bi-box-seam'}"></i></div>
          <h6>${opt.name}</h6>
          <p class="pack-sub">${opt.desc}</p>
        </div>
      `;
      packGrid.appendChild(card);
    });
  }

  // 11. Product Specific FAQs
  const faqList = document.getElementById('pdFaqList');
  if (faqList && p.faqs) {
    faqList.innerHTML = '';
    p.faqs.forEach((faq, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'accordion-item border rounded-3 mb-2 overflow-hidden';
      faqItem.innerHTML = `
        <h2 class="accordion-header" id="headingFaq${index}">
          <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFaq${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapseFaq${index}">
            <i class="bi bi-question-circle text-warning me-2"></i> ${faq.q}
          </button>
        </h2>
        <div id="collapseFaq${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="headingFaq${index}">
          <div class="accordion-body text-muted small lh-base">
            ${faq.a}
          </div>
        </div>
      `;
      faqList.appendChild(faqItem);
    });
  }

  // 12. Related Products Row
  const relatedRow = document.getElementById('pdRelatedRow');
  if (relatedRow && p.related) {
    relatedRow.innerHTML = '';
    p.related.forEach(relKey => {
      const rel = VEXPORT_PRODUCTS_DATA[relKey];
      if (rel) {
        const col = document.createElement('div');
        col.className = 'col-6 col-lg-3';
        col.innerHTML = `
          <div class="related-product-card">
            <div class="rel-img-wrap">
              <img src="${rel.mainImage}" alt="${rel.name}" loading="lazy">
              <span class="rel-badge">${rel.category}</span>
            </div>
            <div class="rel-body">
              <h6><a href="product-detail.html?product=${rel.id}">${rel.name}</a></h6>
              <div class="rel-origin"><i class="bi bi-geo-alt"></i> ${rel.quickFacts.origin.split('(')[0]}</div>
              <div class="rel-actions">
                <a href="product-detail.html?product=${rel.id}" class="btn-rel-view">View Details</a>
                <button type="button" class="btn-rel-quote js-open-quote-modal" data-product="${rel.name}">Quote</button>
              </div>
            </div>
          </div>
        `;
        relatedRow.appendChild(col);
      }
    });
  }

  // 13. Bottom CTA Banner
  const ctaTitle = document.getElementById('pdCtaTitle');
  if (ctaTitle) {
    ctaTitle.textContent = `Ready to Import India's Finest ${p.name}?`;
  }
  const ctaDesc = document.getElementById('pdCtaDesc');
  if (ctaDesc) {
    ctaDesc.textContent = `Direct farm aggregation, stringent Spices Board & APEDA quality compliance, and guaranteed cold-chain container dispatch from Nhava Sheva (JNPT) & Mundra ports.`;
  }
});
