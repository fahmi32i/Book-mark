var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var addBtn = document.getElementById('addBtn');
var productBook = [];

if (localStorage.getItem('productBook') != null) {
    productBook = JSON.parse(localStorage.getItem('productBook'));
}

   

function addBook() {
    if (bookmarkName.value.trim() === "" || bookmarkURL.value.trim() === "") {
        alert("Both fields are required!");
        return;
    }

    if (!/^[a-zA-Z]{3,}$/.test(bookmarkName.value)) {
        alert("No Match");
        return;
    }

    if (!/^https?:\/\//.test(bookmarkURL.value)) {
        alert("Please enter a valid URL (starting with http:// or https://)");
        return;
    }

    var product = {
        bookName: bookmarkName.value.trim(),
        bookUrl: bookmarkURL.value.trim(),
    };

    productBook.push(product);
    localStorage.setItem('productBook', JSON.stringify(productBook));
    display();
    reset();
}


function display() {
    var cartona = ``;
    for (var i = 0; i < productBook.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td><span class="text-capitalize">${productBook[i].bookName}</span></td>
                <td>
                    <a href="${productBook[i].bookUrl}" target="_blank" class="btn btn-success">
                        <i class="fa-solid fa-eye pe-2"></i> Visit
                    </a>
                </td>
                <td>
                    <button onclick="deleteBook(${i})" class="btn btn-danger">
                        <i class="fa-solid fa-trash-can pe-2"></i> Delete
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById('tableContent').innerHTML = cartona;
}

function deleteBook(index) {
    productBook.splice(index, 1);
    localStorage.setItem('productBook', JSON.stringify(productBook));
    display();
}

function reset() {
    bookmarkName.value = ""; 
    bookmarkURL.value = "";
}

display();

