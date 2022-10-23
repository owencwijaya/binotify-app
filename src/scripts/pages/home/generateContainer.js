const generateContainer = (items, isAlbum) => {
  let content = "";
  if (items.length === 0) {
    content += `
        <div class="container-header">
          <h2 class="container-title font-bold">No Songs Found!</h2>
        </div>
    `;
  } else {
    content += `
        <div class="container-header">
          <h2 class="container-title font-bold">`;

    content += isAlbum ? "Albums" : "Songs";

    content += `</h2>
          <a href="#" class="font-normal">SEE ALL</a>
        </div>
        <div class="cards flex flex-row flex-wrap">
    `;
    items.forEach((item) => {
      content += createCards(item);
    });

    content += `</div>`;

    if (isAlbum) {
      document.getElementById("container-albums").innerHTML = content;
    } else {
      document.getElementById("container-songs").innerHTML = content;
    }
  }
};
