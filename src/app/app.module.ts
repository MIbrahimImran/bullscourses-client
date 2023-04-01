import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './pages/home-page/home-page.module';
import { AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomePageModule,
    AuthModule.forRoot({
      domain: 'dev-emlye3kgd7a8fcl2.us.auth0.com',
      clientId: 'x2QmevFDW71EmRrmU9rC4Hxn6wFgjPQt',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      cacheLocation: 'localstorage',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
