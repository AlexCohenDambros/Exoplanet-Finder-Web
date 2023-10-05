import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-option-tabs',
  templateUrl: './option-tabs.component.html',
  styleUrls: ['./option-tabs.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('600ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

export class OptionTabsComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
