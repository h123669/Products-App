async function getallCategories() {
    try{
        let data = await fetch('https://dummyjson.com/products/category-list');
        let result = await data.json();
        console.log(result);
        discategories(result)

    }
    catch(error){
        console.log("error");
        
    }
}
getallCategories()

function discategories(list) {
    var cartouna="";
    for (let i = 0; i < list.length; i++) {
        cartouna +=`<div class="col-md-4 categoryall">
                    <div class="card">
                        <div class="card-body inner">
                            <h5 class="card-title">${list[i].toUpperCase()}</h5>
                        </div>
                    </div>
                </div>`
                document.getElementById('rowCateg').innerHTML = cartouna;
        if(document.getElementById('rowCateg'))document.getElementById('rowCateg').innerHTML = cartouna
    }
    let categorylist= document.querySelectorAll('.categoryall');

    for (let i = 0; i < categorylist.length; i++) {
        categorylist[i].addEventListener("click", function () {
            console.log(categorylist[i].innerText);
            localStorage.setItem("categoryName", categorylist[i].innerText);
            location.href = "./products.html";
        })
    }
}


async function getcateories(catName) {
    try{
        let data = await fetch(`https://dummyjson.com/products/category/${catName}`);
        let result = await data.json();
        console.log(result.products);
        displayProducts(result.products,"rowproduct")
    }
    catch(error){
        console.log("error");
        
    }
}


if (location.pathname =="products.html") {
    getcateories(localStorage.getItem("categoryName"))
    
}


function displayProducts(products,rowid) {
    var cartouna ="";
    for (let i = 0; i < products.length; i++) {
        cartouna +=`<div class="col-md-4 product" id=${products[i].id}>
                    <div class="card" ">
                        <img src="${products[i].thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${products[i].title}</h5>
                            <p class="card-text">${products[i].description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="text-success">${products[i].price} $</h5>
                                <h5>${products[i].rating} <i class="fa-regular fa-star text-warning"></i></h5>
                            </div>
                            <button  class="btn btn-success w-100"> add to card</button>
                        </div>
                    </div>
                </div>`
            }
    document.getElementById(rowid).innerHTML=cartouna;

let product= document.querySelectorAll(".product");
console.log(product);
for (let i = 0; i < product.length; i++) {
    console.log(product[i]);
    product[i].addEventListener("click",()=>{
console.log(product[i].getAttribute("id"));
localStorage.setItem("productId",product[i].getAttribute("id"));
location.href = "./productdetails.html"
    } )
}
}

console.log(location.pathname);

if (location.pathname=="productdetails.html") {
    getDetails(localStorage.getItem("productId"))
}

async function getDetails(id) {
    try{
        let data = await fetch(`https://dummyjson.com/products/${id}`);
        let result = await data.json();
        console.log(result);
        displayProductID(result)
    }
    catch(error){
        console.log("error");
        
    }
}


function displayProductID(product) {

console.log(product);

    cartouna=`<div class="col-md-6">
                        <img src="${product.thumbnail}" alt="" srcset="">
                    </div>
                    <div class="col-md-6">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <h4>Price : <span class="text-muted">${product.price}$</span></h4>
                        <h4>Brand: <span  class="text-muted">${product.brand}</span></h4>
                        <h4>Category: <span  class="text-muted">${product.category}</span></h4>
                        <h4>Return Policy :<span  class="text-muted">${product.returnPolicy}n</span></h4>
                        <h4 class="text-danger">discount :<span  class="text-danger">${product.discountPercentage}%</span></h4>
                        <button class="btn my-3 text-white bg-success w-100">add to cart</button>
                    </div>`
        
    document.getElementById('details').innerHTML=cartouna;
}


async function allproducts() {
    try{
        let data = await fetch('https://dummyjson.com/products');
        let result = await data.json();
        console.log(result.products);
        displayProducts(result.products,"rowAllproduct")
    }catch(error){
        console.log("error");
        
    }
}

if (location.pathname=="allproducts.html") {
    allproducts()
}


let title = document.getElementById("title");
let category = document.getElementById("category");
let price = document.getElementById("price");
let description = document.getElementById("description");


async function addproduct() {
    let product ={
        title:title.value,
        price:price.value,
        description:description.value,
        category:category.value
    } 
if (notEmpty()) {
    let x=await fetch("https://dummyjson.com/products/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    let res =await x.json()
    console.log(res);
    if(x.status === 201){
        Toastify({
            text: "product added successfully",
            duration: 3000,
            gravity:"bottom",
            style: {
                background: "#871927",
            },
        }).showToast();
    }
    reset()

    setTimeout(() => {
        location.href = "./index.html";
    }, 3000);
    
}}

document.getElementById("btnsubmit").addEventListener("click", ()=> {
    addproduct()
})


function notEmpty() {
    if (title.value==""|| price.value==""|| description.value=="" || category.value=="") {
        document.getElementById("warnMsg").classList.replace("d-none", "d-block")
        return false;    
    }else{
        document.getElementById("warnMsg").classList.replace("d-block", "d-none")
        return true;
    }
}


function reset() {
    title.value="";
    price.value="";
    description.value="";
    category.value="";
}
