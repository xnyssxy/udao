import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { Injectable } from '@angular/core'
import { HttpClientModule, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'
import { Routes, RouterModule }   from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { Observable } from 'rxjs/Observable'

import { AppComponent } from './app.component'
import { TranslateComponent } from './translate/translate.component'
import { HomeComponent } from './home/home.component'
import { SearchComponent } from './search/search.component'
import { DetailComponent } from './detail/detail.component'
import { DetailPhrsListTabComponent } from './detail-phrs-list-tab/detail-phrs-list-tab.component'
import { DetailWebTransComponent } from './detail-web-trans/detail-web-trans.component'
import { DetailAuthTransComponent } from './detail-auth-trans/detail-auth-trans.component'
import { DetailTransformComponent } from './detail-transform/detail-transform.component'
import { DetailExamplesComponent } from './detail-examples/detail-examples.component'

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material'

import { CdkTableModule } from '@angular/cdk/table'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'translate',
    component: TranslateComponent
  }, {
    path: 'search',
    component: SearchComponent
  }, {
    path: 'detail/:word',
    component: DetailComponent
  }
];

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'https://proxy-oagpwnbkpe.now.sh'

    req = req.clone({
      url: url + req.url
    })

    return next.handle(req)
  }
}

@NgModule({
  exports: [
    CdkTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    HomeComponent,
    SearchComponent,
    DetailComponent,
    DetailPhrsListTabComponent,
    DetailWebTransComponent,
    DetailAuthTransComponent,
    DetailTransformComponent,
    DetailExamplesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'udao' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
