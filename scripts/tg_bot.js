export default class TelegramSendMessage {
    constructor(formID) {
        // this.where = where;
        this.formID = formID;
        this.thisClass  = this
        // this.testForBtn = document.getElementById('testForBtn')
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
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: ` Имя: ${msg[0]} \nНомер телефона : ${msg[1]} `,
            }),
        });
        const status1 = await response.json();
        console.log(status1.ok);
    }

    addEvents() {
        // this.testForBtn.onclick = this.testOne.bind(this.testForBtn,this)
        document.getElementById(this.formID).onsubmit = this.sumbit.bind(document.getElementById(this.formID),this);
        // document.addEventListener('keyup.enter',function(){
        // })
    }

    testOne(...args){
        console.log(args)
        console.log(this.where)
        console.log(e)
    }

    sumbit(...args) {
        const event = args[1]
        const thisClass = args[0]
        event.preventDefault();
        thisClass.telegramSendMsg(this.userName.value, this.userNumber.value);
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