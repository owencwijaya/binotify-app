const submit_album = (album_id) => {
  let formData = new FormData();
  let genre = toTitleCase(document.getElementById("genre").value);
  let judul = toTitleCase(document.getElementById("judul").value);
  let tanggal_terbit = toTitleCase(document.getElementById("tanggal_terbit").value);
  let image = document.getElementById("image").value;
  formData.append("session_id", getCookie("PHPSESSID") || "");
  formData.append("album_id", album_id);
  formData.append("judul", judul);
  formData.append("genre", genre);
  formData.append("tanggal_terbit", tanggal_terbit);

  !image ? formData.append("image", image) : formData.append("image", "");

  try{
    request("POST", "/api/admin/update_detail_album.php", formData, update_song_callback);
    return;
  } catch (error) {
    alert(error);
    console.log(error)
  }
};

const delete_song = (album_id) => {
  console.log("success delete song:", album_id);
  document.getElementById("song-detail").classList.remove("hidden");
  document.getElementById("edit-song").classList.add("hidden");
  document.getElementById("page-title").innerHTML = "Album Details";
};

const edit_song_callback = (response) => {
  const res = JSON.parse(response);
  const song = res.data;

  let content = `
    <form id="edit-song-form" class="flex flex-col" onsubmit="return false">
        <div class="edit-song-item flex flex-row items-center">
            <label for="judul" class="edit-song-label">Judul</label>
            <input type="text" name="judul" id="judul" class="edit-song-input" value="${song["judul"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="penyanyi" class="edit-song-label">Penyanyi</label>
            <input type="text" name="penyanyi" id="penyanyi" class="edit-song-input text-white" value="${song["penyanyi"]}" disabled />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="genre" class="edit-song-label">Genre</label>
            <input type="text" name="genre" id="genre" class="edit-song-input" value="${song["genre"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="tanggal_terbit" class="edit-song-label">Tanggal Terbit</label>
            <input type="date" name="tanggal_terbit" id="tanggal_terbit" class="edit-song-input" value="${song["tanggal_terbit"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="image" class="edit-song-img-label">Cover Photo</label>
            <input type="file" name="image" id="image" class="" />
        </div>
        <div class="edit-song-btns flex flex-row items-center">
            <button id="btn-submit-song" class="edit-song-btn" onclick="handle_update_album(${song["album_id"]})">Submit</button>
            <button id="btn-delete-song" class="edit-song-btn" onclick="delete_song(${song["album_id"]})">Delete</button>
        </div>
    </form>
  `;

  document.getElementById("edit-song").innerHTML = content;
  document.getElementById("page-title").innerHTML = "Edit Album";
};

const edit_album = (album_id) => {
  document.getElementById("song-detail").classList.add("hidden");
  document.getElementById("pagination-container").classList.add("hidden");
  document.getElementById("edit-song").classList.remove("hidden");
  try {
    const formData = new FormData();
    formData.append("album_id", album_id);
    request("POST", "/api/admin/get_album.php", formData, edit_song_callback);
  } catch (error) {
    alert(error);
  }
};

const handle_update_album = (album_id) => {
  setModal("Save Song", "Do you want to save your changes?", "Yes", "No");
  document.getElementById("modal-btn-primary").addEventListener("click", () => {
    submit_album(album_id);
  });
  document.getElementById("modal-btn-secondary").addEventListener("click", () => {
    close_modal();
  });
};

const close_modal = () => {
  document.getElementById("modal-container").classList.add("hidden");
};
