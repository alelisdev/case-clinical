import { FormLayout } from '@case-clinical/web/core/data-access'

export enum FormLayoutStatus {
  LOADING,
  LOADED,
}

export class FormLayoutPool {
  formLayoutMap: Record<string, FormLayout>;
  documetState: Record<string, FormLayoutStatus>;

  constructor() {
    this.formLayoutMap = {};
    this.documetState = {};
  }

  getFormLayoutStatus(formName: string) {
    const formLayoutStatus = this.documetState[formName];
    return formLayoutStatus;
  }

  setFormLayoutStatus(formName: string, formLayoutStatus: FormLayoutStatus) {
    this.documetState[formName] = formLayoutStatus;
  }

  getFormLayout(formName: string): FormLayout {
    return this.formLayoutMap[formName];
  }

  setFormLayout(formLayout: FormLayout) {
    this.formLayoutMap[formLayout.name] = formLayout;
  }
}
