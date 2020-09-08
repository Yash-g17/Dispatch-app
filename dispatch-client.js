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