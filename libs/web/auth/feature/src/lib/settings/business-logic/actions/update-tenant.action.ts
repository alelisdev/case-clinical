import { HttpHeaders } from '@angular/common/http';
import { StringIsNotNullEmptyRange } from '@schema-driven/rules-engine';
import { SettingsBusinessActionBase } from './settings.business-action-base'
import { IsNotNullOrUndefined } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'
import { Tenant, AdminUpdateTenantInput } from '@case-clinical/web/core/data-access'

export class UpdateTenantAction extends SettingsBusinessActionBase<Tenant> {
  constructor(private tenantId: string, private avatar: File, private input: AdminUpdateTenantInput) {
    super('UpdateTenantAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined('tenantId', 'tenantId should not be null', this.tenantId, true)
    ).addRule(
      new StringIsNotNullEmptyRange('name', 'Name should be more than 2 characters', this.input.name, 2, 20, true)
    ).addRule(
      new StringIsNotNullEmptyRange('email', 'Email should be more than 2 characters', this.input.email, 2, 20, true)
    ).addRule(
      new StringIsNotNullEmptyRange('phone', 'Phone should be more than 2 characters', this.input.phone, 2, 20, true)
    ).addRule(
      new StringIsNotNullEmptyRange('country', 'You have to select one of the countries', this.input.country, 2, 2, true)
    )
  }

  performAction() {
    console.log(this.avatar)
    if(this.avatar && typeof(this.avatar) !== 'string' ) {
      const formData = new FormData();
      formData.append('operations', '{"query": "mutation UploadFile($file: Upload!) { uploaded: uploadFile(file: $file) { url }}"}');
      formData.append('map', '{"0": ["variables.file"]}');
      formData.append('0', this.avatar)
      const accessToken = localStorage.getItem('accessToken')
      console.log(accessToken)
      this.response = this.businessProvider.http.post('http://127.0.0.1:3000/graphql', formData, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).pipe(
        catchError((error) => {
          console.log(error)
          return EMPTY;
        }),
        switchMap((response: any) => {
          console.log(response)
          return of(response.data.uploaded.url)
        })
      ).pipe(
        switchMap((logo_url) => this.businessProvider.data.adminUpdateTenant({ tenantId: this.tenantId, input: { ...this.input, logo_url } }).pipe
        (
          catchError((error) => {
            this.response = this.createFailResponse();
            return EMPTY;
          }),
          switchMap((result) => {
            return of(result.data.updated)
          })
        ))
      )
    } else {
      this.response = this.businessProvider.data.adminUpdateTenant({ tenantId: this.tenantId, input: this.input }).pipe
        (
          catchError((error) => {
            this.response = this.createFailResponse();
            return EMPTY;
          }),
          switchMap((result) => {
            return of(result.data.updated)
          })
        )
    }
  }
}
