const getAlbumsCallback = (response) => {
  const res = JSON.parse(response);
  const albums = res.data;

  generateContainer(albums, true);
};

const getAlbums= () => {
  try {
    const formData = new FormData();
    formData.append("session_id", getCookie("PHPSESSID") || "");
    
    request("POST", "/api/songs/get_albums.php", formData, getAlbumsCallback);
  } catch (error) {
    alert(error);
  }
};

