
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { TemplateService } from './template.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateTemplateInput, UserUpdateTemplateInput, WebCoreDataAccessService, CorePaging, Template,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface TemplateFeatureState {
  errors?: any
  loading?: boolean
  item?: Template
  done: boolean,
  formName?: string

  templates: Template[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebTemplateFeatureStore extends ComponentStore<TemplateFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly templateService: TemplateService
) {
    super({ 
      loading: false,
      templates: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('templateId')) {
      var templateId = this.route.snapshot.paramMap.get('templateId')
      this.setFormName('template_edit')
    } else {
      this.setFormName('template_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly templates$ = this.select((s) => s.templates)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.templates$,

    (errors, loading, item, formName, templates,  ) => ({
    errors,
    loading,
    item,
    formName,
    templates,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: Template) => ({...state, item}))

  addNewTemplate = this.updater((state, template: Template) => {
    console.log(state.templates);
    return ({ ...state, templates: [...state.templates, template] })
  })

  updateTemplate = this.updater((state, template: Template) => {
    return {
      ...state,
      templates: state.templates.map((el) => {
        if (el.id === template.id) {
          return template
        } else {
          return el
        }
      }),
    }
  })

  addTemplates = this.updater((state, newTemplates: any[]) => ({...state, templates: state.templates.concat(newTemplates) }))
  updateTemplates = this.updater((state, updatedTemplates: any[]) => {
    return {
      ...state,
      templates: state.templates.map((template) => {
        const updated = updatedTemplates.find((el) => el.id === template.id);
        return updated ? updated : template;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  // validateImportData(excelData: any[]) {
  //   return this.vm$.pipe(
  //     switchMap((vm) => {
  //       return this.templateService.validateTemplateExcelData(excelData);
  //     })
  //   )
  // }


  readonly loadTemplateEffect = this.effect<string>((templateId$) =>
    templateId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((templateId) =>
        this.data.userTemplate({ templateId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )



  readonly loadTemplatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTemplates({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                templates: res.data.items,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly createTemplateEffect = this.effect<UserCreateTemplateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.templateService.createTemplate({...input }).pipe(
          tapResponse(
            (template: Template) => {
              this.addNewTemplate(template)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: template, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updateTemplateEffect = this.effect<UserUpdateTemplateInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.templateService.updateTemplate(input, input.id).pipe(
              tapResponse(
                (template) => {
                  this.updateTemplate(template)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: template, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteTemplateEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, template]) => {
          return this.data.userDeleteTemplate({templateId: template.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  // readonly importExcelEffect = this.effect<UserUpdatetemplateInput[]>(($data) =>
  //   $data.pipe(
  //     tap(() => this.patchState({loading: true })),
  //     switchMap((data) => this.templateService.importtemplates(data).pipe(
  //       catchError(error => {
  //         this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
  //         return EMPTY;
  //       }),
  //       tap(
  //         (updateResult) => {
  //           const created = JSON.parse(updateResult.created);
  //           const updated = JSON.parse(updateResult.updated);
  //           const failed = JSON.parse(updateResult.failed);
  //           const total = created.length + updated.length + failed.length;

  //           this.addtemplates(created);
  //           this.updatetemplates(updated);

  //           this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
  //         }
  //       )
  //     ))
  //   )
  // )

}
