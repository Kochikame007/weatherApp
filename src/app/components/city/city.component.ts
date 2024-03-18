import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/sharedService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})

/**
 * This component displays City Data
 */
export class CityComponent {

  constructor(public sharedService: SharedService, private sanitizer: DomSanitizer) {
  }

  sanitize(url:string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
