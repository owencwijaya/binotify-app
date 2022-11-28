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
    
            resp.data.forEach((item) => {

                content += `
                    <div class="row">
                        <p class="row-title">${item["judul"]}</p>
                    </div>
                `;
            });
            document.getElementById("pagination-content").innerHTML = content;
        },
        (err) => alert(err)
    )
}

// window.onload = 
// );