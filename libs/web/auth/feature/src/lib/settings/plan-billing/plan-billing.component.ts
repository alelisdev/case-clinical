import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormService } from '@case-clinical/web/ui/form';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PlanBillingStore } from './plan-billing-store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-plan-billing',
  templateUrl: './plan-billing.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PlanBillingStore
  ]
})
export class SettingsPlanBillingComponent implements OnInit {
  @Input() isSignUpProcess = false
  vm$ = this.store.vm$
  formModel = {}
  /**
   * Constructor
   */
  constructor(
    public formService: FormService,
    public store: PlanBillingStore,
    private confirmService: FuseConfirmationService
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.store.loadPlansEffect()
    this.store.loadBillingInfo()
  }

  updatePlan(newPlanId: string) {
    const dlg = this.confirmService.open({
      title: "Change your plan",
      message: "Are you sure you want to change your plan?",
    })
    dlg.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.store.selectPlan(newPlanId)
      }
    })
  }

  create(formData) {
    alert(JSON.stringify(formData))
    this.store.createCardInfoEffect(formData);
  }

  update(formData) {
    this.store.updateCardInfoEffect(formData)
    // alert(JSON.stringify(formData))
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
