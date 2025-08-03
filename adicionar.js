import { addProduct } from "./fetchAPI.js";

document.getElementById("add-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const productData = {
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        image: document.getElementById("image").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        inStock: document.getElementById("inStock").value === "true",
        rating: parseFloat(document.getElementById("rating").value),
    };  

    try {
        await addProduct(productData);
        alert("Produto adicionado com sucesso!");
        window.location.href = "home.html"; 
    } catch (error) {
        alert("Erro ao adicionar produto.");
        console.error(error);
    }
});
