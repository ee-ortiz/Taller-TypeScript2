import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const btnfilterByNumber: HTMLElement = document.getElementById('button-filterByNumber')!;
const inputSearchBoxMinCreditos: HTMLInputElement = <HTMLInputElement>(document.getElementById('search-boxMin')!);
const inputSearchBoxMaxCreditos: HTMLInputElement = <HTMLInputElement>(document.getElementById('search-boxMax')!);


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByNumber.onclick = () => applyFilterByNumber();


renderCoursesInTable(dataCourses);

renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}




function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}

function renderStudentInTable(student: Student[]): void {

  console.log('Desplegando Estudiante');
  student.forEach((stu) => {
      let trElement = document.createElement("null");
      trElement.innerHTML = `
      <div class = "row">
      <div class = "col card">Código</div>
      <div class = "col card">${stu.codigo}</div>
      </div>
      <div class = "row">
      <div class = "col card">Cédula</div>
      <div class = "col card">${stu.cedula}</div>
      </div>
      <div class = "row">
      <div class = "col card">Edad</div>
      <div class = "col card">${stu.edad}</div>
      </div>
      <div class = "row">
      <div class = "col card">Dirección</div>
      <div class = "col card">${stu.direccion}</div>
      </div>
      <div class = "row">
      <div class = "col card">Teléfono</div>
      <div class = "col card">${stu.telefono}</div>
      </div>
      `;
  studentTbody.appendChild(trElement);
  });
}

function applyFilterByNumber() {
	let min = inputSearchBoxMinCreditos.valueAsNumber;
	min = min == null ? 0 : min;
	let max = inputSearchBoxMaxCreditos.valueAsNumber;
	max = max == null ? 0 : max;
	clearCoursesInTable();
	let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
	renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(min: number, max: number, courses: Course[]) {
	return min === 0 && max === 0
		? dataCourses
		: courses.filter((c) => c.credits >= min && c.credits <= max);
}