// Get elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btnCreate = document.getElementById('btnCreate');
let mood = 'create';
let tem;

// Get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#02700b';
    } else {
        total.style.backgroundColor = '#690000';
        total.innerHTML = "";
    }
}

// Create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

btnCreate.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };
    if(title.value!=''&&price.value!=""&&category.value!=''&&count.value<101){
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tem] = newPro;
            mood = 'create';
            btnCreate.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearInput();
    }
  

    localStorage.setItem('product', JSON.stringify(dataPro));
    
    showData();
}

// Clear inputs
function clearInput() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read data
function showData() {
    let table = '';
    for (let x = 0; x < dataPro.length; x++) {
        table += `
            <tr>
                <td>${x}</td>
                <td>${dataPro[x].title}</td>
                <td>${dataPro[x].price}</td>
                <td>${dataPro[x].taxes}</td>
                <td>${dataPro[x].ads}</td>
                <td>${dataPro[x].discount}</td>
                <td>${dataPro[x].total}</td>
                <td>${dataPro[x].category}</td>
                <td><button onclick="updateData(${x})">Update</button></td>
                <td><button onclick="deleteData(${x})">Delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btnAll = document.getElementById('btndeleteall');
    if (dataPro.length > 0) {
        btnAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        btnAll.innerHTML = '';
    }
}
showData();

// Delete data
function deleteData(x) {
    dataPro.splice(x, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// Delete all data
function deleteAll() {
    dataPro.splice(0);
    localStorage.clear();
    showData();
}

// Update data
function updateData(x) {
    title.value = dataPro[x].title;
    price.value = dataPro[x].price;
    taxes.value = dataPro[x].taxes;
    ads.value = dataPro[x].ads;
    discount.value = dataPro[x].discount;
    category.value = dataPro[x].category;
    count.style.display = 'none';
    btnCreate.innerHTML = 'Update';
    tem = x;
    getTotal();
    mood = 'update';
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// Search
let moodSearch = 'title';

function getSrcMood(id) {
    let search = document.getElementById('search');
    if (id == 'btnTitle') {
        moodSearch = 'title';
        search.placeholder = 'Search by Title';
    } else {
        moodSearch = 'category';
        search.placeholder = 'Search by Category';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (moodSearch == 'title') {
        for (let x = 0; x < dataPro.length; x++) {
            if (dataPro[x].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${x}</td>
                        <td>${dataPro[x].title}</td>
                        <td>${dataPro[x].price}</td>
                        <td>${dataPro[x].taxes}</td>
                        <td>${dataPro[x].ads}</td>
                        <td>${dataPro[x].discount}</td>
                        <td>${dataPro[x].total}</td>
                        <td>${dataPro[x].category}</td>
                        <td><button onclick="updateData(${x})">Update</button></td>
                        <td><button onclick="deleteData(${x})">Delete</button></td>
                    </tr>
                `;
            }
        }
    } else {
        for (let x = 0; x < dataPro.length; x++) {
            if (dataPro[x].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${x}</td>
                        <td>${dataPro[x].title}</td>
                        <td>${dataPro[x].price}</td>
                        <td>${dataPro[x].taxes}</td>
                        <td>${dataPro[x].ads}</td>
                        <td>${dataPro[x].discount}</td>
                        <td>${dataPro[x].total}</td>
                        <td>${dataPro[x].category}</td>
                        <td><button onclick="updateData(${x})">Update</button></td>
                        <td><button onclick="deleteData(${x})">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
