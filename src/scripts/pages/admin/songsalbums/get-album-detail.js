
const edit_admin = (album_id) => {
    try {
      let session_id = getCookie("PHPSESSID") || "";
      if (session_id) {
        const formData = new FormData();
        formData.append("session_id", session_id);
        request("POST", "/api/auth/check_admin.php", formData, (response) => {
          const res = JSON.parse(response);
          if (res["status"] === 200) {
            let content = document.getElementById("song-btn").innerHTML;
            content += `
                        <button id="btn-edit" class="song-btn flex flex-row items-center justify-center" onclick="edit_album(${album_id})">
                          <p class="song-btn-text text-white font-bold">Edit</p>
                          <img src="assets/icons/edit.png" alt="play" class="song-btn-img" />
                        </button>
                        `;
            document.getElementById("song-btn").innerHTML = content;
          }
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };

const set_album_detail_callback = (response) =>{
    const res = JSON.parse(response);
    const song = res.data;
    if(res.status==200){
        let content = `
        <div class="album-left flex justify-center">
          <img
          src="${song["image_path"]}"
          alt="song"
          class="album-img"
          />
        </div>
        <div class="song-right">
        <h2 class="song-title">${song["judul"]}</h2>
        <p class="song-artist">Artist : ${song["penyanyi"]}</p>
        <p class="song-genre">Genre : ${song["genre"]}</p>
        <p class="song-year">Total Durasi : ${ getDuration(song["total_duration"])}</p>
        <div id="song-btn" class="flex flex-row">
      </div>
    </div>
        `
        document.getElementById("song-detail").innerHTML = content;
        edit_admin(song["album_id"]);
    }else{
        alert(res.message)
    }
}



const set_song_details = () => {
  try {
    let id = new URLSearchParams(window.location.search).get("album_id");
    const formData = new FormData();
    formData.append("album_id", id);
    request(
      "POST",
      "/api/admin/get_album.php",
      formData,
      set_album_detail_callback
    );
  } catch (error) {
    alert(error);
  }
};

set_song_details();