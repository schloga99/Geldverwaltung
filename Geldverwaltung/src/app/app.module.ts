import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MainPage } from '../pages/Main/Main';
import { GlobalVars } from '../providers/globals';
import { DetailsPage } from '../pages/DetailsPage/Details';
import { ModalPage } from '../pages/ModalPage/Modal';
import { Keyboard } from '@ionic-native/keyboard';
@NgModule({
    declarations: [
        MyApp,
        MainPage,
        DetailsPage,
        ModalPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)


    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MainPage,
        DetailsPage,
        ModalPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, GlobalVars]
})
export class AppModule { }
