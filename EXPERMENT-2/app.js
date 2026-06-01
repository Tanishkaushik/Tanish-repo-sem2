let employees = [];
function addEmployee() {
  let name = document.getElementById("name").value;
  let id = document.getElementById("empid").value;
  let salary = document.getElementById("salary").value;
  let dept = document.getElementById("dept").value;
  if (name === "" || id === "" || dept === "") {
    alert("Please fill all fields properly");
    return;
  }
  let emp = {
    name: name,
    id: id,
    salary: salary,
    department: dept,
  };
  employees.push(emp);
  alert("Employee Added");
}
function displayEmployees() {
  let text = "";
  for (let i in employees) {
    text =
      text +
      employees[i].name +" " +
      employees[i].id +" " +
      employees[i].salary +" " +
      employees[i].department +
      "<br>";
  }
  document.getElementById("output").innerHTML = "<b>Empolees: </b><br>"+text;
}
function filterSalary() {
  var text = "";
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].salary > 50000) {
      text = text + employees[i].name + " - " + employees[i].salary + "<br>";
    }
  }
  document.getElementById("output").innerHTML =  "<b>Number of Empolees: </b>"+text;
}
function totalSalary() {
  var total = 0;
  for (var i = 0; i < employees.length; i++) {
    total = total + Number(employees[i].salary);
  }
  document.getElementById("output").innerHTML =  "<b>Total Salary: </b>"+ total;
}
function averageSalary() {
  var total = 0;
  for (var i = 0; i < employees.length; i++) {
    total = total + Number(employees[i].salary);
  }
  var avg = total / employees.length;
  document.getElementById("output").innerHTML =  "<b>Average Salary: </b>" + avg;
}
function countDepartment() {
  var d = prompt("Enter Department");
  var count = 0;
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].department == d) {
      count++;
    }
  }
  document.getElementById("output").innerHTML =
     "<b>Empolees: </b>" + d + " = " + count;
}