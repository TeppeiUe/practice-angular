import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(
    private breakpoint: BreakpointObserver,
  ) { }

  /**
   * display size is satisfied with mediaQuery:(max-width: 959px)
   */
  public isHandset$: Observable<boolean> = this.breakpoint.observe([
    Breakpoints.Small,
    Breakpoints.XSmall
  ]).pipe(
    map(res => res.matches)
  );

}
