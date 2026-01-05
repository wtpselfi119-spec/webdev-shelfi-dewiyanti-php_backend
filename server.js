const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Route untuk memproses form (POST)
app.post('/submit', (req, res) => {
    const { nama, email, nomor, pesan } = req.body;
    const errors = [];

    // Validasi Nama - tidak boleh kosong
    if (!nama || nama.trim() === '') {
        errors.push('Nama tidak boleh kosong');
    }

    // Validasi Email - harus menggunakan @gmail.com atau @yahoo.com
    const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com)$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Email harus menggunakan @gmail.com atau @yahoo.com');
    }

    // Validasi Nomor - harus angka dan minimal 10 digit
    const nomorRegex = /^[0-9]{10,15}$/;
    if (!nomor || !nomorRegex.test(nomor)) {
        errors.push('Nomor harus berupa angka (10-15 digit)');
    }

    // Validasi Pesan - tidak boleh kosong
    if (!pesan || pesan.trim() === '') {
        errors.push('Pesan tidak boleh kosong');
    }

    // Jika ada error, kirim response error
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    // Jika validasi berhasil
    res.json({
        success: true,
        message: 'Data berhasil dikirim!',
        data: {
            nama: nama,
            email: email,
            nomor: nomor,
            pesan: pesan
        }
    });
});

// Route API untuk mendapatkan info server
app.get('/api/info', (req, res) => {
    res.json({
        status: 'Server Running',
        timestamp: new Date().toISOString(),
        serverName: 'Challenge Server',
        version: '1.0.0',
        endpoints: {
            home: '/',
            submit: '/submit (POST)',
            apiInfo: '/api/info (GET)',
            userData: '/api/user/:id (GET)'
        }
    });
});

// Route API untuk mendapatkan data user berdasarkan ID
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    
    // Simulasi database user
    const users = {
        '1': { id: 1, nama: 'Abdul Ghani', email: 'abdul@gmail.com', status: 'active' },
        '2': { id: 2, nama: 'Jumriani', email: 'jumri@yahoo.com', status: 'active' },
        '3': { id: 3, nama: 'Ahmad', email: 'ahmad@gmail.com', status: 'inactive' }
    };

    const user = users[userId];

    if (user) {
        res.json({
            success: true,
            data: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'User tidak ditemukan'
        });
    }
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});