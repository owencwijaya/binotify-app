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
        alert(res["message"]);
        return;
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
            var content = ``;
            var artistsList = [];
            try {
                const formData = new FormData();
                formData.append("session_id", getCookie("PHPSESSID") || "");
                request("POST", "/api/premium/get_subscribed_artists.php", formData, (data) => {
                    const res = JSON.parse(data);
                    if (res["status"] != 200){
                        alert(res["message"]);
                        console.log(res);
                        return;
                    }
                    artistsList = res.data;
                    

                    resp.data.forEach((item, index) => {

                        const isSubscribed = artistsList.includes(item["_id"])
                        content += `
                            <div class="premium-row flex flex-row justify-between">
                                <div class="flex flex-row items-center">
                                    <div class="row-index">
                                        <p>${index+1}</p>
                                    </div>
                                    <p class="row-title">${item["name"]}</p>
                                </div>
                                <div>
                                    <button class="btn-subs"
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
                            </div>
                            `;
                    });
                    document.getElementById("pagination-content").innerHTML = content;
                })
            } catch (err) {
                alert(err);
                return;
            }

            
            
        },
        (err) => alert(err)
    )
}

// window.onload = 
// );