import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { WebCoreDataAccessService } from "@case-clinical/web/core/data-access";
import { Observable, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class WebLegalCaseDetailResolver implements Resolve<string|undefined> {

  constructor(private data: WebCoreDataAccessService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string|undefined> | Promise<string> {
    console.log('web legal case detail resolver');
    const legalCaseId = route.paramMap.get('legalCaseId');
    return this.data.userLegalCase({ legalCaseId }).pipe(map((res) => {
      if(res.data?.item) return res.data.item.name;
      else return undefined;
    }))
  }
}
