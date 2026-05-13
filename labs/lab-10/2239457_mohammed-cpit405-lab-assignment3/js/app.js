/*
 * Student ID: 2239457
 * Student Name: Mohammed Rashid Alharbi
 * Course: CPIT-405
 * Lab: 10
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    const form = document.getElementById('addProductForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent standard form submission
        
        const formData = new FormData(this);
        const messageDiv = document.getElementById('formMessage');

        fetch('../controllers/ProductController.php?action=add', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                messageDiv.innerHTML = `<span class="success">${data.message}</span>`;
                form.reset();
                fetchProducts(); // Refresh list dynamically
            } else {
                messageDiv.innerHTML = `<span class="error">${data.message}</span>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.innerHTML = `<span class="error">An error occurred while adding the product.</span>`;
        });
    });
});

function fetchProducts() {
    fetch('../controllers/ProductController.php?action=list')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                renderProducts(data.data);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

function renderProducts(products) {
    const listDiv = document.getElementById('productList');
    listDiv.innerHTML = ''; // Clear current list

    if (products.length === 0) {
        listDiv.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const imageHtml = product.image_path ? `<img src="../views/${product.image_path}" alt="${product.name}">` : '<div style="height:150px; background:#eee; display:flex; align-items:center; justify-content:center; border-radius:4px; margin-bottom:10px;">No Image</div>';
        
        card.innerHTML = `
            ${imageHtml}
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
        `;
        listDiv.appendChild(card);
    });
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const formData = new FormData();
    formData.append('id', id);

    fetch('../controllers/ProductController.php?action=delete', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            fetchProducts(); // Refresh list
        } else {
            alert('Failed to delete product: ' + data.message);
        }
    })
    .catch(error => console.error('Error deleting product:', error));
}
