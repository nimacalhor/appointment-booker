import TableView from "./tableView.js"
import SubmitButtonView from "./submitButtonView.js"
const BASE_URL = "https://book-appointment-ac387-default-rtdb.firebaseio.com/"

const state = {
    // state for controlling UI
    curBookedData: new Map([
        [0, false],
        [2, false],
        [3, false],
        [4, false],
        [5, false],
        [6, false],
    ]),
    // global data
    globalBookedData: new Map()
}

// get global data from firebase
const getBookedData = async function () {
    const { globalBookedData } = state;

    const res = await fetch(BASE_URL + "bookedData.json")
    const data = await res.json()
    // create globalBookedData Map
    Object.values(data).forEach(bookGroup => bookGroup.forEach((el, i) => {
        // el === false and have no value
        if (!el) return;
        const dayData = globalBookedData.get(i)
        // if for that day no appointment has been set
        if (!dayData) return globalBookedData.set(i, [el])
        // if the day had a value add the new appointment time to it if it was not being added
        if (dayData && Array.isArray(dayData)) {
            if (dayData.includes(el)) return
            globalBookedData.set(i, [...dayData, el])
        }
    }))

    // render table with data and disabled buttons
    // if no data was there the table will not contain any disabled buttons
    TableView.render(state.globalBookedData)
}

const buttonClickHandler = function (value) {
    // this F will receive [3__8-10] from the clicked button data-value
    const [day, time] = value.split("__");
    // check if there was any value and then change its ui
    const prevDayValue = state.curBookedData.get(+day);
    if (prevDayValue) TableView.ableButton(`${day}__${prevDayValue}`)
    state.curBookedData.set(+day, time)
    TableView.selectButton(value)
}

const submitHandler = async function () {
    // create obj from current map
    const obj = Array.from(state.curBookedData.entries()).reduce((main, [key, value]) => ({ ...main, [key]: value }), {})
    // loading button
    SubmitButtonView.setBtnState()

    try {
        // post the data
        const res = await fetch(BASE_URL + "bookedData.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        // button response view
        SubmitButtonView.setBtnState("success")
    } catch (err) {
        SubmitButtonView.setBtnState("error")
    }
}

getBookedData()
TableView.onClickHandler(buttonClickHandler)
SubmitButtonView.submitBtnClickHandler(submitHandler)