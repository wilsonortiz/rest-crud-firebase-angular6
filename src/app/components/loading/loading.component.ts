import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="col-md-10 text-center animated fadeIn fast">
                <i class="fas fa-spinner fa-2x fa-spin"></i>
              </div>`
})
export class LoadingComponent {

  constructor() { }
}
