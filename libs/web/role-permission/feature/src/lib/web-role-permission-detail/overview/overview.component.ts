

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebRolePermissionFeatureStore } from '@case-clinical/web/role-permission/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="rolePermission_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebRolePermissionFeatureStore],
})
export class WebRolePermissionOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebRolePermissionFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadRolePermissionEffect(this.route.params.pipe(pluck('rolePermissionId')))
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['../../../'], {relativeTo: this.route});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteRolePermissionEffect()
    }
  }

  
}

