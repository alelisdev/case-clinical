/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized, RouterEvent } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Ng7DynamicBreadcrumbService } from './master-breadcrumb.service';
import { FormlyJsonFormViewsStore } from '@case-clinical/web/ui/formly-designer';

export interface Crumb {
    class?: string
    name: string
    active?: string
    isactive?: boolean
    tabHandler?: (Crumbs) => void
    content?: any
    path: string,
    items?: string[] | undefined
}

export enum ViewMode {
    FullWidthBar,
    SimpleChevron,
    StandardTop
}

@Component({
    styleUrls:['./master-breadcrumb.component.scss'],
    selector: 'app-ng7-dynamic-breadcrumb',
    templateUrl: './master-breadcrumb.component.html',
})
export class Ng7DynamicBreadcrumbComponent implements OnInit {

    breadcrumb: Crumb[] = [];
    @Input() bgColor = '#eee';
    @Input() fontSize = '18px';
    @Input() fontColor = '#0275d8';
    @Input() lastLinkColor = '#000';
    @Input() symbol = ' / ';
    params: { [key: string]: any; };
    VIEW_MODE: typeof ViewMode = ViewMode
    @Input() viewMode?: ViewMode = ViewMode.StandardTop

    views$ = this.formlyJsonFormViewsStore.getViews('legalCase_overview_test_2');

    getCurrentViewId(formName) {
      return this.formlyJsonFormViewsStore.getCurrentViewId(formName);
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private ng7DynamicBreadcrumbService: Ng7DynamicBreadcrumbService,
        public formlyJsonFormViewsStore: FormlyJsonFormViewsStore,
    ) {
        this.formlyJsonFormViewsStore.views$.subscribe((views) => console.log({ views }))
        this.breadCrumbData();

    }

    ngOnInit() {
        this.ng7DynamicBreadcrumbService.breadcrumbLabels.subscribe((labelData) => {
            for (const label in labelData) {
                if (labelData.hasOwnProperty(label)) {
                    this.breadcrumb.map((crumb) => {
                        const labelParams = crumb.name.match(/[^{{]+(?=\}})/g);
                        if (labelParams) {
                            for (const labelParam of labelParams) {
                                const dynamicData = labelData[label];
                                if (labelParam === label) {
                                    crumb.name = crumb.name.replace('{{' + labelParam + '}}', dynamicData);
                                }
                            }
                        }
                    });
                }
            }
        });

        this.ng7DynamicBreadcrumbService.newBreadcrumb.subscribe((breadcrumb: Crumb[]) => {
            if (breadcrumb.length > 0) {
                this.updateData(this.activatedRoute, breadcrumb);
            }
        });

        this.params = this.activatedRoute.snapshot.params;
        this.updateData(this.activatedRoute, null)
    }

    breadCrumbData(): void {
        this.router.events
            .pipe(filter(event => (event instanceof NavigationEnd)))
            .pipe(map(() => this.activatedRoute))
            .pipe(map((route) => {
                while (route.firstChild) { route = route.firstChild; }
                return route;
            }))
            .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
            .subscribe(route => {
                this.params = route.snapshot.params;
                console.log("2 ", route.snapshot.params)
                this.updateData(route, null);
            });
    }

    private updateData(route, newBreadcrumb): void {
        if (route.snapshot.data.breadcrumb || newBreadcrumb) {

            const data = route.snapshot.data.breadcrumb ? route.snapshot.data.breadcrumb : newBreadcrumb;
            const breadcrumb = (JSON.parse(JSON.stringify(data)));
            breadcrumb.map((crumb) => {

                const urlChunks = crumb.path.split('/');
                for (const chunk of urlChunks) {
                    if (chunk.includes(':')) {
                        const paramID = chunk.replace(':', '');

                        // const routerParamID = route.snapshot.params[paramID];
                        const routerParamID = this.params[paramID];
                        crumb.path = crumb.path.replace(`:${paramID}`, routerParamID);
                    }
                }

                const labelParams = crumb.name.match(/[^{{]+(?=\}})/g);
                if (labelParams) {
                    for (const labelParam of labelParams) {
                        // const routerParamID = route.snapshot.params[labelParam.trim()];
                        const routerParamID = this.params[labelParam.trim()];
                        if (routerParamID) {
                            crumb.label = crumb.label.replace('{{' + labelParam + '}}', routerParamID);
                        } else {
                            // crumb.label = crumb.label.replace('{{' + labelParam + '}}', '');
                        }
                    }
                }

            });
            this.breadcrumb = breadcrumb;
        } else {
            this.breadcrumb = [];
        }
    }
}
