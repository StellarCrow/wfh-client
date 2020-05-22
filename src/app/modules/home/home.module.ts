import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [WelcomeComponent, AboutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule
  ],
  exports: [WelcomeComponent, AboutComponent, HeaderComponent]

})
export class HomeModule { }
