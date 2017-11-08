// basically every function in this small app begins by defining variables
// then adding an evet to them. 
// the app has simple functions including adding items, deleting items,
// filtering (or searching) and hiding all of them.

// making sure that the app.js works
document.addEventListener('DOMContentLoaded', function() {

    // building global vars before adding functionalities
    var listItem = document.querySelector('#todo-list ul');
    var addForm = document.forms['add-todo'];
    var hideBox = document.getElementById('hide');
    var searchBar = document.forms['search-todos'].querySelector('input');
    var field = document.getElementById('myInput');

    //once user submits something, addTodo is fired
    addForm.addEventListener('submit', addTodo);
    //once user clicks trash-icon, deleTodo is fired
    listItem.addEventListener('click', deleteTodos);
    //once user clicks checkbox to 'hide all', hideTodos is fired
    hideBox.addEventListener('change', hideTodo);
    //once user input something in the searchbar. filterTodos is fired
    searchBar.addEventListener('keyup', filterTodos);

    //adding todos
    function addTodo(e) {
        e.preventDefault(); //so the page does not reload when clicked!
        var value = addForm.querySelector('input[type="text"]').value;

        // adding some form validation so that the user enters at least two character to the list
        if (value == null || value == '' || value.length < 3) {
            alert('Please fill the form in order to add a todo!');
            //adding a css-class to the input field
            field.setAttribute('class', 'warning');
        } else {
            //in order to add new items we need to create elements it consists of
            field.setAttribute('class', 'form-control');
            var li = document.createElement('li');
            var todoName = document.createElement('span');
            var deleteBtn = document.createElement('span');

            //add the delete icon and the value that was written by user
            deleteBtn.innerHTML = "<i class='fa fa-trash'>";
            todoName.textContent = value;

            //add classes to the todo
            // todoName.classList.add('name');
            deleteBtn.classList.add('delete');
            li.classList.add('list-group-item');

            //append the values to the Document Object Model
            // to the created li-tag todoName is appended
            li.appendChild(todoName);
            // to the created li-tag deleteBtn is appended
            li.appendChild(deleteBtn);
            //the li is appeded to the list
            listItem.appendChild(li);

            //after input we want to clear the form
            document.getElementById("myInput").value = "";
        }
    };

    //deleting todos
    function deleteTodos(e) {
        if (e.target.className === 'delete' || e.target.className === 'fa-trash') {
            var li = e.target.parentElement;
            listItem.removeChild(li);
        }
    };

    //hiding todos
    function hideTodo() {
        //if the checkbox is checked then don´t diplay the list. else diplay as block.
        hideBox.checked ? listItem.style.display = "none" : listItem.style.display = "block";
    };

    // filter or search function 
    function filterTodos(e) {
        //grabbing the list of the todos
        var todoItems = listItem.getElementsByTagName('li');
        //turn todoItems into array so we can use forEach to iterate through all todos.
        Array.from(todoItems).forEach((item) => {
            var val = item.firstElementChild.textContent;
            //if-else: if the value has index value then display block, else don´t display. 
            val.indexOf(e.target.value) != -1 ? item.style.display = "block" : item.style.display = "none";
        });
    }
});