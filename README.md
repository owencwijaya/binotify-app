# Tubes 1 WBD

## Cara Menjalankan
1. Pastikan docker-compose dan docker sudah terpasang di perangkat Anda
2. Jalankan perintah berikut:
```
docker-compose down && docker-compose build && docker-compose up
```
3. Apabila proses _build_ berhasil,
- Website dapat diakses pada `localhost:8001`
- Adminer (phpMyAdmin) dapat diakses pada `localhost:8080`

Apabila ada konflik pada penomoran port, dapat diubah di file `docker-compose.yml`
