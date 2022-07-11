export default class TelegramSendMessage {
    constructor(formID) {
        this.formID = formID;
        this.input = document.getElementById('contacts-window__user-number')
        this.button = document.getElementById('contacts-window__button-send')
        this.init();
    }
    init() {
        // this.createForm();
        this.addEvents()
    }
    async telegramSendMsg(...msg) {
        const TOKEN = "5347090290:AAF09ki7fabNwlkyFFdPst8d-hDvXu1G4mI";
        const CHAT_ID = "-1001622903655";
        const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const query = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: ` Имя: ${msg[0]} \nНомер телефона : ${msg[1]} `,
            }),
        }
        const response = await fetch(URL, query);
        try {
        } catch (e) { }

        const status = await response.json();
        // console.log(status)
        if (status.ok) {
            this.sendDode()
        }
        if (!status.ok) {
            this.sendErr()
        }
    }

    addEvents() {
        // this.testForBtn.onclick = this.testOne.bind(this.testForBtn,this)
        document.getElementById(this.formID).onsubmit = this.sumbit.bind(document.getElementById(this.formID), this);
        this.input.oninput = (e) => { this.checkValidPhone(e) }
    }

    testOne(...args) {
        console.log(args)
        console.log(this.where)
        console.log(e)
    }

    sumbit(...args) {
        const event = args[1]
        const thisClass = args[0]
        event.preventDefault();
        if (thisClass.checkValidSubmit(this.userNumber.value)) {
            thisClass.telegramSendMsg(this.userName.value, this.userNumber.value)
        }
    }

    //TODO
    checkValidPhone(e) {
        let number = e.target.value;
        console.log(number)
        if (number.toString().length > 5) {
            this.checkValidSubmit(number)
        }
    }
    checkValidSubmit(number) {
        if (!number || number.toString().length > 25 || number.toString().length < 8) {
            // please input correct number
            this.incorrectInput()
            return false;
        }
        return true
    } // от 8 до 25 и не буквы ()-+ пробелы
    sendDode() {
        this.button.textContent = "ЗАЯВКА ОТПРАВЛЕНА"
        this.button.classList.add('sended')
    }
    sendErr() {
        this.button.textContent = "ОШИБКА ОТПРАВКИ"
        this.button.classList.add('error')
    }
    incorrectInput() {
        this.button.textContent = "Пожалуйста, введите корректный номер!"
        this.button.classList.add('error')
        setTimeout(() => {
            this.button.classList.remove('error')
            this.button.textContent = "ЗАКАЗАТЬ ЗВОНОК"
        }, 1500);
    }

    createForm() {
        const form = `  
        <form method="post" id="${this.formID}">
            <label>Имя</label><br>
            <input type="text" name="userName" /><br><br>
            <label>Номер</label><br>
            <input type="number" name="userNumber" /><br><br>
            <input type="submit" value="Отправить" />
            </form><br><br>`;
        document
            .getElementById(this.where)
            .insertAdjacentHTML("beforeend", form);
    }
}

// const tg = new TelegramSendMessage("newForm", "newFormID");