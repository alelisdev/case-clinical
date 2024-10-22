import { Component } from '@angular/core'
import { MobileCoreDataAccessService } from '@case-clinical/mobile/core/data-access'
import { map } from 'rxjs/operators'

@Component({
  template: `
    <ng-container *ngIf="me$ | async as me">
      <ui-page pageTitle="Dashboard">
        <ion-card>
          <ion-card-header>
            <div class="ion-text-start ion-justify-content-start ion-align-items-center" [style.display]="'flex'">
              <ion-avatar *ngIf="me?.avatarUrl" class="ion-margin-end">
                <img [attr.src]="me?.avatarUrl" alt="User Avatar" />
              </ion-avatar>
              <div>
                <ion-card-title>{{ me?.name }}</ion-card-title>
                <ion-card-subtitle>{{ me?.email }}</ion-card-subtitle>
              </div>
            </div>
          </ion-card-header>
          <ion-card-content>
            <div>
              <ion-button routerLink="/account" fill="outline" slot="end">Manage Account</ion-button>
              <ion-button routerLink="/about" fill="outline" slot="end">About</ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </ui-page>
    </ng-container>
  `,
})
export class MobileDashboardFeatureComponent {
  me$ = this.data.me().pipe(map((res) => res.data.me))
  constructor(private readonly data: MobileCoreDataAccessService) {}
}
