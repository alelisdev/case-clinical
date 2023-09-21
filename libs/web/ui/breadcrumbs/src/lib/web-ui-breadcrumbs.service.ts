import { Injectable } from '@angular/core';
import { of } from 'zen-observable';
import { Crumb } from './web-ui-breadcrumbs.component';

@Injectable({ providedIn: 'root' })

export class WebUiBreadcrumService {
    breadCrumbs: Crumb[] = []

    constructor() {
        console.log("Hello from Breadcrumb Service!");
    }

    resetCrumbsToBase(name: string, path: string, isActive: boolean) {
        const newCrumb: Crumb = { name: name, path: path, isactive: isActive, active: "" }
        this.breadCrumbs = [newCrumb]
        return this.breadCrumbs
    }

    addCrumb(name: string, path: string, isActive: boolean) {
        const newCrumb: Crumb = { name: name, path: path, isactive: isActive, active: "" }
        this.breadCrumbs.push(newCrumb)
        return this.breadCrumbs;
    }
}