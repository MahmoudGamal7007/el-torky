import { Component, OnInit } from '@angular/core';
import { ConnectBackendService } from './services/connect-backend.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){ }
  
  ngOnInit() {
  }
  title = 'el-torky';
}

