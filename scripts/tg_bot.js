export default class TelegramSendMessage {
    constructor(formID) {
        this.formID = formID;
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
        thisClass.checkValidPhone(this.userNumber.value)
        thisClass.telegramSendMsg(this.userName.value, this.userNumber.value)

    }

    //TODO
    checkValidPhone(number) {
        if(!number || number.toString().length > 25 || number.toString().length < 8){
            // please input correct number
        }
     } // от 8 до 25 и не буквы ()-+ пробелы
    sendDode() {
        this.button.textContent = "ЗАЯВКА ОТПРАВЛЕНА"
        this.button.classList.add('sended')
    }
    sendErr() {
        this.button.textContent = "ОШИБКА ОТПРАВКИ"
        this.button.classList.add('error')
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