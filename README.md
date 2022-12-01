![src/assets/images/binotify.png](src/assets/images/binotify.png)
# BiNotify: Aplikasi Web Pemutar Lagu menggunakan _Monolithic PHP_ dan _Vanilla Web Application_
> Implementasi untuk Tugas Besar 1 dan 2 IF3110 Pengembangan Berbasis Web, Prodi Informatika ITB Tahun Ajaran 2022/2023


## Deskripsi
BiNotify adalah sebuah aplikasi pemutar lagu berbasis web yang dapat digunakan untuk memutar lagu, menambahkan lagu / album, serta melakukan perubahan data lagu / album yang terdaftar. Pengguna dapat memutar lagu yang terdaftar di BiNotify dengan mudah menggunakan UI yang simpel dan aplikasi yang berbasis web. Menggunakan hak admin, pengguna dapat melihat daftar pengguna lainnya dan menambahkan / menyunting lagu dan album.

![readme/home.png](readme/home.png)

BiNotify dibangun menggunakan bahasa pemrograman HTML, CSS, dan JavaScript di bagian _client side_, dan PHP di bagian _server side_. Komunikasi antara kedua pihak dilakukan dengan paradigma _request/response_ secara _asynchronous_ dengan perantara AJAX. Penanganan _state_ dilakukan menggunakan fitur `$_SESSION` dari bahasa PHP. 

## Daftar _Requirement_
Perangkat lunak yang dibutuhkan untuk bisa mengoperasikan BiNotify adalah:
- Docker versi 20.10.21, <a href = "https://docs.docker.com/engine/install/">*panduan instalasi* </a>
- Docker Compose versi 1.26.2, <a href = "https://docs.docker.com/compose/install/">*panduan instalasi* </a>
- _Operating system_ berbasis _WIndows 10_ atau _Linux Ubuntu 20.04_

Pengguna juga harus melakukan _setup_ terkait repo berikut:
1. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-config">BiNotify Config</a>, untuk mengakses database utama (**wajib** untuk penggunaan umum)
2. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-soap">BiNotify SOAP</a>, _SOAP server_ untuk melakukan pemeriksaan _subscription_
3. <a href = "https://gitlab.informatika.org/if3110-2022-k01-02-11/binotify-rest>">BiNotify REST</a>, _REST server_ untuk mendapatkan daftar pengguna 
## Instalasi dan Pemakaian
1. Lakukan _fork_ terhadap _repository_ ini dan ketiga _repository_ di atas
2. Lakukan urutan menjalankan konfigurasi _Docker_ mengikuti urutan: **BiNotify Config -> BiNotify SOAP -> BiNotify REST**
> - Pada _root folder_ tiap _repository_ di _local computer_ anda, lakukan perintah
```
docker-compose down && docker-compose build && docker-compose up
```
> - Detail lebih lanjut dapat dilihat pada README.md masing-masing _repository_
3. Untuk _BiNotify App_, instalasi dapat digunakan menggunakan perintah `docker-compose` seperti berikut:
```
docker-compose down && docker-compose build && docker-compose up
```

Apabila proses instalasi berhasil,
- Aplikasi dapat diakses pada `http://localhost:8001`, dengan login dilakukan pada `http://localhost:8001/login.html` dengan kredensial berikut:
```
-- untuk user biasa
Username: user01
Password: dummy

-- untuk user admin
Username: admin
Password: admin
```

- Adminer (antarmuka basis data) dapat diakses pada `http://localhost:8080` dengan kredensial berikut:
```
Server: db-binotify
Username: root
Password: root
Database: binotify-app
```
**[IMPORTANT]** Pastikan _repository_ BiNotify Config sudah dijalankan!

Apabila proses instalasi tidak berhasil karena _port_ yang digunakan sedang digunakan untuk proses lain, _port_ dapat diganti pada konfigurasi `docker-compose.yml`

## _Screenshot_
### Halaman _Home_
![readme/home.png](readme/home.png)

### Halaman Daftar Lagu (_Search, Sort, dan Filter_)
(Kasus melakukan pencarian pada lagu yang dinyanyikan Tulus dengan genre Melancholic diurutkan berdasarkan nama lagu secara menurun dari alfabet besar ke kecil)

![readme/song_list.png](readme/song_list.png)

### Halaman Daftar Album
![readme/album_list.png](readme/album_list.png)

### Halaman Detail Lagu
(Kasus admin, dapat melakukan editing)

![readme/song_detail.png](readme/song_detail.png)

### Halaman Detail Album 
(Kasus admin, dapat melakukan editing)

![readme/album_detail.png](readme/album_detail.png)

### Halaman Register
![readme/register.png](readme/register.png)

### Halaman Login
![readme/login.png](readme/login.png)

### Halaman Tambah Lagu (Admin)
![readme/add_song.png](readme/add_song.png)

### Halaman Tambah Album (Admin)
![readme/add_album.png](readme/add_album.png)

### Halaman Daftar User (Admin)
![readme/user_list.png](readme/user_list.png)

### Opsi Edit Lagu / Album (Admin)
(dijadikan satu kasus karena layouting yang sama)

![readme/edit_song.png](readme/edit_song.png)

### Halaman Daftar Artis Premium

![readme/premi_artists.png](readme/premi_artists.png)
### Halaman Daftar Lagu Premium

![readme/premi_songlist.png](readme/premi_songlist.png)




## Pembagian Tugas
Secara umum, pembagian tugas dilakukan dengan setiap anggota melakukan pengembangan di _server side_ maupun _client side_ berdasarkan _groundwork_ yang sudah dibuat. Pengecualian terkhusus pada pembuatan komponen _reusable_ dan CSS yang digunakan bersama. 

Legenda NIM adalah sebagai berikut:
- 13520043: Muhammad Risqi Firdaus
- 13520117: Hafidz Nur Rahman Ghozali
- 13520124: Owen Christian Wijaya
### Server Side
- Halaman Login + Register: 13520124
- Halaman Home + Navbar: 13520117
- Halaman Daftar Lagu + Pagination + Search/Sort/Filter: 13520124
- Halaman Daftar Album: 13520124
- Halaman Detail Lagu + Player Lagu: 13520117
- Halaman Detail Album: 13520043
- Halaman Tambah Lagu: 13520043
- Halaman Tambah Album: 13520043
- Halaman Daftar User: 13520124
- Halaman Daftar Artis Premium: 13520117, 13520124
- Halaman Daftar Lagu Premium per Artis: 13520117, 13520124

### Client Side
- Halaman Login + Register: 13520124
- Halaman Home + Navbar: 13520117
- Halaman Daftar Lagu + Pagination + Search/Sort/Filter: 13520117, 13520124
- Halaman Daftar Album: 13520117, 13520124
- Halaman Detail Lagu + Player Lagu: 13520117
- Halaman Detail Album: 13520043
- Halaman Tambah Lagu: 13520043
- Halaman Tambah Album: 13520043
- Halaman Daftar User: 13520117, 13520124
- Halaman Daftar Artis Premium: 13520117, 13520124
- Halaman Daftar Lagu Premium per Artis: 13520117, 13520124


