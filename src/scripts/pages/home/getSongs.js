const getSongsCallback = (response) => {
  const res = JSON.parse(response);
  let songs = res.data;

  songs = songs.slice(0, 10);

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
