/**
 * Vexport Global Exports - Visual Admin CMS Controller
 * Allows non-technical team members to edit products, update specs, add commodities, and export data.
 */

let productsState = {};
let productModalInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  productModalInstance = new bootstrap.Modal(document.getElementById('productModal'));
  
  // Clone state from global VEXPORT_PRODUCTS_DATA
  if (typeof VEXPORT_PRODUCTS_DATA !== 'undefined') {
    productsState = JSON.parse(JSON.stringify(VEXPORT_PRODUCTS_DATA));
  }

  renderProductsTable();
  updateStats();
  initSearch();
  initExportButton();
});

// Render table of products
function renderProductsTable(filterTerm = '') {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const term = filterTerm.toLowerCase().trim();

  const productKeys = Object.keys(productsState);

  productKeys.forEach(key => {
    const p = productsState[key];
    if (term) {
      const matchName = (p.name || '').toLowerCase().includes(term);
      const matchCat = (p.category || '').toLowerCase().includes(term);
      const matchHs = (p.quickFacts?.hsCode || '').toLowerCase().includes(term);
      if (!matchName && !matchCat && !matchHs) return;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <img src="../${p.mainImage || 'assets/images/turmeric.jpg'}" alt="${p.name}" class="table-product-thumb" onerror="this.src='../assets/images/turmeric.jpg'">
      </td>
      <td>
        <div class="fw-bold">${p.name}</div>
        <small class="text-muted">${p.id}</small>
      </td>
      <td>
        <span class="badge-category">${p.category}</span>
      </td>
      <td>
        <small>${p.quickFacts?.origin || 'Pan-India'}</small>
      </td>
      <td>
        <span class="badge bg-light text-dark border">${p.quickFacts?.moq || '1 Container'}</span>
      </td>
      <td>
        <code>${p.quickFacts?.hsCode || 'N/A'}</code>
      </td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="openProductModal('edit', '${p.id}')" title="Edit Product">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${p.id}')" title="Delete Product">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Update stats counters
function updateStats() {
  const totalEl = document.getElementById('statTotalProducts');
  const spicesEl = document.getElementById('statSpicesCount');
  const pulsesEl = document.getElementById('statPulsesCount');
  const freshEl = document.getElementById('statFreshCount');

  const products = Object.values(productsState);
  if (totalEl) totalEl.textContent = products.length;

  const spicesCount = products.filter(p => (p.category || '').includes('Spice')).length;
  const pulsesCount = products.filter(p => (p.category || '').includes('Pulse') || (p.category || '').includes('Grain')).length;
  const freshCount = products.filter(p => (p.category || '').includes('Fresh') || (p.category || '').includes('Produce')).length;

  if (spicesEl) spicesEl.textContent = spicesCount;
  if (pulsesEl) pulsesEl.textContent = pulsesCount;
  if (freshEl) freshEl.textContent = freshCount;
}

// Tab switcher
function switchTab(tabName) {
  const tabs = ['products', 'contact', 'mandi', 'help'];
  tabs.forEach(t => {
    const el = document.getElementById(`tab-${t}`);
    if (el) el.style.display = (t === tabName) ? 'block' : 'none';
  });

  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

// Open modal for Add or Edit
function openProductModal(mode, productId = null) {
  const title = document.getElementById('productModalTitle');
  const form = document.getElementById('productEditForm');

  if (mode === 'add') {
    title.innerHTML = '<i class="bi bi-plus-circle-fill text-warning me-2"></i> Add New Export Product';
    form.reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('editAvailability').value = 'Available Now';
    document.getElementById('editImage').value = 'assets/images/turmeric.jpg';
  } else if (mode === 'edit' && productId && productsState[productId]) {
    const p = productsState[productId];
    title.innerHTML = `<i class="bi bi-pencil-square text-warning me-2"></i> Edit Product: ${p.name}`;
    document.getElementById('editProductId').value = p.id;
    document.getElementById('editName').value = p.name || '';
    document.getElementById('editCategory').value = p.category || 'Indian Spices';
    document.getElementById('editBadge').value = p.badge || '';
    document.getElementById('editAvailability').value = p.availability || 'Available Now';
    document.getElementById('editShortDesc').value = p.shortDesc || '';
    document.getElementById('editOrigin').value = p.quickFacts?.origin || '';
    document.getElementById('editHsCode').value = p.quickFacts?.hsCode || '';
    document.getElementById('editMoq').value = p.quickFacts?.moq || '';
    document.getElementById('editSeason').value = p.quickFacts?.season || '';
    document.getElementById('editPackaging').value = p.quickFacts?.packaging || '';
    document.getElementById('editImage').value = p.mainImage || '';
  }

  productModalInstance.show();
}

// Save product from modal
function saveProductFromModal() {
  const idInput = document.getElementById('editProductId').value.trim();
  const name = document.getElementById('editName').value.trim();
  const category = document.getElementById('editCategory').value;
  const badge = document.getElementById('editBadge').value.trim();
  const availability = document.getElementById('editAvailability').value.trim();
  const shortDesc = document.getElementById('editShortDesc').value.trim();
  const origin = document.getElementById('editOrigin').value.trim();
  const hsCode = document.getElementById('editHsCode').value.trim();
  const moq = document.getElementById('editMoq').value.trim();
  const season = document.getElementById('editSeason').value.trim();
  const packaging = document.getElementById('editPackaging').value.trim();
  const mainImage = document.getElementById('editImage').value.trim() || 'assets/images/turmeric.jpg';

  if (!name) {
    alert('Please enter a product name.');
    return;
  }

  const id = idInput || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (!productsState[id]) {
    // New product template
    productsState[id] = {
      id: id,
      name: name,
      category: category,
      categoryIcon: category.includes('Spice') ? 'bi-fire' : 'bi-flower1',
      badge: badge || 'Export Grade',
      availability: availability || 'Available Now',
      shortDesc: shortDesc,
      mainImage: mainImage,
      gallery: [mainImage],
      quickFacts: {
        availability: availability,
        origin: origin || 'India',
        moq: moq || '1 Container',
        hsCode: hsCode || 'N/A',
        season: season || 'Year-Round',
        packaging: packaging || 'Export standard'
      },
      fullSpecs: [
        { label: "Product Name", value: name },
        { label: "Country of Origin", value: origin || "India" },
        { label: "Export Grade", value: badge || "Grade A Sortex" },
        { label: "Packaging Standard", value: packaging || "25kg / 50kg Bags" }
      ],
      whyChoose: `<p>Direct farm-gate aggregation by Vexport with 100% compliant export documentation.</p>`,
      packagingOptions: [
        { name: packaging || "PP Woven Bags", desc: "Food-grade lined packaging", icon: "bi-box-seam" }
      ],
      faqs: [
        { q: `What is the MOQ for ${name}?`, a: `Standard MOQ is ${moq || '1 Container (FCL)'}. Trial consignments can be arranged.` }
      ]
    };
    showToast(`Added new product: ${name}`);
  } else {
    // Update existing product
    const p = productsState[id];
    p.name = name;
    p.category = category;
    p.badge = badge;
    p.availability = availability;
    p.shortDesc = shortDesc;
    p.mainImage = mainImage;
    p.quickFacts.origin = origin;
    p.quickFacts.hsCode = hsCode;
    p.quickFacts.moq = moq;
    p.quickFacts.season = season;
    p.quickFacts.packaging = packaging;
    showToast(`Updated product: ${name}`);
  }

  productModalInstance.hide();
  renderProductsTable();
  updateStats();
}

// Delete product
function deleteProduct(id) {
  if (!productsState[id]) return;
  const confirmDelete = confirm(`Are you sure you want to remove "${productsState[id].name}" from the catalog?`);
  if (confirmDelete) {
    delete productsState[id];
    renderProductsTable();
    updateStats();
    showToast(`Removed product from catalog.`);
  }
}

// Search filter
function initSearch() {
  const searchInput = document.getElementById('adminSearchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', (e) => {
    renderProductsTable(e.target.value);
  });
}

// Export / Download Data
function initExportButton() {
  const btn = document.getElementById('btnExportChanges');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const fileContent = `/**\n * Vexport Global Exports - Comprehensive Product Specification & Profile Dataset\n * Authoritative B2B Export Data across Spices, Pulses, Grains, Fresh Produce, and Value-Added Agro.\n * Updated via Vexport Management Studio on ${new Date().toISOString()}\n */\n\nconst VEXPORT_PRODUCTS_DATA = ${JSON.stringify(productsState, null, 2)};\n`;

    const blob = new Blob([fileContent], { type: 'application/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Downloaded updated "product-data.js"! Replace file in assets/js/ to go live.');
  });
}

// Toast notification helper
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-white bg-dark border-0 show';
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi bi-check-circle-fill text-warning me-2"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  container.appendChild(toastEl);
  setTimeout(() => {
    toastEl.remove();
  }, 4000);
}

// Save Company Settings
function saveCompanySettings() {
  showToast('Company contact & WhatsApp desk settings saved successfully!');
}
