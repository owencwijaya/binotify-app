const createInfoRow = (item) =>{
    return `
    <a href="#" class="row">
        <img
            src="${item["image_path"]}"
            alt="row Image"
            class="row-img"
        />
        <h4 class="row-title">${item["judul"]}</h4>
        <div class="row-desc">
            <p class="row-artist">${item["penyanyi"]}</p>
            <div class="flex flex-row justify-between">
            <p class="row-genre">${item["genre"]}</p>
            </div>
        </div>
    </a>
    `;
}