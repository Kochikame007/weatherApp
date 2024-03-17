import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FilterList } from '../../utilities/custompipes/filter-list.pipe';
import { City } from '../../model/city';


/**
 * This component displays a autocomplete Searchbar 
 * Usage Example:
 * @example
 * <app-search [placeholder]="placeholder"
      [list]="list"
      (valueEmitter)="eventHandler($event)></app-search>
 */



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilterList, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Input() placeholder!: string;
  @Input() list!: City[];
  @Output() valueEmitter = new EventEmitter<string | null>()
  faSearch = faMagnifyingGlass;
  searchControl = new FormControl("");
  showAll = false;

  showAllCities() {
    this.showAll = true
  }

  selectCity(city) {
    this.searchControl.setValue(city.name);
    this.emitData();
    this.showAll = false;
  }

  /**
   * This function emits value for the parent
   */
  emitData() {
    this.valueEmitter.emit(this.searchControl.value);
    this.searchControl.setValue('');
  }

  delayBlue() {
    setTimeout(() => {
      this.showAll = false;
    }, 500)
  }

}
