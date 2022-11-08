this.allHoles = [];

class Mole {
    constructor(speed = 'very-slow') {

        this.speed = speed;
        this.icon = new Image();
        this.icon.src = "./assets/images/mole.png";
        this.icon.classList.add('box3');
        this.hole = new Image();
        this.hole.src = "./assets/images/dirt.png";

        this.delay;

        switch (this.speed) {
            case 'slow':
                this.delay = 800;
                break;
            case 'medium':
                this.delay = 600;
                break;
            case 'fast':
                this.delay = 400;
                break;
            case 'very-fast':
                this.delay = 200;
                break;
            default:
                this.delay = 1000;
                break;

        }
    }

    createHoles(number) {

        const ul = document.createElement('ul');
        ul.classList.add('flex');
        const moles = document.querySelector('#moles');
        for (let i = 0; i < number; ++i) {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = "./assets/images/dirt.png";
            li.appendChild(img);
            li.classList.add('box4');
            li.firstChild.classList.add('relative');
            ul.appendChild(li);
            allHoles.push(ul.lastChild);
        }

        moles.appendChild(ul);


    }

    move() {
        this.icon.classList.add(this.speed);
        setTimeout(() => {
            this.icon.classList.remove(this.speed);
        }, this.delay);
    }

    popUp() {
        setInterval(() => {
            if (!this.icon.classList.contains('die-off')) {
                allHoles[Math.floor(Math.random() * (allHoles.length))].appendChild(this.icon);
                this.move();
            }
        }, this.delay + 5);

    }

    die() {
        this.icon.classList.add('die-off');
        this.icon.classList.add('non-clickable');
        setTimeout(() => {
            this.icon.classList.add('hidden');
        }, 4000);
    }

}
