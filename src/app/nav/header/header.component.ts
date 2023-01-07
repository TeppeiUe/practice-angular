import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private breakpoint: BreakpointService,
  ) { }

  ngOnInit(): void {
  }

  get isHandset$() { return this.breakpoint.isHandset$ }
  get user$() { return this.auth.user$ }

}
