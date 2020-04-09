import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {
  private show = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appAuth(roles: string){
    const token = JSON.parse(localStorage.getItem('token'));
    let user;
    if (token) {
      user = jwt_decode(token.accessToken);
      if (roles){
        if (roles === user.permission && !this.show) {
          // show the component
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.show = true;
        } else if (!(roles === user.permission)  && this.show){
          // remove the component
          this.viewContainer.clear();
          this.show = false;
        }
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.show = true;
      }
    }
    // Check if the current user has the correct access rights needed for that action
    // the access control also works for user ids
  }

}
