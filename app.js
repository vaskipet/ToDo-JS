// basically every function in this small app begins by defining consts
// then adding an evet to them. 
// the app has simple functions including adding items, deleting items,
// filtering (or searching) and hiding all of them.

// making sure that the app.js works
document.addEventListener('DOMContentLoaded', function() {

    // building consts before adding functionalities
    const list = document.querySelector('#todo-list ul');
    const addForm = document.forms['add-todo'];
    const hideBox = document.querySelector('#hide');
    const searchBar = document.forms['search-todos'].querySelector('input');

    //once user submits something, addTodo is fired
    addForm.addEventListener('submit', addTodo);
    //once user clicks trash-icon, deleTodo is fired
    list.addEventListener('click', deleteTodos);
    //once user clicks checkbox to 'hide all', hideTodos is fired
    hideBox.addEventListener('change', hideTodo);
    //once user input something in the searchbar. filterTodos is fired
    searchBar.addEventListener('keyup', filterTodos);

    //adding todos
    function addTodo(e) {
        e.preventDefault(); //so the page does not reload when clicked!
        const value = addForm.querySelector('input[type="text"]').value;

        // adding some form validation so that the user enters at least two character to the list
        if (value == null || value == '' || value.length < 2) {
            alert('Please fill the form in order to add a todo!');
            // document.getElementById('myInput').className += "green";
        } else {
            //in order to add new items we need to create elements it consists of
            const li = document.createElement('li');
            const todoName = document.createElement('span');
            const deleteBtn = document.createElement('span');

            //add the delete icon and the value that was written by user
            deleteBtn.innerHTML = "<i class='fa fa-trash'>";
            todoName.textContent = value;

            //add classes to the todo
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
    };

    //deleting todos
    function deleteTodos(e) {
        if (e.target.className === 'delete') {
            const li = e.target.parentElement;
            list.removeChild(li);
        }
    };

    //hiding todos
    function hideTodo() {
        //if the checkbox is checked then don´t diplay the list. else diplay as block-
        hideBox.checked ? list.style.display = "none" : list.style.display = "block";
    };

    // filter or search function 
    function filterTodos(e) {
        //grabbing the list of the todos
        const todoItems = list.getElementsByTagName('li');
        //turn todoItems into array so we can use forEach to iterate through all todos
        Array.from(todoItems).forEach((item) => {
            const val = item.firstElementChild.textContent;
            //if-else: if the value has index value then display block, else don´t display. 
            val.indexOf(e.target.value) != -1 ? item.style.display = "block" : item.style.display = "none";
        });
    }
});