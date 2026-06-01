let input = document.getElementById("text");
let heading = document.getElementById("heading");
let changeTxtBtn = document.getElementById("changeHeading");
let toggleBtn = document.getElementById("toggleBtn");
let changeColorBtn = document.getElementById("changeColor");
let increaseFontBtn = document.getElementById("fontIncrease");
let resetBtn = document.getElementById("reset");
let para = document.getElementById("para");

changeTxtBtn.addEventListener("click", () => {
    console.log("Clicked");
    let text = input.value;
    heading.innerHTML= text;
});
toggleBtn.addEventListener("click",()=>{
    if(para.style.display=='block'){
        para.style.display='none';
    }
    else{
        para.style.display='block';
    }
})
let size=16;
increaseFontBtn.addEventListener("click",()=>{
    size++
    para.style.fontSize=size+'px';
})
resetBtn.addEventListener("click",()=>{
     heading.innerHTML = "Welcome to JavaScript Lab";
    document.body.style.backgroundColor = "white";
    para.style.fontSize = "16px";
    para.style.display = "block";
    input.value = "";
})
changeColorBtn.addEventListener("click", () => {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = color;
});