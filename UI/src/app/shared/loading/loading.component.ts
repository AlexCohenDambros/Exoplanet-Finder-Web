import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('spinAnimation', [
      state('spin', style({ transform: 'rotate(360deg)' })),
      state('stop', style({ transform: 'rotate(0deg)' })),
      transition('spin <=> stop', animate('2000ms ease-out'))])],
})

export class LoadingComponent implements OnInit {

  loading = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
