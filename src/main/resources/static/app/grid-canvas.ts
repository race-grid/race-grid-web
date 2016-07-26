
import {Vector} from "./common";
export interface GridCanvasSettings{
    width: number;
    height: number;
    cellSize: number;
    onClick: (coordinate: Vector) => void;
    $canvasElement;
}

export class GridCanvas {

    ctx;
    onClickCallback;
    $canvasElement;

    width;
    height;
    cellSize;

    constructor(settings: GridCanvasSettings) {
        this.width = settings.width;
        this.height = settings.height;
        this.cellSize = settings.cellSize;
        this.onClickCallback = settings.onClick;
        this.$canvasElement = settings.$canvasElement;
        this.$canvasElement.on('click', (event) => this.onClick(event));
        this.ctx = this.$canvasElement[0].getContext("2d");
        this.drawGrid()
    }

    onClick(event) {
        var coordinate = {
            x: this.pixelAsCell(event.offsetX),
            y: this.pixelAsCell(event.offsetY)
        };
        this.onClickCallback(coordinate)
    }

    pixelAsCell(pixel) {
        return pixel / this.cellSize
    }

    cellAsPixel(cell) {
        return cell * this.cellSize
    }

    setCellSize(size) {
        this.cellSize = size;
    }

    drawGrid() {
        this.$canvasElement.attr("width", this.cellAsPixel(this.width));
        this.$canvasElement.attr("height", this.cellAsPixel(this.height));
        this.ctx.strokeStyle = "gray";
        var line;
        for (var x = 0; x < this.width; x++) {
            line = {from: {x: x, y: 0}, to: {x: x, y: this.height}};
            this.drawLine(line)
        }
        for (var y = 0; y < this.height; y++) {
            line = {from: {x: 0, y: y}, to: {x: this.width, y: y}};
            this.drawLine(line);
        }
    }

    drawWall(line) {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;
        this.drawLine(line)
    }

    drawLine(line) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.cellAsPixel(line.from.x), this.cellAsPixel(line.from.y));
        this.ctx.lineTo(this.cellAsPixel(line.to.x), this.cellAsPixel(line.to.y));
        this.ctx.stroke();
    }

}

