
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { SettingService } from './setting.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateSettingInput, UserUpdateSettingInput, WebCoreDataAccessService, CorePaging, Setting, User } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface SettingFeatureState {
  errors?: any
  loading?: boolean
  item?: Setting
  done: boolean,
  formName?: string
userId?: string,
  settings: Setting[]
 users?: User[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebSettingFeatureStore extends ComponentStore<SettingFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly settingService: SettingService
) {
    super({ 
      loading: false,
      settings: [],
      done: false,
      searchQuery: '',
      formName: undefined,
userId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('settingId')) {
      var settingId = this.route.snapshot.paramMap.get('settingId')
      this.setFormName('setting_edit')
    } else {
      this.setFormName('setting_create')
    }


    if(this.route.snapshot.paramMap.has("userId")) {
      var userId = this.route.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly settings$ = this.select((s) => s.settings)
  readonly users$ = this.select((s) => s.users || [])

readonly userId$ = this.select((s) => s.userId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.settings$,
this.users$,
    (errors, loading, item, formName, settings, users ) => ({
    errors,
    loading,
    item,
    formName,
    settings,

            users
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.userId$, this.searchQuery$, (paging, userId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    userId: userId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setUserId = this.updater((state, userId: string) => ({
                ...state,
    userId,
  }))



  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

    

  readonly setItem = this.updater((state, item: Setting) => ({...state, item}))

  addNewSetting = this.updater((state, setting: Setting) => ({ ...state, settings: [...state.settings, setting] }))

  updateSetting = this.updater((state, setting: Setting) => {
    return {
      ...state,
      settings: state.settings.map((el) => {
        if (el.id === setting.id) {
          return setting
        } else {
          return el
        }
      }),
    }
  })

  addSettings = this.updater((state, newSettings: any[]) => ({...state, settings: state.settings.concat(newSettings) }))
  updateSettings = this.updater((state, updatedSettings: any[]) => {
    return {
      ...state,
      settings: state.settings.map((setting) => {
        const updated = updatedSettings.find((el) => el.id === setting.id);
        return updated ? updated : setting;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.settingService.validateSettingExcelData(excelData, vm.users);
      })
    )
  }


  readonly loadSettingEffect = this.effect<string>((settingId$) =>
    settingId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((settingId) =>
        this.data.userSetting({ settingId }).pipe(
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



  readonly loadSettingsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userSettings({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                settings: res.data.items,
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

  readonly createSettingEffect = this.effect<UserCreateSettingInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.settingService.createSetting({...input }).pipe(
          tapResponse(
            (setting: Setting) => {
              this.addNewSetting(setting)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: setting, loading: false, done: true }), 300);
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

    readonly updateSettingEffect = this.effect<UserUpdateSettingInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.settingService.updateSetting(input, input.id).pipe(
              tapResponse(
                (setting) => {
                  this.updateSetting(setting)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: setting, loading: false, done: true }), 300);
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
  
    readonly deleteSettingEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, setting]) => {
          return this.data.userDeleteSetting({settingId: setting.id})
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

  readonly importExcelEffect = this.effect<UserUpdateSettingInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.settingService.importSettings(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addSettings(created);
            this.updateSettings(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
