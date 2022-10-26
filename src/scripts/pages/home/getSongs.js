const getSongsCallback = (response) => {

  const res = JSON.parse(response);
  let songs = res.data;

  songs = songs.slice(0, 10);

  generateContainer(songs, false);
};

const getSongs = () => {
  try {
    const formData = new FormData();
    formData.append("session_id", getCookie("PHPSESSID") || "");

    request("POST", "/api/songs/get_songs.php", formData, getSongsCallback);
  } catch (error) {
    alert(error);
  }
};

