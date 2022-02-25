class SubmitButtonView {
    #btn = document.querySelector("button#submit")

    submitBtnClickHandler(handler) {
        this.#btn.addEventListener("click", handler)
    }

    setBtnState(stateName = "loading") {
        switch (stateName) {
            case "loading": this.#btnLoadingState();
                break;
            case "success": this.#btnSuccessState();
                break;
            case "error": this.#btnErrorState();
                break;
        }
    }

    #setBtnText(txt = "") {
        this.#btn.innerText = "";
        this.#btn.innerText = txt
    }

    #btnLoadingState() {
        this.#setBtnText("loading")
    }

    #btnSuccessState() {
        this.#setBtnText("done ✅");
        setTimeout(() => this.#setBtnText("SUBMIT"), 2000)
        setTimeout(() => window.location.reload(), 3000)
    }

    #resetErrorState() {
        this.#setBtnText("SUBMIT")
        this.#btn.classList.remove("btn-danger");
        this.#btn.classList.add("btn-info");
    }

    #btnErrorState() {
        this.#setBtnText("error ❌");
        this.#btn.classList.remove("btn-info");
        this.#btn.classList.add("btn-danger");
        setTimeout(this.#resetErrorState, 2000)
    }
}

export default new SubmitButtonView()