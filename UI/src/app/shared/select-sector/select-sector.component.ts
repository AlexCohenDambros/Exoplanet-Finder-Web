import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.scss']
})
export class SelectSectorComponent {

  toppings = new FormControl();
  toppingList: string[] = ['Tomato', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage'];
  filteredToppingList: string[] = [];

  constructor() {
    this.filteredToppingList = [...this.toppingList];
  }

  filterItems(value: string) {
    this.filteredToppingList = this.toppingList.filter(topping =>
      topping.toLowerCase().includes(value.toLowerCase())
    );
  }
}
