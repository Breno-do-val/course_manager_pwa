export default class HtmlService {

    constructor(courseService) {
        this.courseService = courseService;
        this.#bindFormEvent();
        this.listAll();
    }

    #bindFormEvent() {
        const form = document.querySelector("form");
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.addCourse(form.title.value, form.description.value, form.duration.value, form.link.value, this.checkedBox());
            form.reset();
        })
    }

    async addCourse(title, description, duration, link, concluded) {
        const course = { title, description, duration, link, concluded: concluded };
        const courseId = await this.courseService.save(course);
        course.id = courseId;
    }

    async listAll() {
        const course = await this.courseService.getAll();
        course.forEach(item => this.addToHtmlList(item));
    }

    async deleteCourse(courseId, div) {
        await this.courseService.delete(courseId);
        div.remove();
    }

    async updateCourse(courseId, status) {
        const course = await this.courseService.get(courseId);
        course.concluded = status;
        await this.courseService.save(course);
    }

    checkedBox() {
        let concludedValue = document.querySelector('#concluded').checked;
        return concludedValue;
    }

    addToHtmlList(course) {
        let checkedCourse = course.concluded ? "checked" : "";
        let courseItem = `<div class="card__data">
                            <div class="card__data--item">
                                <span class="card__data--sub">Title:</span>
                                <span>${course.title}</span>
                            </div>
                            <div class="card__data--item">
                                <span class="card__data--sub">Description:</span>
                                <span>${course.description}</span>
                            </div>
                            <div class="card__data--item">
                                <span class="card__data--sub">Duration:</span>
                                <span>${course.duration}<span>&nbsp;Horas</span></span>
                            </div>
                            <div class="card__data--item">
                                <span class="card__data--sub">Link:</span>
                                <span><a href="${course.link}" target="_blank">${course.link}</a></span>
                            </div>
                            <span class="card__data--item">
                                <span class="mdl-checkbox__label">Concluded:</span>
                                <input type="checkbox" id="course-status" class="mdl-checkbox__input" ${checkedCourse}>
                            </span>
                            <span id="delete-item" class="card__data--item">
                                <i class="material-icons">delete</i>
                            </span>
                        </div>`

        let card = document.querySelector('.card__title');
        card.insertAdjacentHTML("afterend", courseItem);

        let courseDiv = document.querySelector('.card__data');
        let button = document.querySelector('#delete-item');
        let courseStatus = document.querySelector('#course-status');

        button.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteCourse(course.id, courseDiv);
        })

        courseStatus.addEventListener('change', () => {
            let status = courseStatus.checked;
            this.updateCourse(course.id, status);
        })
    }
}