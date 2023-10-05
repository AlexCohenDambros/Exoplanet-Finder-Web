import { Component, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.scss']
})
export class SelectSectorComponent {

  toppingList: string[] = ['Tomato', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage'];
  filteredToppingList: string[] = [...this.toppingList];
  searchValue: string = '';
  selectedToppings: string[] = [];
  toppingsFormControl = new FormControl();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchValue'] && !changes['searchValue'].firstChange) {
      this.updateFilteredToppings();
    }
  }

  filterItems(value: string) {
    this.searchValue = value;
    this.updateFilteredToppings();
  }

  updateFilteredToppings() {
    const selectedToppings = this.selectedToppings;
    if (this.searchValue.trim() === '') {
      this.filteredToppingList = selectedToppings.length > 0 ? selectedToppings : [...this.toppingList];
    } else {
      this.filteredToppingList = this.toppingList
        .filter(topping => topping.toLowerCase().includes(this.searchValue.toLowerCase()));
    }
  }

}
