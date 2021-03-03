import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ActionPipe } from './pipes/action.pipe';


@NgModule({
  declarations: [
    ActionPipe,
  ],
  imports: [
    MatSnackBarModule,
  ],
  exports: [
    ActionPipe,
    MatSnackBarModule,
  ],
})
export class SharedModule { }
