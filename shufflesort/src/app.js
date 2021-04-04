var CardModule = (function (window) {

    function CardModule() {

        const cardData = [
            { text: 1, bgcolor: 'color-1' },
            { text: 2, bgcolor: 'color-2' },
            { text: 3, bgcolor: 'color-3' },
            { text: 4, bgcolor: 'color-2' },
            { text: 5, bgcolor: 'color-3' },
            { text: 6, bgcolor: 'color-4' },
            { text: 7, bgcolor: 'color-4' },
            { text: 8, bgcolor: 'color-2' },
            { text: 9, bgcolor: 'color-3' },
        ];

        this.ele = document.querySelector('.card-container');
        this.shuffleBtn = document.querySelector('.shufflebtn');
        this.sortBtn = document.querySelector('.sortbtn');


        const bindEvents = () => {
            this.shuffleBtn.addEventListener('click', suffleData)
            this.sortBtn.addEventListener('click', renderEle)
        }

        const suffleData = () => {
            let copyData = [ ...cardData ];
            copyData.sort(() => Math.random() - 0.5);
            renderEle(null, copyData);
        }

        const renderEle = (option, cards = cardData) => {
            let template = cards.map((card) => `<div class="card-item ${card.bgcolor}">${card.text}</div>`).join('');
            this.ele.innerHTML = template;
        }


        this.init = function () {
            bindEvents();
            renderEle();
        }
    }
    return CardModule;

})(window);
const instance = new CardModule();
instance.init(); 