class Stopwatch {
    constructor() {

        let startTime, stopTime, running, duration = 0;

        this.start = function () {
            running = true;
            startTime = new Date().getTime();

            setTimeout(() => {
                if (running) {
                    this.stop();
                    this.start();
                }
            }, 10);
        };

        const blink = (animation) => {
            watch.classList.add(animation);
            setTimeout(() => {
                watch.classList.remove(animation);
            }, 250);
        }

        this.addPenalty = (penaltyTime) => {
            duration += penaltyTime;
            if (penaltyTime > 10)
                blink('animate-red');
            else
                blink('animate-yellow');
        };

        this.stop = function () {
            this.duration = duration.toFixed(2);
            if (!running) {
                throw new Error('The watch is not running!');
            }

            running = false;
            stopTime = new Date().getTime();

            const seconds = (stopTime - startTime) / 1000;
            duration += seconds;
            this.time = document.querySelector('#duration');

            if (duration >= 10)
                this.time.innerText = duration.toFixed(2);

            else
                this.time.innerText = 0 + duration.toFixed(2);
        };

        this.reset = function reset() {
            startTime = null;
            stopTime = null;
            running = false;
            duration = 0;
            this.time.innerText = '00.00';
        };
    }
}

