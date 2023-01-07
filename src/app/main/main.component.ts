import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../services/breakpoint.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private breakpoint: BreakpointService,
  ) { }

  ngOnInit(): void {
  }

  get isHandset$() { return this.breakpoint.isHandset$ }

}
