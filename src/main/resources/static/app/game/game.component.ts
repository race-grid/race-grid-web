import {Component, OnInit} from "@angular/core";
import {SessionService} from "../service/session.service";
import {Session, RaceTrack, Line, Vector} from "../common";
import {GridCanvas, GridCanvasSettings} from "../grid-canvas";
import {ApiClientService} from "../service/api-client.service";
declare let $: any;

@Component({
    selector: 'game',
    template: `
        <div class="row">
            <div class="col-xs-12">
                <p>Game (id: '{{session.gameId}}')</p>
                 <canvas id="map-canvas" style="border:1px solid #d3d3d3;">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>
            
        </div>
    `
})
export class GameComponent implements OnInit {

    session: Session;

    constructor(private apiClientService: ApiClientService,
                private sessionService: SessionService) {
    }

    ngOnInit(): any {
        this.session = this.sessionService.getSession();
        this.sessionService.sessionChange$.subscribe(session => this.session = session);

        if (this.session.raceTrack) {
            this.setupCanvas();
        } else {
            this.apiClientService.getTrackData(this.session.gameId).then(track => {
                this.session.raceTrack = track;
                this.setupCanvas()
            });
        }

    }

    setupCanvas() {
        let track: RaceTrack = this.session.raceTrack;
        let settings: GridCanvasSettings = {
            width: track.width,
            height: track.height,
            cellSize: 20,
            onClick: this.onClickCanvas,
            $canvasElement: $('canvas')
        };
        let canvas: GridCanvas = new GridCanvas(settings);
        canvas.drawGrid();
        track.walls.forEach((wall: Line) => canvas.drawLine(wall));
    }

    onClickCanvas(coordinate: Vector) {
        console.log("Clicked canvas " + coordinate.x + ", " + coordinate.y);
    }
}