import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const components = [
  MatInputModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatIconModule
];



@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class MaterialModule { }
