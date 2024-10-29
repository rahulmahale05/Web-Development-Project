let string = "";
let number = document.querySelectorAll("button");
let input = document.querySelector("input");

number.forEach(e => {
    e.addEventListener("click",(evt)=>{
        let a = evt.target.innerHTML;
        if(a=="="){
            try{
                string = eval(string);
                input.value=string;
            }
            catch(err){
                input.value="error";
                setTimeout(()=>{
                    input.value=string;
                },1000)
            }
        }
        else if(a=="%"){
            string=string+"*0.01*"
            input.value=string.slice(0,string.length-6)+"%";
        }
        else if(a=="AC"){
            string = "";
            input.value=string;
        }
        else if (a=="DEL"){
            console.log(string)
            string=string.slice(0,string.length-1);
            input.value=string;
        }
        else{
            string += a;
            input.value=string;
        }
    })
});
