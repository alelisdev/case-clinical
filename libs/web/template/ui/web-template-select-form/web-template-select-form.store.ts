
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateTemplateInput,
  UserUpdateTemplateInput,
  Template,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TemplateFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  templates: Template[]
}

@Injectable()
export class WebTemplateSelectFormStore extends ComponentStore<TemplateFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      templates: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly templates$ = this.select((s) => s.templates)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.templates$,
    (errors, loading, templates) => ({
      errors,
      loading,
      templates
    }),
    { debounce: true },
  )

  addNewTemplate = this.updater((state, template: Template) => ({ templates: [...state.templates, template] }))

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

  readonly createTemplateEffect = this.effect<{ input: UserCreateTemplateInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateTemplate({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewTemplate(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updateTemplateEffect = this.effect<{ input: UserUpdateTemplateInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateTemplate({ templateId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateTemplate(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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

  loadTemplatesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userTemplates({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                templates: data.data.items,
              })
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )
}

