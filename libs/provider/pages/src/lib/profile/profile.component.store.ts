import { WebSpecialtyFeatureStore } from './../../../../../web/specialty/shared/specialty.store';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { zip, switchMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { WebAuthStore } from '@case-clinical/web/auth/data-access';

export interface ProviderProfileState {
  loading: boolean,
  query: string,
}

@Injectable()
export class ProviderProfileStore extends ComponentStore<ProviderProfileState> {
  constructor( private authStore: WebAuthStore, private specialtyStore: WebSpecialtyFeatureStore, private data: WebCoreDataAccessService,  private toast: WebUiToastService) {
    super({
      query: "",
      loading: false,
    })
  }

  loading$ = this.select(s => s.loading)

  specialites$ = this.data.userClinicalProviderSpecialties().pipe(
    switchMap((res) => of(res.data.items?.map((el) => el.specialty?.id)))
  )
  profile$ = this.data.me().pipe(
    switchMap((res) => {
      return of({
        ...res.data.me,
        document: res.data.me?.avatarUrl ? {
          name: 'ProfileImage.png',
          attachment: res.data.me.avatarUrl,
        } : undefined,
      })
    })
  )

  me$ = zip(this.specialites$, this.profile$).pipe(
    switchMap(([specialties, profile]) => of({
      ...profile,
      specialties,
    }))
  )
  allSpecialties$ = this.specialtyStore.specialties$;

  vm$ = this.select(
    this.loading$,
    this.me$,
    (
      loading,
      me
    ) => ({
      loading,
      me
    })
  )

  updateUserProfileEffect = this.effect<any>(formData$ => formData$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap((formData) => {
      const { firstName, lastName, document, cellPhone, dateOfBirth, bio, line1, line2, city, state, postalCode } = formData;
      return this.data.accountUpdateProfile({
        input: {
          firstName,
          lastName,
          document,
          phone: cellPhone,
          dateOfBirth,
          bio,
          line1,
          line2,
          city,
          state,
          postalCode
        }
      }).pipe(
        tapResponse(
          () => {
            this.toast.success('Successfully updated profile', { duration: 3000 })
            this.authStore.meEffect();
            this.patchState({
              loading: false,
            })
          },
          (error) => {
            this.toast.error("Failed to update profile", { duration: 3000 })
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ))
}
