let basePrice=399
let custom=150
let current="playera"

const img=document.getElementById("product-img")
const design=document.getElementById("design")

const products={
playera:{
price:399,
img:"img/playera.png"
},
camisa:{
price:499,
img:"img/camisa.png"
},
pantalon:{
price:399,
img:"img/pantalon.png"
}
}

function changeProduct(type,btn){

current=type

img.src=products[type].img

basePrice=products[type].price

document.getElementById("base").innerText=basePrice

updatePrice()

document.querySelectorAll(".product-selector button")
.forEach(b=>b.classList.remove("active"))

btn.classList.add("active")

}

function updatePrice(){

let total=basePrice+custom

document.getElementById("total").innerText=total

}

const colors=[

"#ffffff",
"#000000",
"#FF4500",
"#1E90FF",
"#32CD32",
"#FFD700"

]

const container=document.getElementById("colors")

colors.forEach(c=>{

let div=document.createElement("div")

div.className="color"

div.style.background=c

div.onclick=()=>{

img.style.filter=`brightness(${c=="#ffffff"?1:0.8})`

document.querySelectorAll(".color").forEach(x=>x.classList.remove("selected"))

div.classList.add("selected")

}

container.appendChild(div)

})

document.getElementById("upload").addEventListener("change",function(e){

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=function(event){

design.src=event.target.result

}

reader.readAsDataURL(file)

})

function addCart(){

alert("Producto añadido al carrito")

}

updatePrice()
