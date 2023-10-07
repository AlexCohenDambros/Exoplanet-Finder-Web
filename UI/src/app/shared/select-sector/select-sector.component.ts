import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/configuration/API/api.service';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.scss']
})
export class SelectSectorComponent implements OnInit {

  toppingList: string[] = ['Tomato', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage'];
  filteredToppingList: string[] = [...this.toppingList];
  searchValue: string = '';
  selectedToppings: string[] = [];
  toppingsFormControl = new FormControl();
  sectorTargets: any[] = [];

  constructor(
    public apiService: ApiService,
    public dialogRef: MatDialogRef<SelectSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    this.getSectorTarget();
  }

  public getSectorTarget(): void {
    let observation = this.data.observation;
    let telescope = this.data.telescope;

    this.apiService.getSectorTargets(observation, telescope).subscribe((data: any) => {
      this.sectorTargets = data;
      console.log('dataaa', data);

    });
    console.log('sectorTargets', this.sectorTargets);
  }

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
