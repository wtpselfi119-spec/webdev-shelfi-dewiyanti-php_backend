document.getElementById('myForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const errorBox = document.getElementById('errorBox');
    const successBox = document.getElementById('successBox');

    // Hide previous messages
    errorBox.classList.add('hidden');
    successBox.classList.add('hidden');

    // Get form data
    const formData = {
        nama: document.getElementById('nama').value,
        email: document.getElementById('email').value,
        nomor: document.getElementById('nomor').value,
        pesan: document.getElementById('pesan').value
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            successBox.innerHTML = `
                <p>${result.message}</p>
                <p><strong>Data yang dikirim:</strong></p>
                <ul>
                    <li>Nama: ${result.data.nama}</li>
                    <li>Email: ${result.data.email}</li>
                    <li>Nomor: ${result.data.nomor}</li>
                    <li>Pesan: ${result.data.pesan}</li>
                </ul>
            `;
            successBox.classList.remove('hidden');

            // Reset form
            document.getElementById('myForm').reset();
        } else {
            // Show error messages
            errorBox.innerHTML = '<strong>Terjadi kesalahan:</strong><ul>';
            result.errors.forEach(error => {
                errorBox.innerHTML += `<li>${error}</li>`;
            });
            errorBox.innerHTML += '</ul>';
            errorBox.classList.remove('hidden');
        }
    } catch (error) {
        errorBox.innerHTML = '<strong>Error:</strong> Gagal mengirim data ke server';
        errorBox.classList.remove('hidden');
    }
});

// Function to test API
async function testAPI() {
    const apiResult = document.getElementById('apiResult');
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        apiResult.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResult.textContent = 'Error: ' + error.message;
    }
}

// Function to get user by ID
async function getUser(id) {
    const apiResult = document.getElementById('apiResult');
    try {
        const response = await fetch(`/api/user/${id}`);
        const data = await response.json();
        apiResult.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResult.textContent = 'Error: ' + error.message;
    }
}