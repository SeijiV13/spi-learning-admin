import { SessionExpiredComponent } from './core/components/modals/session-expired/session-expired.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './core/interceptors/apikey.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareVideoComponent } from './core/components/modals/share-video/share-video.component';
@NgModule({
  declarations: [
    AppComponent, NotFoundComponent, SessionExpiredComponent, ShareVideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),
    NgxUiLoaderModule.forRoot({
      bgsColor: '#46c81e',
      bgsOpacity: 0.5,
      bgsPosition: 'bottom-right',
      bgsSize: 60,
      bgsType: 'pulse',
      blur: 8,
      delay: 0,
      fastFadeOut: true,
      fgsColor: '#22b032',
      fgsPosition: 'center-center',
      fgsSize: 60,
      fgsType: 'square-jelly-box',
      gap: 24,
      logoPosition: 'center-center',
      logoSize: 120,
      logoUrl: 'https://spi.ph/wp-content/uploads/2019/03/logo.png',
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgba(255,255,255,0.8)',
      pbColor: '#468f0e',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: '',
      textColor: '#FFFFFF',
      textPosition: 'center-center',
      maxTime: -1,
      minTime: 300
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [SessionExpiredComponent]
})
export class AppModule { }
