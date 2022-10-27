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