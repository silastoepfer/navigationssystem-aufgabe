import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// I moved the Link Interface to a model for structural purposes
import {ILink} from './models/link.model';
import {NavigationService} from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: ILink[]

  constructor(private readonly router: Router, public navigation: NavigationService) {
  }

  public ngOnInit(): void {
    // get initial items for part one of the assignment
    this.items = this.navigation.items
    // get "real" data for the last part of the assignment
    // (comment this out to test only first part)
    this.navigation.getNavigationItems().subscribe(
      data => { this.items = data},
      // handle error and default data if an error occurs
      err => {
        console.warn(err)
        this.items = this.navigation.items
      }
    )
  }

  // navigation function for absolute routing using the navbar
  onDirectRoute(route: string) {
    this.router.navigate(["/" + route])
  }
}
