const WEEKDAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه",]

const BOOK_LIST = new Map([
    [1, "8-10"],
    [2, "11-13"],
    [3, "14-16"],
])

class TableView {
    #table = document.querySelector("table");
    #tbody = this.#table.querySelector("tbody");
    #bookedData;

    #generateMarkup(el, i) {
        // the booked data for current day
        const dayData = this.#bookedData.get(i) || []

        const [includes1, includes2, includes3] = 
            [dayData.includes(BOOK_LIST.get(1)), dayData.includes(BOOK_LIST.get(2)), dayData.includes(BOOK_LIST.get(3))]

        return i === 1 ? `
            <tr id="${i}">
                <th scope="row">${el}</th>
                <td></td>
                <td></td>
                <td><button ${includes3 ? "disabled" : ""} data-selected="${dayData.includes(BOOK_LIST.get(3))}" data-value="${i}__${BOOK_LIST.get(3)}" class="btn ${includes3 ? "text-light" : "btn-outline-light"}">book ${BOOK_LIST.get(3)}</button></td>
            </tr>
        ` :
            `
            <tr id="${i}">
                <th scope="row">${el}</th>
                <td><button ${includes1 ? "disabled" : ""} data-selected="${includes1}" data-value="${i}__${BOOK_LIST.get(1)}" class="btn ${includes1 ? "text-light" : "btn-outline-light"}">book ${BOOK_LIST.get(1)}</button></td>
                <td><button ${includes2 ? "disabled" : ""} data-selected="${includes2}" data-value="${i}__${BOOK_LIST.get(2)}" class="btn ${includes2 ? "text-light" : "btn-outline-light"}">book ${BOOK_LIST.get(2)}</button></td>
                <td><button ${includes3 ? "disabled" : ""} data-selected="${includes3}" data-value="${i}__${BOOK_LIST.get(3)}" class="btn ${includes3 ? "text-light" : "btn-outline-light"}">book ${BOOK_LIST.get(3)}</button></td>
            </tr>
        `
    }

    render(bookedData) {
        this.#bookedData = bookedData
        const markup = WEEKDAYS.map(this.#generateMarkup.bind(this)).join("");
        this.#tbody.insertAdjacentHTML("afterbegin", markup)
    }

    renderError() {
        this.#tbody.innerHTML = ""
        this.#table.innerText = "error"
    }

    #disableButton(btn) {
        btn.setAttribute("disabled", true);
    }

    selectButton(id) {
        const btn = this.#tbody.querySelector(`button[data-value="${id}"]`);
        this.#disableButton(btn)
        btn.classList.remove("btn-outline-light");
        btn.classList.add("btn-light");
    }

    ableButton(id) {
        const btn = this.#tbody.querySelector(`button[data-value="${id}"]`);
        btn.removeAttribute("disabled")
        btn.classList.add("btn-outline-light");
        btn.classList.remove("btn-light");
    }

    onClickHandler(handler) {
        this.#tbody.addEventListener("click", ({ target }) => {
            const btn = target.closest("button")
            if (!btn) return;
            if(btn.dataset.selected === "true") return
            handler(btn.dataset.value)
        })
    }
}

export default new TableView()