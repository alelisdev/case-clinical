import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridTheme, AppConfig, Scheme, Theme, Themes } from '@case-clinical/core/config';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '../../../../@fuse/services/config';
import { Layout } from '../../web-layout/src/lib/layout.types';

@Component({
  selector: 'theme-settings',
  templateUrl: './settings.component.html',
  styles: [
    `
    settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy {
  config: AppConfig;
  layout: Layout;
  scheme: 'dark' | 'light';
  theme: string;
  themes: Themes;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  gridThemes = [
    'alpine',
    'balham',
    'material',
    'alpine-dark',
    'balham-dark',
  ]

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _fuseConfigService: FuseConfigService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {

        // Store the config
        this.config = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router.navigate([], {
      queryParams: {
        layout: null
      },
      queryParamsHandling: 'merge'
    }).then(() => {

      // Set the config
      this._fuseConfigService.config = { layout };
    });
  }

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme };
  }

  /**
   * Set the agGrid theme on the config
   *
   * @param scheme
   */
  setAgGridTheme(agGridTheme: AgGridTheme): void {
    this._fuseConfigService.config = { agGridTheme };
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme };
  }
}
