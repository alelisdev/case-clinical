import { groupBy, groupByList } from '@case-clinical/shared/util/helpers';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable, Injector } from "@angular/core";
import { switchMap, of, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormService } from '@case-clinical/web/ui/form';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { ActivatedRoute } from '@angular/router';
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared';
import { UserCreateReviewInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { combineLatest } from 'rxjs';
import { ModalController } from '@case-clinical/web/ui/form';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'

export interface DoctorProfileState extends PatientBaseState {
  loading: boolean,
  query: string,
  modalController: ModalController | undefined,
  selectedReview: any | undefined,
  businessHours: any
}

@Injectable()
export class DoctorProfileStore extends PatientBaseStore<DoctorProfileState> {
  constructor(
    private formService: FormService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private datePipe: DatePipe,
    private documentStore: WebDocumentFeatureStore,
    private clinicalProviderStore: WebClinicalProviderFeatureStore,
    private reviewStore: WebReviewFeatureStore,
    private readonly route: ActivatedRoute,
    private data: WebCoreDataAccessService,
    injector: Injector
  ) {
    super(injector)
    this.patchState({
      query: "",
      loading: false,
    })
    if (this.route.snapshot.paramMap.has("doctorId")) {
      const doctorId = this.route.snapshot.paramMap.get("doctorId") ?? '';
      this.clinicalProviderStore.loadClinicalProviderEffect(doctorId);
      this.reviewStore.setClinicalProviderId(doctorId);
      this.reviewStore.loadReviewsEffect();
      this.loadBusinessHoursEffect(doctorId);
    }
  }
  /******* updators Start ******/
  readonly setModalController = this.updater((state, controller: ModalController) => ({
    ...state,
    modalController: controller
  }));

  readonly setSelectedReview = this.updater((state, selectedReview: any) => ({
    ...state,
    selectedReview
  }));
  /******* updators End ******/

  /******* Selectors Start ******/
  loading$ = this.select(s => s.loading)
  businessHours$ = this.select(s => {
    const businessHours = s.businessHours;
    const grouped: Record<string, any> = groupBy(businessHours, (availability: any) => availability.day);
    const result = []
    let sundayFlag = false
    const currentDate = moment().format('ll') + '';
    const currentDay = moment().format('dddd') + '';
    let currentHours : any;
    for (const key in grouped) {
      let tempHours = grouped[key]
      tempHours.sort((a: { startTime: string; }, b: { startTime: string; }) => Date.parse(a.startTime) - Date.parse(b.startTime))
      tempHours = tempHours.map( (item:any) => {
        item.startTime = moment(item.startTime,'hh:mm A').format('HH:mm')
        item.endTime = moment(item.endTime,'hh:mm A').format('HH:mm')
        return item
      });
      if(key === currentDay) currentHours = tempHours
      result.push({
        day: key, hours: tempHours
      })
      if(key === 'Sunday') sundayFlag = true
    }

    const todayHours = {
      day: currentDate, hours: currentHours
    };
    const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    result.sort((a, b) => WeekDays.indexOf(a.day) - WeekDays.indexOf(b.day))
    return {
      todayHours,
      others: result,
      sundayFlag
    }
  })
  doctorDetail$ = this.clinicalProviderStore.item$;
  doctor$ = this.doctorDetail$.pipe(
    switchMap(doctorDetail => {
      return of({
        ...doctorDetail,
        locationImages: 
          doctorDetail?.clinicalProviderLocations?.map(({ location }) => ({ ...location?.locationImages?.at(0)})),
        mainLocation: doctorDetail?.clinicalProviderLocations?.at(0)?.location,
        mainSpecialty: doctorDetail?.clinicalProviderSpecialties?.at(0)?.specialty?.name,
        specialties: doctorDetail?.clinicalProviderSpecialties?.map(({ name }) => ({
          name,
        })),
        recommendPercent: 0,
        reviewCount: doctorDetail?.reviewCount ?? 0,
        rating: doctorDetail?.rating ?? 0,
        hourlyRate: doctorDetail?.hourlyRate ?? 0,
        educations: doctorDetail?.educations?.map((education) => {
          return {
            ...education,
            from: moment(education.from).format('YYYY'),
            to: moment(education.to).format('YYYY'),
          }
        }),
        experiences: doctorDetail?.experiences?.map((experience) => {
          return {
            ...experience,
            from: moment(experience.from).format('YYYY'),
            to: moment(experience.to).format('YYYY'),
            duration: Math.abs(Number(moment(experience.to).format('YYYY')) - Number(moment(experience.from).format('YYYY')))
          }
        }),
        awards: doctorDetail?.awards?.map((award) => {
          return {
            ...award,
            awardedAt: moment(award.awardedAt).format('MMM') + " " + moment(award.awardedAt).format("YYYY"),
          }
        }),
        services: doctorDetail?.services?.map((service) => {
          return {
            ...service,
            name: service.service?.name,
          }
        }),
      })
    }),
  )

  reviews$ = this.reviewStore.reviews$;

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  vm$ = this.select(
    this.loading$,
    this.doctor$,
    this.reviews$,
    this.user$,
    this.businessHours$,
    (
      loading,
      doctor,
      reviews,
      user: any,
      businessHours,
    ) => {
      const customDoctor = {
        ...doctor,
        
        locations: doctor?.clinicalProviderLocations?.map(({ location, clinicalProviderLocationAvailabilities }) => ({
          id: location?.id,
          name: location?.name,
          startLatitudeProp:JSON.parse(JSON.stringify(user))['latitude'],
          startLongitudeProp:JSON.parse(JSON.stringify(user))['longitude'],
          endLatitudeProp:location?.latitude,
          endLongitudeProp:location?.longitude,
          document: location?.locationImages?.at(0),
          vendor: doctor?.vendor?.name,
          reviewCount: doctor.reviewCount ?? 0,
          rating: doctor.rating ?? 0,
          hourlyRate: doctor.hourlyRate ?? 0,
          businessHours: groupByList(clinicalProviderLocationAvailabilities ?? [],(availability: any) => availability.day)
        })),
        
      }
      return {
        loading,
        doctor: customDoctor,
        businessHours,
        user
      };
    }
  )
  /******* Selectors End ******/

  /******* Effects Start ******/
  loadBusinessHoursEffect = this.effect<string>(clinicalProviderId$ => clinicalProviderId$.pipe(
    tap((clinicalProviderId) => { this.patchState({ loading: true }) }),
    switchMap((clinicalProviderId) => this.data.userClinicalProviderBusinessHours({ clinicalProviderId }).pipe(
      tapResponse(
        (response) => {
          return this.patchState({
            loading: false,
            businessHours: response.data.items,
          })
        },
        (error) => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  updateFavoriteProviderEffect = this.effect<{ clinicalProviderId: string; like: boolean }>((data$) =>
    data$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(({ clinicalProviderId, like }) => {
        if (!like) {
          return this.data.userRemoveFromFavorites({ clinicalProviderId }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Removed from favorites', { duration: 2000 })
                this.clinicalProviderStore.updateClinicalProvider(response.data?.updated as any)
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message)
              },
            ),
          )
        } else {
          return this.data.userAddToFavorites({ clinicalProviderId }).pipe(
            tapResponse(
              (response) => {
                this.toast.success('Successfully added to favorites', { duration: 2000 })
                this.clinicalProviderStore.updateClinicalProvider(response.data?.updated as any)
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message)
              },
            ),
          )
        }
      }),
    ),
  )
  /******* Effects End ******/
  override getInitialState(): DoctorProfileState {
    return {
      query: "",
      loading: false,
      modalController: undefined,
      selectedReview: undefined,
      businessHours: []
    }
  }

  addNewProfile(event: any) {
    const doctorId = this.route.snapshot.paramMap.get("doctorId") ?? '';

    this.user$.subscribe(user => {
      const value: UserCreateReviewInput = {
        clinicalProviderId: doctorId,
        reivewDateAndTime: moment().format(),
        rating: event?.rating,
        patientId: user?.patientId,
        name: user?.patientId + " " + doctorId + " " + moment().format(),
        comment: event?.notes
      };
      this.reviewStore.createReviewEffect(value);
    }).unsubscribe();

  }

  addNewComment(event: any) {
    console.log(event);
    const modalValues = JSON.parse(event);

    const doctorId = this.route.snapshot.paramMap.get("doctorId") ?? '';

    this.user$.subscribe(user => {
      const value: UserCreateReviewInput = {
        clinicalProviderId: doctorId,
        reivewDateAndTime: moment().format(),
        rating: modalValues?.ratingValue,
        patientId: user?.patientId,
        name: user?.patientId + " " + doctorId + " " + moment().format(),
        comment: modalValues?.comment,
        parentId: this.get().selectedReview.reviewId
      };
      this.reviewStore.createReviewEffect(value);
    }).unsubscribe();

  }

  openModal(value: any) {
    this.setSelectedReview(value);
    this.get().modalController?.open();
  }

  loadImageDetail(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }
}
