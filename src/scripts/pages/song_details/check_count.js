String.prototype.hashCode = function() {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

const checkBeforePlay = () => {
    try {
        request("POST", "/api/auth/check_login.php", null, checkCount);
    } catch (err) {
        alert(err);
    }
}

const checkCount = (data) => {
    const res = JSON.parse(data);

    if (res["status"] === 200){
        play_and_pause()
        document.getElementById("btn-play").onclick = () => play_and_pause();
        return;
    }

    const params = new URLSearchParams(window.location.search)
    const session_id = getCookie("PHPSESSID");
    const song_id = params.get("song_id").hashCode();
    const errMsg = `
    You have played a maximum of three songs.
    To continue listening, please sign up / log in, or wait for the next day 
    (you can still play the previous songs you've played!)`;

    if (localStorage.getItem("played_songs") === null){
        localStorage.setItem("played_songs", JSON.stringify(new Object()))
    }

    let playedSongs = JSON.parse(localStorage.getItem("played_songs"))
    len = Object.keys(playedSongs).length;

    now = new Date();

    if (localStorage.getItem("last_updated")=== null){
        localStorage.setItem("last_updated", now);
    }

    lastUpdated = localStorage.getItem("last_updated");
    lastUpdatedDate = new Date(lastUpdated);
    
    if (len === 3){
        let i = 1;
        for (i = 1; i < len + 1; i++){
            if (playedSongs[`song${i}`] == song_id){
                document.getElementById("playcount-info").innerHTML = "You can play this song again!"
                play_and_pause()
                document.getElementById("btn-play").onclick = () => play_and_pause();
                return;
            }
        }
        if (lastUpdatedDate.getDate() === now.getDate()){
            document.getElementById("btn-play").disabled = true;
            document.getElementById("playcount-info").innerHTML = errMsg
            alert(errMsg);
            return;
        }
        localStorage.setItem("played_songs", JSON.stringify(new Object()))
    }


    if (len < 3){
        let i = 1;
        if (len > 0){
            for (i = 1; i < len + 1; i++){
                if (playedSongs[`song${i}`] == song_id){
                    document.getElementById("playcount-info").innerHTML = "You can play this song again!"
                    break;
                }
            }
        } 

        playedSongs[`song${i}`] = song_id

        play_and_pause()
        document.getElementById("btn-play").onclick = () => play_and_pause();
        localStorage.setItem('played_songs', JSON.stringify(playedSongs));
        localStorage.setItem('last_updated', new Date());
        document.getElementById("playcount-info").innerHTML = `You have ${3 - (len + 1)} free song(s) left today!`

        return;
    }
}
