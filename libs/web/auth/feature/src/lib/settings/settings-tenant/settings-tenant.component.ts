import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebUiFormField, FormService } from '@case-clinical/web/ui/form';
import { TenantStore } from './tenant.store';
import { Subject } from 'rxjs';

const countries = [
  {
    id: 'US',
    title: 'United States'
  },
  {
    id: 'CA',
    title: 'Canada'
  },
  {
    id: 'MX',
    title: 'Mexico'
  },
  {
    id: 'FR',
    title: 'France'
  },
  {
    id: 'DE',
    title: 'Germany'
  },
  {
    id: 'IT',
    title: 'Italy'
  },
]

@Component({
  selector: 'settings-tenant',
  templateUrl: './settings-tenant.component.html',
  styleUrls: ['./settings-tenant.component.css'],
  providers: [
    TenantStore
  ]
})
export class SettingsTenantComponent implements OnInit, OnDestroy {

  vm$ = this.store.vm$
  _unsubscribeAll: Subject<any> = new Subject<any>()

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  model: any = {
  }
  options = {
    formState: {
      mainModel: this.model
    }
  }
  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.image('logo', { label: '' }, { className: 'w-full mx-auto' }),
      WebUiFormField.input('name', { label: 'Name' }, { className: 'w-full' }),
      WebUiFormField.input('email', { label: 'Email' }, { className: 'w-full' }),
      WebUiFormField.input('phone', { label: 'Phone' }, { className: 'w-full' }),
      WebUiFormField.dropdown('country', { label: 'Country', items: countries }, { className: 'w-full' }),
    ])
  ]

  /**
  * Constructor
  */
  constructor(
    private store: TenantStore,
    public formService: FormService,
  ) {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll?.next(null)
    this._unsubscribeAll?.complete()
  }

  submit(formData) {
    console.log(formData)
    this.store.updateTenantEffect(formData)
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.store.loadTenantsEffect()

    this.store.selectedTenant$.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(({name, email, phone, country, logo_url}) => {
      this.model = { name, email, phone, country, logo: logo_url ? 'http://localhost:3000' + logo_url : null }
    })
  }

  selectUser(user: any) {
    this.store.selectUser(user)
  }

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
