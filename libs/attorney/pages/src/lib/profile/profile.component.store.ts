import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { FormService } from '@case-clinical/web/ui/form'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { Injectable, Injector } from '@angular/core'
import { Router } from '@angular/router'
import { switchMap, of, tap, pipe } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ProfileState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class ProfileStore extends AttorneyBaseStore<ProfileState> {
  constructor(
    private authStore: WebAuthStore,
    private data: WebCoreDataAccessService,
    private formService: FormService,
    private genderStore: WebGenderFeatureStore,
    private loading: FuseLoadingService,
    private router: Router,
    private toast: WebUiToastService,
    injector: Injector,
  ) {
    super(injector)
  }

  loading$ = this.select((s) => s.loading)

  profile$ = this.data.me().pipe(
    switchMap((res) => {
      return of({
        ...res.data.me,
        document: res.data.me?.avatarUrl
          ? {
              name: 'ProfileImage.png',
              attachment: res.data.me.avatarUrl,
            }
          : undefined,
      })
    }),
  )

  me$ = this.profile$

  vm$ = this.select(this.loading$, this.user$, (loading, user) => {
    return {
      loading,
      user,
    }
  })

  model$ = this.select(this.me$, this.selectedAttorneyId$, (me, attorneyId) => ({ ...me, attorneyId }))

  updateUserProfileEffect = this.effect<any>((formData$) =>
    formData$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap((formData) => {
        const { firstName, lastName, cellPhone, dateOfBirth, line1, document, line2, city, state, postalCode } =
          formData
        return this.data
          .accountUpdateProfile({
            input: {
              firstName,
              lastName,
              phone: cellPhone,
              dateOfBirth,
              line1,
              document,
              line2,
              city,
              state,
              postalCode,
            },
          })
          .pipe(
            tapResponse(
              () => {
                this.toast.success('Successfully updated profile', { duration: 3000 })
                this.authStore.meEffect()
                this.patchState({
                  loading: false,
                })
              },
              () => {
                this.toast.error('Failed to update profile', { duration: 3000 })
                this.patchState({
                  loading: false,
                })
              },
            ),
          )
      }),
    ),
  )

  override getInitialState(): ProfileState {
    return {
      query: '',
      loading: false,
    }
  }
}
