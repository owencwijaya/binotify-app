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

const sendSubRequestCallback = (data) => {
    console.log(data)
    const res = JSON.parse(data)

    console.log(res);
    if (res["status"] !== 200){
        if (res["status"] === 403){
            alert("You must be logged in to subscribe!");
            location.href = "./login.html"
            return;
        }
    }

    alert("Successfully sent subscription request!");
}

const sendSubRequest = (id) => {
    try {
        const formData = new FormData();
        formData.append("session_id", getCookie("PHPSESSID") || "");
        formData.append("creator_id", id);
        request("POST", "/api/premium/send_sub_req.php", formData, sendSubRequestCallback);
        return;
    } catch (err) {
        alert(err);
    }
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
                const isSubscribed = false
    
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
                                `sendSubRequest("${item["_id"]}")` // subscreb. jgn lupa cek login dulu kalo mo subscreb
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