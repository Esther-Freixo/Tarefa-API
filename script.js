import {
    fetchProducts,
    fetchTotalCount,
    deleteProduct,
  } from "./fetchAPI.js";
  
  const cardContainer = document.querySelector(".cards");
  const nextPageBtn = document.querySelector(".nextPageBtn");
  const prevPageBtn = document.querySelector(".prevPageBtn");
  const pageNumbersContainer = document.getElementById("pageNumbers");
  
  let page = 1;
  const limit = 9;
  let totalPages = 1;
  
  const loadInfo = (data) => {
    cardContainer.innerHTML = "";
  
    for (let product of data) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("product-id", product.id);
  
      card.innerHTML = `
        <img src="./assets/Front view of a young lady in pajamas staying in bed.png" alt="${product.name}">
        <h2 class="rating">${product.rating}</h2>
        <img class="starIcon" src="./assets/Star 1.png" alt="Estrela">
        <button class="deleteBtn" data-id="${product.id}">
            <img src="./assets/Frame 427318297.png" alt="Deletar">
        </button>
        <a href="editar.html?id=${product.id}">
            <button class="editarBtn">
                <img src="./assets/Frame 427318298.png" alt="Editar">
            </button>
        </a>
        <h2 class="name">${product.name}</h2>
        <h3 class="category">${product.category}</h3>
        <p class="description">${product.description}</p>
        <h2 class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</h2>
      `;
  
      cardContainer.appendChild(card);
    }
  };
  
  function renderPageButtons() {
    pageNumbersContainer.innerHTML = "";
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-btn");
      if (i === page) btn.classList.add("active");
  
      btn.addEventListener("click", async () => {
        page = i;
        const data = await fetchProducts(page);
        loadInfo(data);
        renderPageButtons();
      });
  
      pageNumbersContainer.appendChild(btn);
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const total = await fetchTotalCount();
    totalPages = Math.ceil(total / limit);
  
    const data = await fetchProducts(page);
    loadInfo(data);
    renderPageButtons();
  });
  
  nextPageBtn.addEventListener("click", async () => {
    if (page < totalPages) {
      page += 1;
      const data = await fetchProducts(page);
      loadInfo(data);
      renderPageButtons();
    }
  });
  
  prevPageBtn.addEventListener("click", async () => {
    if (page > 1) {
      page -= 1;
      const data = await fetchProducts(page);
      loadInfo(data);
      renderPageButtons();
    }
  });

document.addEventListener("click", async (event) => {
    const deleteBtn = event.target.closest(".deleteBtn");
    if (!deleteBtn) return;

    const card = deleteBtn.closest(".card");
    const id = card.getAttribute("product-id");

    try {
        await deleteProduct(id);
        card.remove();
    } catch (error) {
        alert("Erro ao excluir produto.");
    }
});
