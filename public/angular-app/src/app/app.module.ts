import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipComponent } from './ship/ship.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    ShipsComponent,
    ShipComponent,
    HomeComponent,
    ErrorpageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "search",
        component: SearchComponent
      },
      {
        path: "ships",
        component: ShipsComponent
      },
      {
        path: "ships/:shipId",
        component: ShipComponent
      },
      {
        path: "**",
        component: ErrorpageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
