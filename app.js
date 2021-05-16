// Grab the <ul> #list element created in the HTML document

let list = document.getElementById("list");


// Displaying the list of SocaDev's employees

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        employeesList(JSON.parse(this.responseText));
    };
};

xhttp.open("GET", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/", true);
xhttp.send();


function employeesList(employees) {
    for (let i = 0; i < employees.length; i++) {
        list.innerHTML +=
            '<span id="td">' + employees[i].name + '</span>' +
            '<span>' + employees[i].last_name + '</span>' +
            '<span><button type="button" id="viewMore' + employees[i].id + '" onclick=btnInfo(' + employees[i].id + ') name="view" class="btn btn-primary" data-toggle="modal" data-target="#infoModal">View Info</button></span>';
    };
};


// Display the modal box that will show the selected employee's info (id)

function btnInfo(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            employeeData(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id, true);
    xhttp.send();
};


// Display the employee's info in the modal box

function employeeData(employees) {
    document.getElementById("modalName").value = employees.name;
    document.getElementById("modalLastName").value = employees.last_name;
    document.getElementById("modalJobTitle").value = employees.job_title;
    document.getElementById("modalEmail").value = employees.email;

    var modalFooter = document.getElementById("modalFooter");
    modalFooter.innerHTML = '<button type="button" class="btn btn-success" onclick="btnEdit(' + employees.id + ')">Save Edit</button>' + '<span><button type="button" id="btnDelete" class="btn btn-danger" onclick = btnDelete(' + employees.id + ',this) >Delete</button></span>' + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
};


// Edit an employee's info

function btnEdit(id) {

    var name = document.getElementById("modalName").value;
    var lastName = document.getElementById("modalLastName").value;
    var jobTitle = document.getElementById("modalJobTitle").value;
    var email = document.getElementById("modalEmail").value;
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("PUT", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("name=" + name + "&last_name=" + lastName + "&job_title=" + jobTitle + "&email=" + email);
    alert("The employee's info has been edited successfully !")
    document.getElementById('myFormModal').reset();
    location.reload(1);
};


// Remove an employee from the list

function btnDelete(id, event) {

    if (confirm("Do you want to remove the employee from the list?")) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                employeesList(JSON.parse(this.responseText));
                event.parentElement.parentElement.remove();
                alert("The employee has been successfully removed !");
                document.getElementById('myForm').reset();
                location.reload(2);
            }
        };
        xhttp.open("DELETE", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id, true);
        xhttp.send();
    };
};


// Add a new employee to the list

function btnAdd() {

    var name = document.getElementById("newName").value;
    var lastName = document.getElementById("newLastName").value;
    var jobTitle = document.getElementById("newJobTitle").value;
    var email = document.getElementById("newEmail").value;

    const params = {
        name:name,
        last_name:lastName,
        job_title:jobTitle,
        email:email
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    xhttp.open("POST", "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(params));
    alert("The new employee has been successfully added !")
    document.getElementById('myForm').reset();
    location.reload(2);
}
