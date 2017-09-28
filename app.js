document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('#todo-list ul');

    //delete todos
    list.addEventListener('click', function(e) {
        if (e.target.className === 'delete' || e.target.className === 'fa-trash') {
            const li = e.target.parentElement;
            list.removeChild(li);
        }
    });

    //add todos
    const addForm = document.forms['add-todo'];
    addForm.addEventListener('submit', function(e) {
        e.preventDefault(); //so the page does not reload when clicked!
        const value = addForm.querySelector('input[type="text"]').value;


        //create elements
        const li = document.createElement('li');
        const bookName = document.createElement('span');
        const deleteBtn = document.createElement('span');

        //add content
        deleteBtn.innerHTML = "<i class='fa fa-trash'>";
        // deleteBtn.textContent = "delete";
        bookName.textContent = value;

        //add classes
        bookName.classList.add('name');
        deleteBtn.classList.add('delete');

        //append to DOM
        li.appendChild(bookName);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        document.getElementById("myInput").value = "";

    });

    // hide todos 
    const hideBox = document.querySelector('#hide');
    hideBox.addEventListener('change', function() {
        hideBox.checked ? list.style.display = "none" : list.style.display = "block";
    });

    // filter 
    const searchBar = document.forms['search-todos'].querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const books = list.getElementsByTagName('li');
        Array.from(books).forEach((book) => {
            const title = book.firstElementChild.textContent;
            title.toLowerCase().indexOf(e.target.value) != -1 ? book.style.display = "block" : book.style.display = "none";
        });
    });
})