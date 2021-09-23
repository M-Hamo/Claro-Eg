import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from 'rxjs/operators';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  private isVisible = true;
  lang: any;
  navToggle = false;

  ngOnInit(): void {
    this.lang = document.documentElement.lang;
  }

  changeLang(lang: any): void {
    window.localStorage.setItem('lang', lang);
    window.location.reload();
  }

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp$ = scroll$.pipe(filter((direction) => direction === Direction.Up));

    const scrollDown = scroll$.pipe(filter((direction) => direction === Direction.Down));

    scrollUp$.subscribe(() => (this.isVisible = true));
    scrollDown.subscribe(() => (this.isVisible = false));
  }

  minueToggle(): void {
    this.navToggle = !this.navToggle;
  }
}
