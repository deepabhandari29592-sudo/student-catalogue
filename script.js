const PRODUCTS = [
  {
    id: "bag-eco",
    name: "Eco-Friendly Bag",
    price: 149,
    description:
      "A reusable student-made bag designed for daily use. Durable, light, and easy to carry.",
    tags: ["Eco", "Handmade"],
    image: "assets/product-bag.png",
  },
  {
    id: "notebook",
    name: "Study Notebook (Template)",
    price: 79,
    description:
      "Placeholder product card. Replace this with your real notebook image and details later.",
    tags: ["Stationery"],
    image: null,
  },
  {
    id: "art-kit",
    name: "Art & Craft Kit (Template)",
    price: 199,
    description:
      "Placeholder product card. Add your craft kit photo and a short description when ready.",
    tags: ["Creative"],
    image: null,
  },
  {
    id: "water-bottle",
    name: "Steel Water Bottle (Template)",
    price: 249,
    description:
      "Placeholder product card. Update with a real product image and final pricing.",
    tags: ["Utility"],
    image: null,
  },
  {
    id: "bookmark",
    name: "Motivational Bookmarks (Template)",
    price: 39,
    description:
      "Placeholder product card. Add bookmark designs and details to showcase student creativity.",
    tags: ["Stationery"],
    image: null,
  },
  {
    id: "planter",
    name: "Mini Desk Planter (Template)",
    price: 129,
    description:
      "Placeholder product card. Add the planter image and a brief note on materials used.",
    tags: ["Green", "Decor"],
    image: null,
  },
];

function formatINR(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function matchesQuery(product, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const haystack = [
    product.name,
    product.description,
    ...(product.tags || []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

function createCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.setAttribute("role", "listitem");

  const media = document.createElement("div");
  media.className = "product-media";

  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";
    media.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.textContent = "Image Placeholder";
    media.appendChild(placeholder);
  }

  const body = document.createElement("div");
  body.className = "product-body";

  const top = document.createElement("div");
  top.className = "product-top";

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = formatINR(product.price);

  top.appendChild(name);
  top.appendChild(price);

  const desc = document.createElement("p");
  desc.className = "product-desc";
  desc.textContent = product.description;

  const tagsWrap = document.createElement("div");
  tagsWrap.className = "product-tags";

  (product.tags || []).forEach((t) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = t;
    tagsWrap.appendChild(tag);
  });

  body.appendChild(top);
  body.appendChild(desc);
  body.appendChild(tagsWrap);

  card.appendChild(media);
  card.appendChild(body);

  return card;
}

function renderProducts(products, { gridEl, hintEl }) {
  gridEl.innerHTML = "";

  if (!products.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No products found. Try a different search term.";
    gridEl.appendChild(empty);
  } else {
    products.forEach((p) => gridEl.appendChild(createCard(p)));
  }

  if (hintEl) {
    const total = PRODUCTS.length;
    const shown = products.length;
    hintEl.textContent =
      shown === total ? `Showing ${shown} products` : `Showing ${shown} of ${total} products`;
  }
}

function initCatalogue() {
  const gridEl = document.getElementById("productGrid");
  const inputEl = document.getElementById("searchInput");
  const hintEl = document.getElementById("resultsHint");

  if (!gridEl || !inputEl) return;

  renderProducts(PRODUCTS, { gridEl, hintEl });

  let rafId = null;
  inputEl.addEventListener("input", () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const filtered = PRODUCTS.filter((p) => matchesQuery(p, inputEl.value));
      renderProducts(filtered, { gridEl, hintEl });
    });
  });
}

document.addEventListener("DOMContentLoaded", initCatalogue);
