const getSongsCallback = (response) => {
  alert(response)
  const res = JSON.parse(response);
  const songs = res.data;

  generateContainer(songs, false);
};

const getSongs = () => {
  try {
    request("GET", "/api/songs/get_songs.php", null, getSongsCallback);
  } catch (error) {
    alert(error);
  }
};

getSongs();
