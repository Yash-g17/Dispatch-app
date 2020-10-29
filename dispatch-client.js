<<<<<<< HEAD
// let product_code_arr;
/*Data-format
{
    product_code:{
        id:weight,
        id:weight,
        id:weight,
        id:weight
    }
    product_code:{
        id:weight,
        id:weight,
        id:weight,
        id:weight
    }
}


*/
/////////////////
var socket = io.connect("http://localhost:5000");
socket.on("connect", () => {
    console.log("connection made");
});

let product_code_arr = {};
///////////////////////////////
///////////////////////////////MODAL CHECK
if (localStorage.getItem("billerName") === null) {
    console.log("done");
    let elem = document.getElementById("openModal");
    elem.click();
} else {
    document.getElementById("billerName").innerHTML = localStorage.getItem(
        "billerName"
    );
}

document.getElementById("billerNameSelected").addEventListener("click", () => {
    let e = document.getElementById("billerNameSelector");
    document.getElementById("billerName").innerHTML =
        e.options[e.selectedIndex].text;
    localStorage.setItem("billerName", e.options[e.selectedIndex].text);
});
/////////////////////////////////
/////////////////////////////////PRINT BUTTON
let printButton = document.getElementById("print");
printButton.addEventListener("click", () => {
    dataJson = {
        biller_code: "456",
        products_arr: product_code_arr,
    };
    fetch("http://127.0.0.1:5000/data", {
            method: "POST",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        // Converting to JSON
        .then((response) => {
            if (response.ok) {
                localStorage.clear();
                window.location.reload(true);
                return response.json();
            } else {
                throw new Error("Something went wrong");
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
/////////////////////////////////
/////////////////////////////////BILL CHECK
if (localStorage.getItem("products") != null) {
    product_code_arr = JSON.parse(localStorage.getItem("products"));
    addHtmlDom(product_code_arr);
}
///////////////////////////////////
///////////////////////////////////
function addHtmlDom(data) {
    var initial = `<tr id="row0"></tr>    
                        <tr id="row1"></tr>
                        <tr id="row2"></tr>
                        <tr id="row3"></tr>
                        <tr id="row4"></tr>
                        <tr id="row5"></tr>
                        <tr id="row6"></tr>
                        <tr id="row7"></tr>
                        <tr id="row8"></tr>
                        <tr id="row9"></tr>
                        <tr id="row10"></tr>
                        <tr id="row11"></tr>
                        <tr id="row12"></tr>
                        <tr id="row13"></tr>
                        <tr id="row14"></tr>
                        <tr id="row15"></tr>
                        <tr id="row16"></tr>
                        <tr id="row17"></tr>
                        <tr id="row18"></tr>
                        <tr id="row19"></tr>
                        <tr id="row20"></tr>
                        <tr id="row21"></tr>
                        <tr id="row22"></tr>
                        <tr id="row23"></tr>
                        <tr id="row24"></tr>
                        <tr id="row25"></tr>
                        <tr id="row26"></tr>
                        <tr id="row27"></tr>
                        <tr id="row28"></tr>
                        <tr id="row29"></tr>
                        <tr id="row30"></tr>`;
    document.getElementById("data").innerHTML = initial;
    let n = 0;
    for (var key in data) {
        let obj = data[key];
        let total = 0;
        document.getElementById(`row${n}`).innerHTML += `<th> ${key} </th>`;
        n++;
        console.log(n);

        n = n % 20;
        for (var key1 in obj) {
            //prettier-ignore
            document.getElementById(`row${n}`).innerHTML += `<td> ${obj[key1]} </td>`;
            n++;
            console.log(n);

            n = n % 20;
            total = total + obj[key1];
        }
        document.getElementById(`row${n}`).innerHTML += `<td>Total= ${total}</td>`;
        n++;
        console.log(n);

        n = n % 20;
        localStorage.setItem("products", JSON.stringify(data));
    }
}

socket.on("product_data", (data) => {
    console.log("data recieved");
    let product_data = JSON.parse(data);
    let id = product_data.id;
    let weight = product_data.weight;
    let product_code = product_data.product_code;
    if (product_code_arr[product_code] == undefined) {
        product_code_arr[product_code] = {};
        product_code_arr[product_code][id] = weight;
        addHtmlDom(product_code_arr);
        console.log(JSON.stringify(product_code_arr));
    } else {
        if (product_code_arr[product_code][id] != undefined) alert("already taken");
        else {
            product_code_arr[product_code][id] = weight;
            console.log(JSON.stringify(product_code_arr));
            addHtmlDom(product_code_arr);
        }
    }
    // addHtmlDom(product_code_arr);
});
// function print() {
//     var yourDOCTYPE = "<!DOCTYPE html>";
//     var printPreview = window.open("", "print_preview");
//     var printDocument = printPreview.document;
//     printDocument.open();
//     var head =
//         "<head>" +
//         "<style> .super{height:279mm; width:80mm;height: 9 in ;width: 6 in ;display: flex;justify - content: center;align - content: center;display: flex;flex - direction: column; -webkit - columns: 4 150 px; -moz - columns: 4 150 px;columns: 4 150 px; -webkit - column - gap: 2e m; -moz - column - gap: 2e m;column - gap: 2e m} < /style>" +
//         "</head>";
//     printDocument.write(
//         yourDOCTYPE +
//         "<html>" +
//         head +
//         "<body>" +
//         "<div class='super'>" +
//         document.getElementById("super").innerHTML +
//         "</div>" +
//         "</body>" +
//         "</html>"
//     );
//     printPreview.print();
//     printPreview.close();
// }
// console.log(document.querySelector("#print-button").innerHTML);
// document.querySelector("#print-button").addEventListener("click", print);
=======
var socket = io.connect("http://localhost:5000");
let weight, product_code, id;
let product_code_arr;

function checkData(Arr, data) {
    let index;
    Arr.map((data2) => {
        index++;
        if (data2 == data) return index;
        else return -1;
    });
}

socket.on("weight", (data) => {
    weight = data;
    console.log("weight recieved" + data);
    //   document.querySelector("#text-2").innerHTML = data;
    socket.on("product type", (data) => {
        product_code = data;
        console.log("product_code recieved" + data);
    });
    socket.on("id", (data) => {
        id = data;
        console.log("id recieved " + id);
    });
    if (checkData(product_code_arr, product_code) >= 0) {
        let product_code_index = checkData(product_code_arr, product_code);
        if (checkId(product_code_arr.product_code_index, id) > 0)
            console.log("already taken");
        else {
            let length = Object.keys(product_code_arr.product_code_index).length;
            product_code_arr.product_code_index[length + 1] = {
                id: id,
                weight: weight,
            };
            addHtmlDom(product_code_arr.product_code_index[length + 1]);
        }
    } else {
        let length = Object.keys(product_code_arr).length;
        product_code_arr[length + 1] = {
            product_code: {
                id: id,
                weight: weight,
            },
        };
        length++;
        addHtmlDom(product_code_arr.length[0]);
    }
});
>>>>>>> 2156bf589455dea20b0671d8cc04ead44e07df50
