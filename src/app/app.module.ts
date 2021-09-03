import { BrowserModule } from '@angular/platform-browser';
import { DiagramComponent } from './diagram/diagram.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EditingToolsComponent } from './editot-tools/editing-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    EditingToolsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
