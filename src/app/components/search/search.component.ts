import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FilterList } from '../../utilities/filter-list.pipe';
import { Country } from '../../model/city';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilterList, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Input() placeholder!: string;
  @Input() list!: Country[];
  @Output() valueEmitter = new EventEmitter<string | null>()
  faSearch = faMagnifyingGlass;
  searchControl = new FormControl("");


  emitData() {
    this.valueEmitter.emit(this.searchControl.value);
    this.searchControl.setValue('');
  }

}
