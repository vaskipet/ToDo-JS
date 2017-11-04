// basically every function in this small app begins by defining consts
// then adding an evet to them. 
// the app has simple functions including adding items, deleting items,
// filtering (or searching) and hiding all of them.


document.addEventListener('DOMContentLoaded', function() {
    // selecting ul from the #todo-div and saving it to a const
    const list = document.querySelector('#todo-list ul');

    //delete todos
    //adding eventlistener 'click' to the list
    list.addEventListener('click', function(e) {
        if (e.target.className === 'delete') {
            const li = e.target.parentElement;
            list.removeChild(li);
        }
    });

    //add todos
    const addForm = document.forms['add-todo'];
    addForm.addEventListener('submit', function(e) {
        e.preventDefault(); //so the page does not reload when clicked!
        const value = addForm.querySelector('input[type="text"]').value;

        // addin some form validation so that the user enters at least two character to the list
        if (value == null || value == '' || value.length < 2) {
            alert('Please fill the form in order to add a todo!');
            // document.getElementById('myInput').className += "green";
        } else {


            //in order to add new items we need to create elements to the logic
            const li = document.createElement('li');
            const todoName = document.createElement('span');
            const deleteBtn = document.createElement('span');

            //add content
            deleteBtn.innerHTML = "<i class='fa fa-trash'>";
            // deleteBtn.textContent = "delete";
            todoName.textContent = value;

            //add classes
            todoName.classList.add('name');
            deleteBtn.classList.add('delete');
            li.classList.add('list-group-item');

            //append to DOM
            li.appendChild(todoName);
            li.appendChild(deleteBtn);
            list.appendChild(li);

            document.getElementById("myInput").value = "";
            // document.getElementById("myInput").className -= "green";
        }
    });


    list.addEventListener('dblclick', function() {
        li.className += "line-through";
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
        const todoItems = list.getElementsByTagName('li');
        Array.from(todoItems).forEach((item) => {
            const val = item.firstElementChild.textContent;
            val.toLowerCase().indexOf(e.target.value) != -1 ? item.style.display = "block" : item.style.display = "none";
        });
    });
})