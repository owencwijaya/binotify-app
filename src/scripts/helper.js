const exceptionInCase = ["a", "as", "and", "of", "by", "dan", "atau", "dengan"]
const toTitleCase = (title)=>{
    let splitted = title.trim().split(' ');
    let ret = "";

    splitted.forEach((x)=>{
        if(x.length>0){
            ret += exceptionInCase.includes(x.toLowerCase()) ? x[0] : x[0].toUpperCase();

            if(x.length>1){
                ret+= x.slice(1) + " ";
            }else{
                ret+=" ";
            }
        }
    })

    return ret.slice(0,-1);
}


document.getElementById('audio').addEventListener('loadedmetadata', function() {
    let f_dur = 0;
    f_dur = document.getElementById('audio').duration;
    document.getElementById('f_dur').value = Math.round(f_dur);
});
document.getElementById('f_audio').addEventListener('change', function() {
    let file = this.files[0];
    if(!file.name.match(/\.(wav|mp3)/i)) {
        alert('Please select an audio file');
        return;
    }
    let audio = document.getElementById('audio');
    audio.src = URL.createObjectURL(file);
});