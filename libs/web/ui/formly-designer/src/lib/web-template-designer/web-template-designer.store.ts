import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { FormLayout, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { EMPTY, switchMap, tap } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface WebTemplateDesignerState {
  loading: boolean,
  query: string,
  templates: FormLayout[],
  item: FormLayout
}

@Injectable()
export class WebTemplateDesignerStore extends ComponentStore<WebTemplateDesignerState> {
  constructor(
    private formService: FormService,
    private data: WebCoreDataAccessService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
  ) {
    super({
      query: "",
      loading: false,
      templates: [],
      item: null,
    })
  }

  loading$ = this.select(s => s.loading)
  templates$ = this.select(s => s.templates)
  item$ = this.select(s => s.item)

  vm$ = this.select(
    this.loading$,
    this.templates$,
    (
      loading,
      templates,
    ) => ({
      loading,
      templates,
    })
  )

  addTemplate = this.updater((state, template: FormLayout) => {
    return {
      ...state,
      templates: [...state.templates, template]
    }
  })

  updateTemplate = this.updater((state, template: FormLayout) => {
    return {
      ...state,
      templates: state.templates.map((el) => {
        if (el.id !== template.id) return el;
        else return template;
      })
    }
  })

  removeItem = this.updater((state) => ({ ...state, item: null }))

  deleteTemplate = this.updater((state, template: FormLayout) => {
    return {
      ...state,
      templates: state.templates.filter((el) => el.id !== template.id)
    }
  })


  createTemplateEffect = this.effect<any>(input$ => input$.pipe(
    tap((input) => { this.patchState({ loading: true }) }),
    switchMap((input) => {
      switch (input.type) {
        case 'Template':
          return this.data.userCreateWebTemplate({ formName: input.name, config: input.config }).pipe(
            tapResponse(
              (response) => {
                input.ref?.close();
                this.toast.success('Successfully created template', { duration: 3000 })
                this.addTemplate(response.data.created);
                this.patchState({
                  loading: false,
                })
              },
              (error: any) => {
                // this.toast.error(error.response.data.message);
                this.toast.error(error.message, { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Component':
          return this.data.userCreateWebComponent({ formName: input.name, config: input.config }).pipe(
            tapResponse(
              (response) => {
                input.ref?.close();
                this.toast.success('Successfully created component', { duration: 3000 })
                this.addTemplate(response.data.created);
                this.patchState({
                  loading: false,
                })
              },
              (error: any) => {
                // this.toast.error(error.response.data.message);
                this.toast.error(error.message, { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Wrapper':
          return this.data.userCreateWebWrapper({ formName: input.name, config: input.config }).pipe(
            tapResponse(
              (response) => {
                input.ref?.close();
                this.toast.success('Successfully created wrapper', { duration: 3000 })
                this.addTemplate(response.data.created);
                this.patchState({
                  loading: false,
                })
              },
              (error: any) => {
                // this.toast.error(error.response.data.message);
                this.toast.error(error.message, { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        default:
          return EMPTY;
      }
    }
    )
  ))

  loadTemplateDetailEffect = this.effect<{ name: string, type: string, postData?: (any) => void }>(input$ => input$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(({ name, type, postData }) => {
      switch (type) {
        case 'Template':
          return this.data.userWebTemplate({ formName: name }).pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  loading: false,
                  item: response.data.template
                });
                const { config, customLayouts, testData, modelData } = response.data.template;
                if(postData)
                  postData({
                    schema: config,
                    customLayouts: JSON.parse(customLayouts ?? '{}'),
                    testData: JSON.parse(testData ?? '{}'),
                    modelData: JSON.parse(modelData ?? '{}'),
                  })
              },
              (error) => {
                console.log(error)
                this.toast.error("Failed to load template", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Component':
          return this.data.userWebComponent({ formName: name }).pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  loading: false,
                  item: response.data.template
                });
                const { config, customLayouts, testData, modelData } = response.data.template;
                if(postData)
                  postData({
                    schema: config,
                    customLayouts: JSON.parse(customLayouts ?? '{}'),
                    testData: JSON.parse(testData ?? '{}'),
                    modelData: JSON.parse(modelData ?? '{}'),
                  })
              },
              (error) => {
                this.toast.error("Failed to load component", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Wrapper':
          return this.data.userWebWrapper({ formName: name }).pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  loading: false,
                  item: response.data.wrapper
                });
                const { config, customLayouts, testData, modelData } = response.data.wrapper;
                if(postData)
                  postData({
                    schema: config,
                    customLayouts: JSON.parse(customLayouts ?? '{}'),
                    testData: JSON.parse(testData ?? '{}'),
                    modelData: JSON.parse(modelData ?? '{}'),
                  })
              },
              (error) => {
                this.toast.error("Failed to load wrapper", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        default:
          return EMPTY;
      }
    }
    )
  ))

  updateTemplateEffect = this.effect<any>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap((input) => {
      console.log({ input })
      switch (input.type) {
        case 'Template':
          return this.data.userUpdateWebTemplate({ formName: input.formName, config: input.config, previewImage: input.previewImage, testData: input.testData, modelData: input.modelData, }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Successfully updated template', { duration: 3000 })
                input.ref?.close();
                this.updateTemplate(response.data.updated)
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to update template", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Component':
          return this.data.userUpdateWebComponent({ formName: input.formName, config: input.config, previewImage: input.previewImage, testData: input.testData, modelData: input.modelData, }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Successfully updated component', { duration: 3000 })
                input.ref?.close();
                this.updateTemplate(response.data.updated)
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to update component", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Wrapper':
          return this.data.userUpdateWebWrapper({ formName: input.formName, config: input.config, previewImage: input.previewImage, testData: input.testData, modelData: input.modelData, }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Successfully updated wrapper', { duration: 3000 })
                input.ref?.close();
                this.updateTemplate(response.data.updated)
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to update wrapper", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        default:
          return EMPTY;
      }
    }
    )
  ))

  loadTemplatesEffect = this.effect<string>(type$ => type$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap((type) => {
      switch (type) {
        case 'Template':
          return this.data.userWebTemplates().pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  loading: false,
                  templates: response.data.templates
                })
              },
              (error) => {
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Component':
          return this.data.userWebComponents().pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  loading: false,
                  templates: response.data.components
                })
              },
              (error) => {
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Wrapper':
          return this.data.userWebWrappers().pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  loading: false,
                  templates: response.data.wrappers
                })
              },
              (error) => {
                this.patchState({
                  loading: false
                })
              }
            )
          )
        default:
          return EMPTY;
      }
    }
    )
  ))

  deleteTemplateEffect = this.effect<{ type: string, name: string }>(input$ => input$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(({ name, type }) => {
      switch (type) {
        case 'Template':
          return this.data.userDeleteWebTemplate({ formName: name }).pipe(
            tapResponse(
              (response) => {

                this.toast.success('Successfully deleted template', { duration: 3000 })
                this.deleteTemplate(response.data.deleted);
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                // this.toast.error("Failed to ", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Component':
          return this.data.userDeleteWebComponent({ formName: name }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Successfully deleted component', { duration: 3000 })
                this.deleteTemplate(response.data.deleted);
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                // this.toast.error("Failed to ", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        case 'Wrapper':
          return this.data.userDeleteWebWrapper({ formName: name }).pipe(
            tapResponse(
              (response) => {

                this.toast.success('Successfully deleted wrapper', { duration: 3000 })
                this.deleteTemplate(response.data.deleted);
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                // this.toast.error("Failed to ", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        default:
          return EMPTY;
      }
    }
    )
  ))
}
