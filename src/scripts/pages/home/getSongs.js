const getSongsCallback = (response) => {
  const res = JSON.parse(response);
  const songs = res.data;

  console.log(songs[0]);
  generateSongs(songs);
  console.log("finish generate");
};

const getSongs = () => {
  try {
    request("GET", "/api/songs/get_songs.php", null, getSongsCallback);
  } catch (error) {
    alert(error);
  }
};

getSongs();
