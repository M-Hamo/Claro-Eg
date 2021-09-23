import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ToastrModule } from 'ngx-toastr';
// charts
import { NgApexchartsModule } from 'ng-apexcharts';
// Shared component
import { EsriMapComponent } from './components/esri-map-component/esri-map.component';
import { RadialBarComponent } from './components/radial-bar/radial-bar.component';
// chat
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NgAudioRecorderModule } from 'ng-audio-recorder';

import { NumberWithCommasPipe } from './pipes/number-with-commas.pipe';

const LOCAL_COMPONENTS: any[] = [];
const SHARED_COMPONENTS: any[] = [
  EsriMapComponent,
  RadialBarComponent,
  NumberWithCommasPipe,
];

const SHARED_PIPES: any[] = [NumberWithCommasPipe];

const LOCAL_DIRECTIVES: any[] = [];

const SHARED_DIRECTIVES: any[] = [];

const THIRD_MODULES = [
  MaterialModule,
  FlexLayoutModule,
  TranslateModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  ToastrModule,
  NgxAudioPlayerModule,
  NgAudioRecorderModule,
  // HighchartsChartModule,
];

const COMMON_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  NgApexchartsModule,
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...LOCAL_COMPONENTS,
    ...LOCAL_DIRECTIVES,
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES,
  ],
  imports: [...COMMON_MODULES, ...THIRD_MODULES],
  exports: [
    ...SHARED_COMPONENTS,
    ...COMMON_MODULES,
    ...THIRD_MODULES,
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES,
  ],
})
export class SharedModule {}
