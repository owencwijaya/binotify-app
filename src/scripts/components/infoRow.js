const createInfoRow = (item, isAlbum, isForAlbumDetail = false) =>{
    let content = ""

    if (!isAlbum) {
        content = `<a href = "song_detail.html?song_id=${item["song_id"]}" class = "row">`
    } else {
        content = `<a href = "album_detail.html?album_id=${item["album_id"]}" class = "row">`
    }
    return content + `
        ${isForAlbumDetail ? ``: `<img
            src="${item["image_path"]}"
            alt="row Image"
            class="row-img"
        />`}
        <h4 class="row-title">${item["judul"]}</h4>
        <div class="row-desc">
            ${isForAlbumDetail ? `` : `<div class="row-p">${item["penyanyi"]}</div>`}
            <div class = "row-p">${item["genre"]}</div>
            <div class = "row-p">${item["year"]}</div>
            <div class = "row-p">${getDuration(item["duration"] || item["total_duration"])}</div>
        </div>
    </a>
    `;
}