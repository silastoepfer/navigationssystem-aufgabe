import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ILink} from '../../models/link.model';
import {NavigationService} from '../../navigation.service';

@Component({
  selector: 'app-nav-wrapper',
  templateUrl: './nav-wrapper.component.html',
  styleUrls: ['./nav-wrapper.component.css']
})
export class NavWrapperComponent implements OnInit {
  activeRoute: string
  items: ILink[]
  navIndex = 0
  preventBackward = false
  preventForward = false

  constructor(private router: Router, private route: ActivatedRoute, private navigation: NavigationService) { }

  ngOnInit(): void {
    // get initial items for part one of the assignment
    this.items = this.navigation.items
    // get "real" data for the last part of the assignment
    // (comment this out to test only first part)
    this.navigation.getNavigationItems().subscribe(
      data => {
        // set data if it changes from
        this.items = data
        // reset the index of the navigation (0-N) to check routing options if data changes
        this.navIndex = this.items.map(object => object.route).indexOf(this.activeRoute)
        // check routing options if data changes
        this.checkNavState()
      },
      err => {
        // handle error and clear data if an error occurs
      console.warn(err)
      this.items = this.navigation.items
      }
    )
    //subscribe to the route data and
    this.route.params.subscribe((params) => {
      // set active route from route to render component
      // default to A if no parameter is passed
      this.activeRoute = params["route"] ? params["route"] : 'a';
      // set the index of the navigation (0-N) to check routing options
      this.navIndex = this.items.map(object => object.route).indexOf(this.activeRoute)
      // check routing options
      this.checkNavState()
    });
  }

  onNavigateForward() {
    // check nav state
    this.checkNavState()
    //check permission to route forward
    if(this.preventForward) {
      // calculate route + 1
      let navTo = this.items[this.navIndex + 1].route
      // navigate to new route
      this.router.navigate(["/" + navTo])
    }
  }

  onNavigateBack() {
    // check nav state
    this.checkNavState()
    //check permission to route forward
    if(this.preventBackward) {
      // calculate route + 1
      let navTo = this.items[this.navIndex - 1].route
      // navigate to new route
      this.router.navigate(["/" + navTo])
    }
  }

  private checkNavState() {
    // prevent forward if last navigation item is reached
    this.preventForward = this.navIndex < (this.items.length - 1);
    // prevent backward if first navigation item is reached
    this.preventBackward = this.navIndex > 0;
  }

}
