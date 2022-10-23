const getAlbumsCallback = (response) => {
  const res = JSON.parse(response);
  const albums = res.data;

  generateContainer(albums, true);
};

const getSongs = () => {
  try {
    request("GET", "/api/songs/get_albums.php", null, getAlbumsCallback);
  } catch (error) {
    alert(error);
  }
};

getSongs();
