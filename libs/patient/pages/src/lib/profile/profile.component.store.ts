/* eslint-disable @typescript-eslint/no-empty-function */
import { tapResponse } from '@ngrx/component-store'
import { Injectable, Injector } from '@angular/core'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { UserUpdatePatientInput, UserUpdateUserInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { switchMap, of, tap } from 'rxjs'
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
import { getAge } from '@case-clinical/shared/util/helpers'

export interface PatientProfileState extends PatientBaseState {
  loading: boolean
  query: string,
  user?: UserUpdateUserInput,
  patient?: UserUpdatePatientInput,
}

@Injectable()
export class PatientProfileStore extends PatientBaseStore<PatientProfileState> {
  constructor(
    private data: WebCoreDataAccessService,
    private toast: WebUiToastService,
    private authStore: WebAuthStore,
    private genderStore: WebGenderFeatureStore,
    injector: Injector,
  ) {
    super(injector);
    this.genderStore.loadGendersEffect();
  }

  loading$ = this.select((s) => s.loading)
  userProfile$ = this.data.me().pipe(
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
  userDetails$ = this.select(this.authStore.user$, this.patient$, (user:any, patient: any) => {
    let genderAndDob = ''
    if (patient?.gender) genderAndDob = patient.gender.name as string
    if (user?.dateOfBirth) {
      const age = getAge(user.dateOfBirth)
      if (genderAndDob) genderAndDob += ` - ${age} Years`
      else genderAndDob = `${age} Years`
    }
    const userData: any = {
      ...user,
      genderAndDob,
      userfirstName: user?.firstName,
      userlastName: user?.lastName,
      document: user?.avatarUrl
          ? {
            name: 'ProfileImage.png',
            attachment: user.avatarUrl,
          }
          : undefined,
    }
    console.log(userData)
    return userData;
  })

  profile$ = this.select(this.userDetails$, this.patient$, ( user, patient ) => ({ user, patient }))

  genders$ = this.genderStore.genders$;
  me$ = this.profile$

  vm$ = this.select(this.loading$, this.userDetails$, this.membership$, (loading, user, membership) => ({
    loading,
    user,
    membership,
  }))

  model$ = this.select(this.me$, this.selectedLegalCaseId$, (me, legalCaseId) => ({ ...me, legalCaseId }))

  updateUserProfileEffect = this.effect<any>((formData$) =>
    formData$.pipe(
      tap((formData) => {
        console.log(formData);
        this.patchState({ loading: true })
      }),
      switchMap(({ user, patient }) => {
        const {
          userfirstName,
          userlastName,
          cellPhone,
          dateOfBirth,
          document,
          line1,
          line2,
          city,
          state,
          postalCode,
        } = user;

        return this.data
          .accountUpdateProfile({
            input: {
              firstName: userfirstName,
              lastName: userlastName,
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
            switchMap((response) => {
              const {
                genderId,
                primaryAddressLine1,
                primaryAddressLine2,
                primaryAddressCity,
                primaryAddressStateOrProvince,
                postalCode,
                mobileNumber,
                workAddressCity,
                workAddressLine1,
                dateOfBirth,
                workAddressLine2,
                workAddressPostalCode,
                workAddressStateOrProvince,
                workLatitude,
                firstName,
                lastName,
                workLongitude,
                homeAddress,
                workAddress
              } = patient;

              return this.data.userUpdatePatient({
                patientId: response.data?.accountUpdateProfile?.patientId as string,
                input: {
                  firstName,
                  lastName,
                  primaryAddressLine1,
                  primaryAddressLine2,
                  primaryAddressCity,
                  genderId,
                  primaryAddressPostalCode: postalCode,
                  primaryAddressStateOrProvince,
                  mobileNumber,
                  workAddressCity,
                  workAddressLine1,
                  workAddressLine2,
                  workAddressPostalCode,
                  workAddressStateOrProvince,
                  workLatitude,
                  workLongitude,
                  latitude: patient?.latitude,
                  longitude: patient?.longitude,
                  dateOfBirth,
                  homeAddress:homeAddress?.formatedAddress,
                  workAddress:workAddress?.formatedAddress
                },
              })
            }
            ),
          )
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

  override getInitialState(): PatientProfileState {
    return {
      query: '',
      loading: false,
    }
  }
}
