import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

const components = [
  MatSidenavModule
];



@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class MaterialModule { }
