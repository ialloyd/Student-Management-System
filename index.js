let students = [
    { id: 1, name: "Alice", age: 20, grade: "A", degree: "Computer Science", email: "alice@example.com" },
    { id: 2, name: "Bob", age: 21, grade: "B", degree: "Mathematics", email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 22, grade: "C", degree: "Physics", email: "charlie@example.com" }
];

let studentForm = document.getElementById("studentForm");
let searchInput = document.getElementById("search");
let studentsTable = document.getElementById("studentsTable");

function renderStudents() {

    while (studentsTable.rows.length > 1) {
        studentsTable.deleteRow(1);
    }

    let query = searchInput.value.toLowerCase();

    let filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.degree.toLowerCase().includes(query)
    );

    for (let i = 0; i < filteredStudents.length; i++) {
        let row = studentsTable.insertRow(-1);
        let idCell = row.insertCell(0);
        let nameCell = row.insertCell(1);
        let ageCell = row.insertCell(2);
        let gradeCell = row.insertCell(3);
        let degreeCell = row.insertCell(4);
        let emailCell = row.insertCell(5);
        let editCell = row.insertCell(6);
        let deleteCell = row.insertCell(7);

        idCell.innerHTML = filteredStudents[i].id;
        nameCell.innerHTML = filteredStudents[i].name;
        ageCell.innerHTML = filteredStudents[i].age;
        gradeCell.innerHTML = filteredStudents[i].grade;
        degreeCell.innerHTML = filteredStudents[i].degree;
        emailCell.innerHTML = filteredStudents[i].email;

        let editButton = document.createElement("button");
        editButton.innerHTML = "<span class='material-symbols-outlined'>edit_square</span>"
        editButton.onclick = function () {

            let deleteButtons = Array.from(studentsTable.querySelectorAll("button")).filter(button => button.className === 'delete-button');
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].disabled = true;
                deleteButtons[i].style.opacity=0.5;
            }

            studentForm.name.value = filteredStudents[i].name;
            studentForm.age.value = filteredStudents[i].age;
            studentForm.grade.value = filteredStudents[i].grade;
            studentForm.degree.value = filteredStudents[i].degree;
            studentForm.email.value = filteredStudents[i].email;

            studentForm.querySelector("input[type=submit]").value = "Update Student";

            studentForm.onsubmit = function (event) {
                event.preventDefault();

                filteredStudents[i].name = studentForm.name.value;
                filteredStudents[i].age = studentForm.age.value;
                filteredStudents[i].grade = studentForm.grade.value;
                filteredStudents[i].degree = studentForm.degree.value;
                filteredStudents[i].email = studentForm.email.value;

                renderStudents();

                studentForm.reset();
                studentForm.querySelector("input[type=submit]").value = "Add Student";
                studentForm.onsubmit = addStudent;

                for (let i = 0; i < deleteButtons.length; i++) {
                    deleteButtons[i].disabled = false;
                }
            };
        };
        editCell.appendChild(editButton);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "<span class='material-symbols-outlined'>delete</span>"
        deleteButton.onclick = function () {
            students.splice(students.indexOf(filteredStudents[i]), 1);

            renderStudents();
        };
        deleteCell.appendChild(deleteButton);
    }
}

function addStudent(event) {
    event.preventDefault();

    let student = {
        id: students.length + 1,
        name: studentForm.name.value,
        age: studentForm.age.value,
        grade: studentForm.grade.value,
        degree: studentForm.degree.value,
        email: studentForm.email.value
    };

    students.push(student);

    renderStudents();

    studentForm.reset();
}

studentForm.onsubmit = addStudent;

searchInput.addEventListener("input", renderStudents);

renderStudents();