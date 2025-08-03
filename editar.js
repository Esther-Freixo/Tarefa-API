import { fetchProductsByID, patchProductsByID } from "./fetchAPI.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const itemName = document.getElementById("edit-name");
const itemImg = document.getElementById("edit-image");
const itemDescri = document.getElementById("edit-description");
const itemPrice = document.getElementById("edit-price");
const itemCat = document.getElementById("edit-category");
const itemRating = document.getElementById("edit-rating");

document.addEventListener("DOMContentLoaded", async () => {
    const product = await fetchProductsByID(id);
    itemName.value = product.name;
    itemImg.value = product.image;
    itemDescri.value = product.description;
    itemPrice.value = product.price;
    itemCat.value = product.category;
    itemRating.value = product.rating;
});

document.getElementById("edit-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        name: itemName.value,
        image: itemImg.value,
        description: itemDescri.value,
        price: parseFloat(itemPrice.value),
        category: itemCat.value,
        rating: parseFloat(itemRating.value),
    };

    try {
        await patchProductsByID(id, data);
        alert("Produto atualizado com sucesso!");
        window.location.href = "index.html";
    } catch (err) {
        console.error(err);
        alert("Erro ao atualizar produto.");
    }
});
