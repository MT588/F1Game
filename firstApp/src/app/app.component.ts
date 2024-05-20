import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { start } from 'node:repl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'F1Game';
  score = 0.0;
  multiplierSoft = 1.0;
  multiplierLevel = 1.0;
  time = 1000;
  idle = false;
  intervalId: any;
  earnings = 0.0;
  earningsPerSecond = 0.0;
  intervalId2: any;

  ngOnInit(): void {
      console.log('AppComponent initialized');
      this.time = 1000;
  }

  incrementSoft(value: number = 1 ): void  {
    this.score = parseFloat((this.score + value * this.multiplierSoft).toFixed(2));
    
  }

  startIdle(time: number = 1000, value: number = 1): void {
    if (this.idle) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.incrementSoft(value);
      console.log(this.time);
    }, time);
    this.idle = true;
    this.initEPS();
  }

  initEPS(): void{
    this.intervalId2 = setInterval(() => {
      this.updateEarningsPerSecond();
    }, 1);
  }

  updateEarningsPerSecond(): void {
    this.earningsPerSecond = parseFloat((this.multiplierSoft*1000/this.time).toFixed(2));
  }

  speedIdle(): void{
    this.time = this.time*0.9;
    clearInterval(this.intervalId);
    this.idle = false;
    this.startIdle(this.time);
  }

  incrementSoftmultiplier() {
    if (this.score >= this.incrementSoftLevel()){
      this.score -= this.incrementSoftLevel();
      this.multiplierSoft += 1;
      this.multiplierLevel += 1;
    }
  }

  incrementSoftLevel() {
    let x = this.multiplierLevel;
    return 10 * x * x ;
  }
}

