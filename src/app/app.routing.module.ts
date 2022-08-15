import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavWrapperComponent} from './components/nav-wrapper/nav-wrapper.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      // add routing for the wrapper component
      {path: '', component: NavWrapperComponent },
      // add dynamic route param to navigate between the components and persist selected component in the url
      {path: ':route', component: NavWrapperComponent },
      {path: '**', redirectTo: ''},
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
