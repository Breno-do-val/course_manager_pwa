export default class HtmlService {

    constructor(courseService) {
        this.courseService = courseService;
        this.#bindFormEvent();
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

    checkedBox() {
        let concludedValue = document.querySelector('#concluded:checked').value;
        return concludedValue;
    }
}