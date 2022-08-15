import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';
import { map } from 'rxjs/operators';
// I moved the Link Interface to a model for structural purposes
import { ILink } from './models/link.model';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // the BehaviourSubjects can be initialised with an empty Array instead of null since this would probably be the default behaviour of a backend service
  private staticNavigationItems$: BehaviorSubject<ILink[]> = new BehaviorSubject<ILink[]>([]);
  private dynamicNavigationItems$: BehaviorSubject<ILink[]> = new BehaviorSubject<ILink[]>([]);


  // NOTE: These are the items for the first task of the assignment.
  // they will be replaced by the actual data from the last assignment inside of the components
  items = [
    { title: 'A', route: 'a' },
    { title: 'B', route: 'b' },
    { title: 'C', route: 'c' },
    { title: 'D', route: 'd' }
  ]

  constructor() {
    this.staticNavigationItems$.next([
      { title: 'M', route: 'm' },
      { title: 'A', route: 'a' },
      { title: undefined, route: 'x' },
      { title: 'B', route: 'b' },
      { title: 'H', route: null },
    ]);
    this.mockFetchNavigationItems();
  }

  public getNavigationItems(): any {
    // TODO: use static and remote navigation items sorted by title
    // and since the data is not curated well, please remove the invalid items

    //combine BehaviourSubjects hot so they emit values as soon as they arrive
    return combineLatest([this.staticNavigationItems$, this.dynamicNavigationItems$]).pipe(
      //merge both arrays into one
      map(
        items => items[0].concat(items[1])
      ),
      // filter items with corrupted data
      map(items => items.filter(item => item.title && item.route)),
      //sort full array by title
      map(items => items ? items.sort((a,b) => a.title.localeCompare(b.title)) : items)
    )
  }

  private mockFetchNavigationItems(): void {
    // as if it would come from an http request
    setTimeout(() => this.dynamicNavigationItems$.next([
      { title: 'C', route: 'c' },
      { title: 'Z', route: 'z' }
    ]), 500);
  }
}
