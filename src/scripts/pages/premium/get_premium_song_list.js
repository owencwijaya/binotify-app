async function getPremiumSongList(user_id){
    const response = await fetch(
        `http://localhost:3000/user/${user_id}/songs`,
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