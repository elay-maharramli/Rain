canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

class Helper {
    static random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static removeIndex(array, index) {
        if (index >= array.length || array.length <= 0) {
            return;
        }

        array[index] = array[array.length - 1];
        array[array.length - 1] = undefined;
        array.length = array.length - 1;
    }
}

class Rain {
    constructor(x, y, dy, context) {
        this.x = x;
        this.y = y;
        this.w = 2;
        this.h = 15;
        this.dy = dy;
        this.ctx = context;
    }

    update()
    {
        this.y += this.dy;
    }

    draw()
    {
        this.ctx.fillStyle = "rgb(100,100,100)";
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Game
{
    constructor(context) {
        this.ctx = context;
        this.rain = new Rain(Math.floor(Math.random() * 800), 16, 5, this.ctx);
        this.rains = [];
        this.rainTimer = 0;
        this.rainSpawnInterval = 1;
        this.loop();
    }

    loop()
    {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
    update()
    {
        this.rain.update();

        if (this.rainTimer % this.rainSpawnInterval === 0)
        {
            this.rains.push(new Rain(
                Math.floor(Math.random() * 800),
                10,
                Helper.random(5, 7),
                this.ctx
            ));

            this.rains.push(new Rain(
                Math.floor(Math.random() * 800),
                10,
                Helper.random(5, 7),
                this.ctx
            ));

            this.rainTimer = 0;
        }

        this.rainTimer++;

        this.rains.forEach((rain, index) => {
            ctx.clearRect(0,0,800,600);

            if (rain.y > 600)
            {
                Helper.removeIndex(this.rains, index);
            }
            rain.update();
        });
    }

    draw()
    {
        ctx.clearRect(0,0,800,600);
        this.rain.draw();

        for (let i in this.rains)
        {
            if (this.rains.hasOwnProperty(i))
            {
                this.rains[i].draw();
            }
        }
    }
}

game = new Game(ctx);
game.update();
game.draw();