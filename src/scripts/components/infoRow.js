const createInfoRow = (item, isAlbum, isForAlbumDetail = false, isAdmin = false) => {
  let content = "";
  if (!isAlbum) {
    content = `<div class = "row-container"><a href = "song_detail.html?song_id=${
      item["song_id"]
    }" class = "row ${isForAlbumDetail && isAdmin ? `row-album-detail` : ``}">`;
  } else {
    content = `<div class = "row-container">
    <a href = "album_detail.html?album_id=${
      item["album_id"]
    }" class = "row ${isForAlbumDetail && isAdmin ? `row-album-detail` : ``}">`;
  }
  return (
    content +
    `
        <div class="row-left">
        ${
          isForAlbumDetail
            ? ``
            : `

                <img
                    src="${item["image_path"]}"
                    alt="row Image"
                    class="row-img"
                />`
            }
            <h4 class="row-title">${item["judul"]}</h4>
          </div>
            <div class="row-desc">
                ${isForAlbumDetail ? `` : `<div class="row-p">${item["penyanyi"]}</div>`}
                <div class = "row-p">${item["genre"]}</div>
                <div class = "row-p">${item["year"]}</div>
                <div class = "row-p">${getDuration(item["duration"] || item["total_duration"])}</div>
            </div>
        </a>
        ${
          isForAlbumDetail && isAdmin
            ? `<button id="del-but" class="del-but" onclick="handle_delete_song_from_album(${item["song_id"]})">Delete</button>`
            : ``
        }
        </div>
        `
  );
};

const handle_delete_song_from_album = (song_id) => {
  setModal("Delete Song From Album", "Do you want to save your changes?", "Yes", "No");
  document.getElementById("modal-btn-primary").addEventListener("click", () => {
    deleteFromAlbum(song_id);
  });
  document.getElementById("modal-btn-secondary").addEventListener("click", () => {
    close_modal();
  });
};

const deleteFromAlbum = (song_id) => {
  let session_id = getCookie("PHPSESSID") || "";
  let form = new FormData();
  form.append("song_id", song_id);
  form.append("session_id", session_id);

  request("POST", "/api/album/delete_song_from_album.php", form, (response) => {
    const res = JSON.parse(response);
    if (res["status"] === 200) {
      alert("Song deleted from album");
      window.location.reload();
    } else {
      alert(res["message"]);
    }
  });
};
