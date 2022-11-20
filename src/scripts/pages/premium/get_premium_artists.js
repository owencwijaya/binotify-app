async function getPremiumUsers(){
    const response = await fetch(
        'http://localhost:3000/user',
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
    window.location = `premium_song_list.html?id=${id}`

}

const loadPremiumUsers = () => {
    getPremiumUsers().then(
        (resp) => {
            console.log(resp.data)
            var content = ``;
    
            resp.data.forEach((item) => {
                // STUB: cek dulu dia udah subscribe ke user ini ato belum
                // nanti bikin endpoint php buat dapetin list yg dia subscreb siapa aja
                // ntar cocokin creator_id sama artist_id di sini
                // sekarang anggep udah subscreb semua dulu ya
                const isSubscribed = true
    
                content += `
                    <div class="row">
                        <p class="row-title">${item["name"]}</p>
                        <p class="row-p">${item["username"]}</p>
                        <p class="row-p">${item["email"]}</p>
                        <button
                            onclick =
                            ${
                                isSubscribed  ?
                                `redirectTo("${item["_id"]}");`
                                :
                                `() => {}` // subscreb. jgn lupa cek login dulu kalo mo subscreb
                            }
                        >
                            ${isSubscribed ? "Details" : "Subscribe"}
                        </button>
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