import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

  ngOnInit(): void {
      console.log('AppComponent initialized');
      this.time = 1000;
      setInterval(() => this.incrementSoft(), this.time);
  }

  incrementSoft(): void  {
    if (this.score > 1){
      this.score = 0;
    }
    console.log(this.score);
    if (this.score < 10){
      this.score = parseFloat((this.score + 0.1 * this.multiplierSoft).toFixed(2));
    }
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

