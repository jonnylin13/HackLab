import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  private async goto(path: string) {
    return this.router.navigate([path]);
  }

  createLab() {
    this.goto('/create-lab');
  }

  home() {
    this.goto('/');
  }

  about() {
    this.goto('/about-us');
  }
}
