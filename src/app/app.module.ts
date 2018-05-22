import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhotographyComponent } from './photography/photography.component';
import { AppsComponent } from './apps/apps.component';
import { CobiComponent } from './cobi/cobi.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { FooterComponent } from './footer/footer.component';
import { PhotoSharingComponent } from './photo-sharing/photo-sharing.component';
import { MenuComponent } from './menu/menu.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'photos', component: PhotographyComponent },
  { path: 'apps', component: AppsComponent },
  { path: 'gps', component: PhotoSharingComponent },
  { path: 'gsc', component: PhotoSharingComponent },
  { path: 'hcu', component: PhotoSharingComponent },
  { path: 'cobi', component: CobiComponent },
  { path: 'resume', component: ResumeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PhotographyComponent,
    AppsComponent,
    CobiComponent,
    HomeComponent,
    ResumeComponent,
    FooterComponent,
    PhotoSharingComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
