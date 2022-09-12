const url = "https://hexschool.github.io/js-filter-data/data.json";
const productList = document.querySelector('.showList');
let data = [];
let showData = [];

const getData = () => {
    axios.get(url)
    .then(function (response){
        data = response.data.filter(item => item.作物名稱 !== null);
    })
}

getData();

const renderData = (data) => {
    let str = "";
    data.forEach(item => {
        str += `<tr><td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td></tr>`;
    })
    productList.innerHTML = str;
}

const typeButtonGroup = document.querySelector('.button-group');

typeButtonGroup.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON"){
        let type = e.target.dataset.type;
        showData = data.filter(item => item.種類代碼 === type);
        let tab = document.querySelectorAll('.button-group button');
        tab.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
        renderData(showData);
    }
})

const searchGroup = document.querySelector('.search-group');
const input = document.querySelector('.search-group input');

searchGroup.addEventListener('click', (e) =>{
    if (e.target.nodeName === "BUTTON"){
        search();
    }
})

input.addEventListener('keyup', (e) => {
    if (e.key == "Enter"){
        search();
    }
})

const search = () =>{
        if (input.value.trim() == ""){
            const swal = Swal.mixin({
                icon: 'warning',
                title: '請輸入作物名稱！',
                confirmButtonText: '確認'      
            })
            swal.fire();
            return;
        }
        showData = data.filter(item => item.作物名稱.match(input.value));
        if (showData.length == 0){
            productList.innerHTML = `<tr><td colspan="7" class="text-center p-3">查詢不到交易資訊&gt;_&lt;</td></tr>`
            input.value = "";
            return;
        }
        input.value = "";
        renderData(showData);
}

const sortAdvanced = document.querySelector('.js-sort-advanced');

sortAdvanced.addEventListener('click', (e) => {
    if (e.target.nodeName === "I"){
        if (showData.length == 0) {
            return;
        };
        let sortPrice = e.target.dataset.price;
        let sortMethod = e.target.dataset.sort;
        if (sortMethod === "up"){
            showData.sort(function(a, b){
                return a[sortPrice] - b[sortPrice];
            })
        } else {
            showData.sort(function(a, b){
                return b[sortPrice] - a[sortPrice];
            })
        }
        renderData(showData);
    }
})

const sortMobile = document.querySelector('.mobile-select');

sortMobile.addEventListener('change', () => {
    if (showData.length == 0){
        return;
    }
    let sortPrice = sortMobile.value;
    showData.sort(function(a, b){
        return a[sortPrice] - b[sortPrice];
    })
    renderData(showData);
})