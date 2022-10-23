const generateSongs = (songs) => {
  console.log("masuk generate");
  let content = "";
  if (songs.length === 0) {
    content += `
        <div class="container-header">
          <h2 class="container-title font-bold">No Songs Found!</h2>
        </div>
    `;
  } else {
    content += `
        <div class="container-header">
          <h2 class="container-title font-bold">Songs</h2>
          <a href="#" class="font-normal">SEE ALL</a>
        </div>
        <div class="cards flex flex-row">
    `;
    songs.forEach((song) => {
      content += createCards(song);
    });

    content += `</div>`;

    document.getElementById("container-songs").innerHTML = content;
  }
};
