import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Crumb } from "./master-breadcrumb.component";



@Injectable({ providedIn: 'root' })

export class Ng7DynamicBreadcrumbService {

    public breadcrumbLabels: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public newBreadcrumb: BehaviorSubject<Crumb[]> = new BehaviorSubject<Crumb[]>([]);

    constructor() {console.log("Ok") }

    updateBreadcrumbLabels(labels: any) {
        this.breadcrumbLabels.next(labels);
    }

    updateBreadcrumb(newBreadcrumb: Crumb[]) {
        this.newBreadcrumb.next(newBreadcrumb);
    }
    

}