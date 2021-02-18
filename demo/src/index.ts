import ML2D, { Config } from 'ml2d';
import { GameObject } from '../../dist/core/gameObject';
import { Vector } from '../../dist/core/vector';
import { Circle } from '../../dist/renderables/circle';

class RenderSystem extends ML2D.System {
    OnUpdate(dt: number) {
        //console.log(ML2D.Game.Active);
    }
}

class TopDownTest extends ML2D.Game {

    private player!: GameObject;

    constructor(el: HTMLDivElement, config: Config) {
        super(el, config);
        this.systems.instantiate(RenderSystem);
    }

    OnCreate() {
        this.player = this.gameObjects.instantiate();
        this.player.addComponent(Circle);
    }

    OnUpdate(dt: number) {

    }
}

const game = new TopDownTest(document.getElementById('game') as HTMLDivElement, {
    width: 800,
    height: 800,
})

game.run();