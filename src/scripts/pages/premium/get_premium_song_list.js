async function getPremiumSongList(artist_id){
    const logged_user = sessionStorage.getItem("user_id");
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
    console.log("Set song", index)
    setFooter(judul, audio_path, raw_duration)
    play_and_pause_premium(index)
}

const setFooter = (judul, audio_path, raw_duration) => {
    document.getElementById("song-judul").innerHTML = judul;
    let player = `<source src="${audio_path}" />`;
    document.getElementById("player").innerHTML = player;
    let duration = getDuration(raw_duration);
    document.getElementById("duration").innerHTML = duration;
}

const loadPremiumSongs = () => {
    // const params = new URLSearchParams(window.location.search);
    // const user_id = params.get("id")
    // getPremiumSongList(user_id).then(
    //     (resp) => {
    //         console.log(resp.data)
    //         var content = ``;

    //         if (resp.status != 200){
    //             alert(resp.message);
    //             location.href = '/premium_artist.html'
    //         }
    
    //         resp.data.forEach((item) => {

    //             content += `
    //                 <div class="row">
    //                     <button>
    //                         <img src="assets/icons/play.png" alt="play" class="song-btn-img" />
    //                     </button>
    //                     <p class="row-title">${item["judul"]}</p>
    //                 </div>
    //             `;
    //         });
    //         document.getElementById("pagination-content").innerHTML = content;
    //     },
    //     (err) => alert(err)
    // )
    let songs = [
        {
            "judul": "Lagu 1",
            "artist": "Artist 1",
            "duration" : 180,
            "audio_path": "https://firebasestorage.googleapis.com/v0/b/binotify-premium.appspot.com/o/files%2FKunto%20Aji%20-%20Rehat.mp3?alt=media&token=c73b8160-82e4-40cd-b40c-7fea073ed133"
        },
        {
            "judul": "Lagu 2",
            "artist": "Artist 1",
            "duration" : 180,
            "audio_path": "https://firebasestorage.googleapis.com/v0/b/binotify-premium.appspot.com/o/files%2FKunto%20Aji%20-%20Rehat.mp3?alt=media&token=c73b8160-82e4-40cd-b40c-7fea073ed133"
        },
        {
            "judul": "Baru",
            "artist": "Artist 1",
            "duration" : 180,
            "audio_path": "../../../assets/songs/Baru.mp3"
        },
    ]
    let content = ``;
    songs.forEach((item, index) => {
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
    })
    document.getElementById("pagination-content").innerHTML = content;
    setFooter("Placeholder", "", 50)
}

// window.onload = 
// );