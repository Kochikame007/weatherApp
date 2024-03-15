import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/sharedService';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {

  constructor(public sharedService: SharedService) {
  }

}
