import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ArticleComponent } from './article/article.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { D3chartComponent } from './d3chart/d3chart.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    HomepageComponent,
    FooterComponent,
    AboutComponent,
    LoginComponent,
    P404Component,
    ArticleComponent,
    BreadcrumbsComponent,
    ContactComponent,
    D3chartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
