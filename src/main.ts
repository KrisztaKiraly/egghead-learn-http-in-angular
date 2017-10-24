//main entry point
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app';
import {enableProdMode} from '@angular/core';

// remove console.log about development mode
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)