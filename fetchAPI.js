//GET

export async function fetchProducts(page) {
    const response = await fetch(`http://localhost:3000/products?_limit=9&_page=${page}`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return(data);
}

export async function fetchTotalCount() {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
        throw new Error("Erro ao buscar total de produtos.");
    }

    const data = await response.json();
    return data.length;
}



// Get by ID

export async function fetchProductsByID(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return(data);
}


//Patch

export async function patchProductsByID(id, data) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro ao editar produto: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// Delete

export async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar produto: ${response.status}`);
        }

        return alert("Produto removido com sucesso!")
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// POST
export async function addProduct(productData) {
    const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error("Erro ao adicionar produto.");
    }

    return await response.json();
}
