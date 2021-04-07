window.onload = function() {
    var localStorageKeyName = 'data';

    loadFromLocalStorage();

    document.querySelector("#btnAdd").addEventListener('click', function() {
        var name = document.getElementById("name");
        var mail = document.getElementById("mail");
        var age = document.getElementById("age");

        if (name.value.length === 0 || mail.value.length === 0 || !parseInt(age.value)) return;

        var user = {
            name: name.value,
            mail: mail.value,
            age: age.value
        }

        name.value = '';
        mail.value = '';
        age.value = '';

        appendObjectToLocalStorage(user);
    });

    function appendObjectToLocalStorage(user) {
        var users = [];
        var lsData = localStorage.getItem(localStorageKeyName);

        if (lsData !== null) {
            users = JSON.parse(lsData);
        }
        users.push(user);
        localStorage.setItem(localStorageKeyName, JSON.stringify(users));
        loadFromLocalStorage();
    }

    function loadFromLocalStorage() {
        var users = [];
        var lsData = localStorage.getItem(localStorageKeyName);
        var usuariosTBody = document.querySelector("#tablaUsuarios tbody");

        if (lsData !== null) {
            users = JSON.parse(lsData);
        }

        usuariosTBody.innerHTML = '';

        users.forEach(function(x, i) {
            var tr = document.createElement("tr");
            var tdName = document.createElement("td");
            var tdMail = document.createElement("td");
            var tdAge = document.createElement("td");
            var tdRemove = document.createElement("td");
            var btnRemove = document.createElement("button");

            tdName.innerHTML = x.name;
            tdMail.innerHTML = x.mail;
            tdAge.innerHTML = x.age;

            btnRemove.textContent = 'X';
            btnRemove.classList.add("btn");
            btnRemove.classList.add("btn-outline-danger");
            btnRemove.addEventListener('click', function() {
                removeFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);

            tr.appendChild(tdName);
            tr.appendChild(tdMail);
            tr.appendChild(tdAge);
            tr.appendChild(tdRemove);
            usuariosTBody.appendChild(tr);
        });

    }

    function removeFromLocalStorage(index) {
        var users = [];
        var lsData = localStorage.getItem(localStorageKeyName);
        users = JSON.parse(lsData);
        users.splice(index, 1);
        localStorage.setItem(localStorageKeyName, JSON.stringify(users));
        loadFromLocalStorage();
    }
}