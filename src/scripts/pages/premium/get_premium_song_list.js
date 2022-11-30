async function getPremiumSongList(artist_id){
    const logged_user = localStorage.getItem("user_id");
    alert(logged_user);
    const response = await fetch(
        `http://localhost:3000/user/${artist_id}/songs?user_id=${logged_user}`,
        {
            method: 'GET',
            // mode: 'cors', 
            headers: {
                'Content-Type': 'application-json'
            }
        }
    )

    return response.json();
}

const redirectTo = (id) => {
    window.location = `song_list.html?song_id=${song_id}`
}

const setPlayer = ({index, judul, audio_path, raw_duration}) => {
    let pagination_contents = document.getElementById("pagination-content")
    let rows = pagination_contents.getElementsByClassName("premium-row")
    let player = document.getElementById("player")

    for (let i = 0; i < rows.length; i++){
        let row = rows[i]
        let play_btn = row.getElementsByClassName("play-btn-small")[0]
        if (index === i) {
            row.classList.add("active-play")
            if (player.paused) {
                play_btn.innerHTML = `<img src="assets/icons/pause.png" alt="pause" class="play-btn-small-icon" />`
            } else {
                play_btn.innerHTML = `<img src="assets/icons/play.png" alt="play" class="play-btn-small-icon" />`
            }
        } else {
            row.classList.remove("active-play")
            play_btn.innerHTML = `<img src="assets/icons/play.png" alt="play" class="play-btn-small-icon" />`
        }
    }

    if (document.getElementById("song-judul").innerHTML !== judul) {
        setFooter(judul, audio_path, raw_duration)
    }
    play_and_pause_premium(index)
}

const setFooter = (judul, audio_path, raw_duration) => {
    document.getElementById("song-judul").innerHTML = judul;
    document.getElementById("player").src = audio_path;
    let duration = getDuration(raw_duration);
    document.getElementById("duration").innerHTML = duration;
}

const loadPremiumSongs = () => {
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get("id")
    getPremiumSongList(user_id).then(
        (resp) => {
            console.log(resp.data)
            var content = ``;

            if (resp.status != 200){
                alert(resp.message);
                location.href = '/premium_artist.html'
            }

            resp.data.forEach((item, index) => {
                let {judul, artist, duration, audio_path} = item;
                content += `
                <div class="premium-row">
                    <div class="row-index">
                        <p class="row-index-p">${index+1}</p>
                        <button class="play-btn-small" onclick="setPlayer({'index': ${index}, 'judul': '${judul}', 'audio_path': '${audio_path}', 'raw_duration': '${duration}'})">
                            <img src="assets/icons/play.png" alt="play" class="play-btn-small-icon" />
                        </button>
                    </div>
                    <p class="row-title">${item["judul"]}</p>
                </div>
                `;
            });
            document.getElementById("pagination-content").innerHTML = content;
        },
        (err) => alert(err)
    )

    setFooter("Placeholder", "", 50)
}

// window.onload = 
// );