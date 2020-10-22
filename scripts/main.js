import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var btnfilterByNumber = document.getElementById('button-filterByNumber');
var inputSearchBoxMinCreditos = (document.getElementById('search-boxMin'));
var inputSearchBoxMaxCreditos = (document.getElementById('search-boxMax'));
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByNumber.onclick = function () { return applyFilterByNumber(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function renderStudentInTable(student) {
    console.log('Desplegando Estudiante');
    student.forEach(function (stu) {
        var trElement = document.createElement("null");
        trElement.innerHTML = "\n      <div class = \"row\">\n      <div class = \"col card\">C\u00F3digo</div>\n      <div class = \"col card\">" + stu.codigo + "</div>\n      </div>\n      <div class = \"row\">\n      <div class = \"col card\">C\u00E9dula</div>\n      <div class = \"col card\">" + stu.cedula + "</div>\n      </div>\n      <div class = \"row\">\n      <div class = \"col card\">Edad</div>\n      <div class = \"col card\">" + stu.edad + "</div>\n      </div>\n      <div class = \"row\">\n      <div class = \"col card\">Direcci\u00F3n</div>\n      <div class = \"col card\">" + stu.direccion + "</div>\n      </div>\n      <div class = \"row\">\n      <div class = \"col card\">Tel\u00E9fono</div>\n      <div class = \"col card\">" + stu.telefono + "</div>\n      </div>\n      ";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByNumber() {
    var min = inputSearchBoxMinCreditos.valueAsNumber;
    min = min == null ? 0 : min;
    var max = inputSearchBoxMaxCreditos.valueAsNumber;
    max = max == null ? 0 : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(min, max, courses) {
    return min === 0 && max === 0
        ? dataCourses
        : courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
