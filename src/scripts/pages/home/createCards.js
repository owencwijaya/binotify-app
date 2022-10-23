/**
 *
 * @param {Array.<{song_id: int, judul: string, penyanyi: string, tanggal_terbit: date, genre: string, duration: int, audio_path: string, image_path: string, album_id: int}>} item
 */
const createCards = (item) => {
  let year = item["tanggal_terbit"].split("-")[0];
  return `
      <a href="#" class="card">
          <img
              src="${item["image_path"]}"
              alt="Card Image"
              class="card-img"
          />
          <h4 class="card-title">${item["judul"]}</h4>
          <div class="card-desc">
              <p class="card-artist">${item["penyanyi"]}</p>
              <div class="flex flex-row justify-between">
              <p class="card-genre">${item["genre"]}</p>
              <p class="card-year">${year}</p>
              </div>
          </div>
      </a>
      `;
};
