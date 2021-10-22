let btnDel = [];

for (let i = 0; i < 5; i++) {
    btnDel[i] = "<button class='btnDel" + String(i) + "'>delete</button>";
}

let employeeList = [
    ["Adams Apple", "Jr. Software Engineer", 4415, btnDel[0]],
    ["Becky Barley", "Sr. Software Engineer", 1231, btnDel[1]],
    ["Charlie Chicken", "Sr. Software Engineer", 3043, btnDel[2]],
    ["Donny Donahue", "Scrum Master", 6943, btnDel[3]],
    ["Eric Esther", "Project Owner", 4532, btnDel[4]]];

const $ = function (id) {
    return window.document.getElementById(id);
};

function showEmployees() {
    let table, tbody, tableString = "";

    table = document.getElementsByTagName("table")[0];
    tbody = document.createElement('tbody');

    $("qtyEmployee").innerHTML = "Displaying " + employeeList.length + " employees";

    for (let row = 0; row < employeeList.length; row++) {
        tableString += "<tr>";
        for (let col = 0; col < 4; col++) {
            tableString += "<td>" + employeeList[row][col] + "</td>";
        }
        tableString += "</tr>";
    }
    tableString += "</tbody>";
    table.appendChild(tbody);
    $("tblBody").innerHTML = tableString;
}

const addEmployee = function () {
    let name, title, extension, employee = [];

    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;

    if (name === "") {
        $("requireName").innerHTML = "This field is required.";
        return;
    } else {
        $("requireName").innerHTML = "";
        employee.push(name);
    }

    if (title === "") {
        $("requireTitle").innerHTML = "This field is required.";
        return;
    } else {
        $("requireTitle").innerHTML = "";
        employee.push(title);
    }

    if (extension === "") {
        $("requireExt").innerHTML = "This field is required.";
        return;
    }

    if (isNaN(extension) || extension.length !== 4) {
        $("requireExt").innerHTML = "The extension must be a 4-digit number";
        return;
    } else {
        $("requireExt").innerHTML = "";
        employee.push(extension);
        window.console.log(employeeList.length);
        btnDel[employeeList.length + 1] = "<button class='btnDel" + String(employeeList.length + 1) + "'>delete</button>";
        employee.push(btnDel[employeeList.length + 1]);
    }

    if (employee.length > 0) {
        employeeList.push(employee);
    }
    showEmployees();

    $("regForm").reset();
    $("name").innerHTML = "";
    $("title").innerHTML = "";
    $("extension").innerHTML = "";
};

const deleteEmployee = function (index) {
    employeeList.splice(index, 1);
    showEmployees();
};

window.addEventListener("load", function () {
    showEmployees();
    $("add").addEventListener("click", addEmployee);
    $("tblBody").addEventListener("click", function (e) {
        if (e.target.textContent.match(/delete/)) {
            let index, tblBody, btnElements;
            tblBody = $("tblBody");
            btnElements = tblBody.getElementsByTagName("button");
            for (let i = 0; i < btnElements.length; i++) {
                if (event.target.className === btnElements[i].className) {
                    index = i;
                }
            }
            deleteEmployee(index);
        }
    });
});