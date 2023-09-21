import { groupBy, groupByList } from '@case-clinical/shared/util/helpers'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Injectable, Injector } from '@angular/core'
import { switchMap, of, tap, withLatestFrom } from 'rxjs'
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store'
import { FormService } from '@case-clinical/web/ui/form'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { ActivatedRoute } from '@angular/router'
import { DatePipe } from '@angular/common'
import * as moment from 'moment'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { ClinicalProvider, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { combineLatest } from 'rxjs'
import { ModalController } from '@case-clinical/web/ui/form'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

export interface ProvidersState extends ProviderBaseState {
  loading: boolean
  query: string
  modalController: ModalController | undefined
  selectedReview: any | undefined
  businessHours: any
}

@Injectable()
export class ProvidersStore extends ProviderBaseStore<ProvidersState> {
  providerUpdateFormlyModalController?: FormlyModalController;
  currentProviderId?:string;
  constructor(
    private toast: WebUiToastService,
    private providerStore: WebClinicalProviderFeatureStore,
    private locationStore: WebLocationFeatureStore,
    private clinialProviderLocationStore:WebClinicalProviderLocationFeatureStore,
    private readonly route: ActivatedRoute,
    private documentStore: WebDocumentFeatureStore,
    private reviewStore: WebReviewFeatureStore,
    private data: WebCoreDataAccessService,
    private tagStore: WebTagFeatureStore,
    private specialtyStore: WebSpecialtyFeatureStore,
    injector: Injector,
  ) {
    super(injector)
    this.patchState({
      query: '',
      loading: false,
    })
    if (this.route.snapshot.paramMap.has('providerId')) {
      const providerId = this.route.snapshot.paramMap.get('providerId') ?? ''
      this.currentProviderId = providerId 
      this.providerStore.loadClinicalProviderEffect(providerId)
      this.reviewStore.setClinicalProviderId(providerId)
      this.reviewStore.loadReviewsEffect()
      this.loadBusinessHoursEffect(providerId)
    }

    this.tagStore.loadTagsEffect();
    this.specialtyStore.loadSpecialtiesEffect();
  }

  readonly setModalController = this.updater((state, controller: ModalController) => ({
    ...state,
    modalController: controller,
  }))

  readonly setSelectedReview = this.updater((state, selectedReview: any) => ({
    ...state,
    selectedReview,
  }))

  businessHours$ = this.select((s) => {
    const businessHours = s.businessHours
    const grouped: Record<string, any> = groupBy(businessHours, (availability: any) => availability.day)
    const result = []
    let sundayFlag = false
    const currentDate = moment().format('ll') + ''
    const currentDay = moment().format('dddd') + ''
    let currentHours: any
    for (const key in grouped) {
      let tempHours = grouped[key]
      tempHours.sort(
        (a: { startTime: string }, b: { startTime: string }) => Date.parse(a.startTime) - Date.parse(b.startTime),
      )
      tempHours = tempHours.map( (item: any) => {
        item.startTime = moment(item.startTime,'hh:mm A').format('HH:mm')
        item.endTime = moment(item.endTime,'hh:mm A').format('HH:mm')
        return item
      });
      if (key === currentDay) currentHours = tempHours
      result.push({
        day: key,
        hours: tempHours,
      })
      if (key === 'Sunday') sundayFlag = true
    }

    const todayHours = {
      day: currentDate,
      hours: currentHours,
    }
    const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    result.sort((a, b) => WeekDays.indexOf(a.day) - WeekDays.indexOf(b.day))
    return {
      todayHours,
      others: result,
      sundayFlag,
    }
  })

  providerDetails$ = this.providerStore.item$

  doctor$ = this.providerDetails$.pipe(
    switchMap((providerDetail) => {
      return of({
        ...providerDetail,
        mainLocation: providerDetail?.clinicalProviderLocations?.at(0)?.location?.name,
        mainSpecialty: providerDetail?.clinicalProviderSpecialties?.at(0)?.specialty?.name,
        educations: providerDetail?.educations?.map((education) => {
          return {
            ...education,
            from: moment(education.from).format('YYYY'),
            to: moment(education.to).format('YYYY'),
          }
        }),
        experiences: providerDetail?.experiences?.map((experience) => {
          return {
            ...experience,
            from: moment(experience.from).format('YYYY'),
            to: moment(experience.to).format('YYYY'),
            duration: Math.abs(
              Number(moment(experience.to).format('YYYY')) - Number(moment(experience.from).format('YYYY')),
            ),
          }
        }),
        awards: providerDetail?.awards?.map((award) => {
          return {
            ...award,
            awardedAt: moment(award.awardedAt).format('MMM') + ' ' + moment(award.awardedAt).format('YYYY'),
          }
        }),
        services: providerDetail?.services?.map((service) => {
          return {
            ...service,
            name: service.service?.name,
          }
        }),
        disableEditing: false,
        hideViewProfile:true,
      })
    }),
  )

  reviews$ = this.reviewStore.reviews$

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  loading$ = this.select((s) => s.loading)

  vm$ = this.select(
    this.loading$,
    this.doctor$,
    this.reviews$,
    this.user$,
    this.vendor$,
    this.businessHours$,
    (loading, doctor, reviews, user, vendor, businessHours) => {
      const customDoctor = {
        ...doctor,
        locationImages: doctor?.clinicalProviderLocations?.at(0)?.location?.locationImages,
        mainLocation: doctor.clinicalProviderLocations?.at(0)?.location,
        locations: doctor?.clinicalProviderLocations?.map(({ location, clinicalProviderLocationAvailabilities }) => ({
          id: location?.id,
          name: location?.name,
          document: location?.locationImages?.at(0),
          vendor: doctor?.vendor?.name,
          rating: doctor?.rating,
          businessHours: groupByList(
            clinicalProviderLocationAvailabilities ?? [],
            (availability: any) => availability.day,
          ),
        })),
        specialties: doctor.clinicalProviderSpecialties?.map(({ specialty }) => ({
          name: specialty?.name,
        })),
        recommendPercent: Math.floor(100 * Math.random()),
      }

      const customReviews = reviews.map((review) => {
        return {
          reviewId: review.id,
          passedDays: moment().diff(moment(review.reivewDateAndTime), 'days') + ' days ago',
          recommeneded: true,
          rate: review?.rating,
          notes: review?.comment,
          patient: {
            id: review.patientId,
            name: review.patient?.firstName + ' ' + review.patient?.lastName,
            avatar:
              'https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
          },
          replies: review?.childrenReviews?.map((childReview) => {
            return {
              passedDays: moment().diff(moment(childReview.reivewDateAndTime), 'days') + ' days ago',
              notes: childReview.comment,
              patient: {
                patientId: childReview?.patient?.id,
                name: childReview.patient?.firstName + ' ' + childReview.patient?.lastName,
                avatar:
                  'https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
              },
            }
          }),
        }
      })

      return {
        loading,
        doctor: customDoctor,
        reviews: customReviews,
        businessHours,
        user,
        vendor,
      }
    },
  )

  loadBusinessHoursEffect = this.effect<string>((clinicalProviderId$) =>
    clinicalProviderId$.pipe(
      tap((clinicalProviderId) => {
        this.patchState({ loading: true })
      }),
      switchMap((clinicalProviderId) =>
        this.data.userClinicalProviderBusinessHours({ clinicalProviderId }).pipe(
          tapResponse(
            (response) => {
              return this.patchState({
                loading: false,
                businessHours: response.data.items,
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

  loadImageDetail(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }

  setProviderUpdateFormlyModalController(controller: FormlyModalController) {
    this.providerUpdateFormlyModalController = controller;
  }

  openProviderUpdateFormlyModalController() {
    this.doctor$.subscribe((doctor) => {
      const {
        id,
        name,
        bio,
        profileImage,
        npi,
        honorific,
        firstName,
        lastName,
        suffix,
        phoneNumber,
        emailAddress,
        educations,
        experiences,
        awards,
        clinicalProviderTags,
        clinicalProviderSpecialties
      } = doctor;
      this.providerUpdateFormlyModalController?.open({
        id,
        name,
        bio,
        profileImage,
        npi,
        honorific,
        firstName,
        lastName,
        suffix,
        phoneNumber,
        emailAddress,
        educations,
        experiences,
        awards,
        clinicalProviderTags,
        clinicalProviderSpecialties
      }, {
        tags: this.tagStore.tags$,
        specialties: this.specialtyStore.specialties$,
      }, this);
    }).unsubscribe();
  }

  saveClinicalProvider(model: any) {
    const {
      id,
      name,
      npi,
      honorific,
      firstName,
      lastName,
      bio,
      profileImage,
      suffix,
      phoneNumber,
      emailAddress,
      profilePictureId,
      compressProfilePictureId,
      educations,
      experiences,
      awards,
      clinicalProviderTags,
      clinicalProviderSpecialties,
    } = model;
    const subscriber = this.providerStore.actionResult$.subscribe((result) => {
      const { done, item } = result;
      if(done) {
        subscriber.unsubscribe();
        this.providerUpdateFormlyModalController?.close();
      }
    });
    educations.map((item: any) => {
      delete item?.__typename;
    });
    experiences.map((item: any) => {
      delete item?.__typename;
      delete item?.duration;
    });
    awards.map((item: any) => {
      delete item?.__typename;
    });
    clinicalProviderTags.map((item: any) => {
      delete item.tag?.__typename;
      delete item?.__typename;
    })
    clinicalProviderSpecialties.map((item: any) => {
      delete item?.__typename;
      delete item?.specialty?.__typename;
      delete item?.clinicalProvider?.__typename;
      delete item?.updatedAt;
      delete item?.createdAt;
    })
    this.providerStore.updateClinicalProviderEffect({
      id,
      name,
      npi,
      honorific,
      bio,
      profileImage,
      firstName,
      lastName,
      suffix,
      phoneNumber,
      emailAddress,
      profilePictureId,
      compressProfilePictureId,
      educations,
      experiences,
      awards,
      clinicalProviderTags,
      clinicalProviderSpecialties,
    });
  }

  addLocation(input: any) {
    const subscriber = this.locationStore.actionResult$.subscribe(({ done }) => {
      if (done) subscriber.unsubscribe()
    })
    const { name,locationName,line1,line2,city,state,postalCode,latitude,longitude,abbrev,division,country,officePhone,fax,attentionTo } = input;
    const locationData = { name,locationName,line1,line2,city,state,postalCode,latitude,longitude,abbrev,division,country,officePhone,fax,attentionTo };
    
    this.doctor$.subscribe((doctor)=>{
      const clinicalProviderId = doctor.id;
      const currentDateAndTime = moment(new Date()).format('yyyy-MMMM-DD hh:mm:ss');
      const name = `location ${doctor.name} at ${currentDateAndTime}`
      this.clinialProviderLocationStore.createClinicalProviderLocationEffect({name, clinicalProviderId, location:locationData})
    }).unsubscribe()
    if(this.currentProviderId){
      this.providerStore.loadClinicalProviderEffect(this.currentProviderId)
    }
  }

  override getInitialState(): ProvidersState {
    return {
      query: '',
      loading: false,
      modalController: undefined,
      selectedReview: undefined,
      businessHours: [],
    }
  }


}
