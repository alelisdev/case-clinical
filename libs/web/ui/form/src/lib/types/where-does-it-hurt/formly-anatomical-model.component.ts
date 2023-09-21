/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { Gender } from '../typings/gender'
import { Orientation } from '../typings/body-region'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Variant } from '../typings/variant.model'
import { Size } from '../typings/size.model'
import { Observable, Subject, from, combineLatest as mergeLatest, of } from 'rxjs'
import { takeUntil, map, switchMap } from 'rxjs/operators'
import * as _ from 'lodash'
import {
  BodyPart,
  WhereDoesItHurt,
  WebCoreDataAccessService,
  Specialty,
} from '@case-clinical/web/core/data-access'
import { bodyParts } from './bodyparts'
import { tapResponse } from '@ngrx/component-store'

@Component({
  selector: 'ui-formly-anatomical-model',
  templateUrl: './formly-anatomical-model.component.html',
  styleUrls: ['./formly-anatomical-model.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [style({ transform: 'translateX(-100%)' }), animate(100)]),
      transition('* => void', [animate(100, style({ transform: 'translateX(100%)' }))]),
    ]),
  ],
})
export class FormlyAnatomicalModelComponent extends FieldType implements OnInit, AfterViewInit {
  protected readonly VARIANT: typeof Variant = Variant
  protected readonly SIZE: typeof Size = Size
  private _unsubscribeAll: Subject<any> = new Subject<any>()

  parts = bodyParts
  hoverPart = ''
  male: any = true
  front = true
  backgroundAltImage = `${this.male ? 'Male' : 'Female'} ${this.front ? 'Front' : 'Back'}`
  activeParts: any[] = this.parts.male.front
  selectedParts: any[] = []

  anatomyFocused = false
  imageURLLookup = {
    male: {
      front: 'assets/anatomical-model/anatomical-male-front.png',
      back: 'assets/anatomical-model/anatomical-male-back.png',
    },
    female: {
      front: 'assets/anatomical-model/anatomical-female-front.png',
      back: 'assets/anatomical-model/anatomical-female-back.png',
    },
  }
  backgroundImage = this.imageURLLookup[this.male ? 'male' : 'female'][this.front ? 'front' : 'back']

  public allWDIHs$: Observable<WhereDoesItHurt[]>
  public allWDIHs: WhereDoesItHurt[] = []
  public filteredWDIHs: WhereDoesItHurt[] = []
  public selectedWDIHs: WhereDoesItHurt[] = []
  public selectedSpecialists: Specialty[] = []

  constructor(private data: WebCoreDataAccessService, private cd: ChangeDetectorRef) {
    super()
  }

  clickWDIH(wdih: WhereDoesItHurt) {
    if (this.wdihIsSelected(wdih)) {
      //remove wdih
      this.selectedWDIHs = this.selectedWDIHs?.filter((x) => x.id !== wdih.id)
    } else {
      //add wdih
      this.selectedWDIHs.push(wdih)
    }
    if(this.to?.selectedWhereDoesItHurts) this.to.selectedWhereDoesItHurts(this.selectedWDIHs)
    this.updateSpecialties()
  }

  wdihIsSelected(wdih: WhereDoesItHurt) {
    if (this.selectedWDIHs?.find((x) => x.id === wdih.id)) {
      return true
    } else {
      return false
    }
  }

  updateSpecialties() {
    const newSpecialties: Specialty[] = []

    for (const aWdih of this.selectedWDIHs) {
      for (const aSpecialty of aWdih.whereDoesItHurtSpecialties) {
        const actualSpecialty = aSpecialty.specialty
        if (actualSpecialty && !newSpecialties?.find((x) => x.id === actualSpecialty?.id)) {
          newSpecialties.push(actualSpecialty)
        }
      }
    }
    this.selectedSpecialists = newSpecialties
    if(this.to.specialtiesSelected) this.to.specialtiesSelected(this.selectedSpecialists);
  }

  setFilterWDIHs(partId: string, side: string) {
    if (side) {
      partId = side === 'Left' ? partId.slice(5) : partId.slice(6)
      const newWDIHs = this.allWDIHs?.filter(
        (x) => x.bodyPartId === partId && x.sideId === side && !this.filteredWDIHs?.some((e) => e.id === x.id),
      )
      if (newWDIHs) this.filteredWDIHs = this.filteredWDIHs?.concat(newWDIHs)
    } else {
      const newWDIHs = this.allWDIHs?.filter(
        (x) => x.bodyPartId === partId && !this.filteredWDIHs?.some((e) => e.id === x.id),
      )
      if (newWDIHs) this.filteredWDIHs = this.filteredWDIHs?.concat(newWDIHs)
    }
    this.cd.detectChanges()
  }

  setPrevSelectedParts() {
    this.selectedParts.forEach((partId) => {
      const side = partId.startsWith('Left-') ? 'Left' : partId.startsWith('Right-') ? 'Right' : null
      this.setFilterWDIHs(partId, side)
    })
  }

  setPrevSelectedWIDHs(res) {
    if (!res.selectedParts?.length) {
      return
    }

    this.selectedWDIHs = res.selectedWDIHs
    this.selectedParts.forEach((partId) => {
      const side = partId.startsWith('Left-') ? 'Left' : partId.startsWith('Right-') ? 'Right' : null
      this.setFilterWDIHs(partId, side)
    })
    if(this.to?.selectedWhereDoesItHurts) this.to.selectedWhereDoesItHurts(this.selectedWDIHs)
    this.updateSpecialties()
    this.cd.detectChanges()
  }

  ngOnInit() {
    this.formControl.setValue(this.formControl.value ? [...this.formControl.value] : [])
    const isMale = this.to?.isMale && this.to?.isMale()
    this.male = isMale ?? undefined
    this.male = true;
    this.updateImages()
    this.allWDIHs$ = this.data.userWhereDoesItHurts({ input: { limit: 10000 } }).pipe(switchMap((res) => of(res.data.items)))
    this.allWDIHs$
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((event) => {
          this.allWDIHs = event
        }),
      )
      .subscribe()

    this.to?.gender?.pipe(takeUntil(this._unsubscribeAll)).subscribe((gender) => {
      if (gender && gender.length) {
        this.male = gender == 'male' ? true : false
        this.updateImages()
      }
    })
  }

  ngAfterViewInit(): void {
    // (this.to?.initialSelectedParts ?? of([])).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: []) => {
    //   if (res) {
    //     this.selectedParts = [...new Set(res ?? [])]
    //     this.setPrevSelectedParts()
    //     this.cd.detectChanges()
    //   }
    // })
    // (this.to?.initialSelectedWhereDoesItHurts ?? of([]))
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: WhereDoesItHurt[]) => {
    //     if (res) {
    //       this.setPrevSelectedWIDHs({
    //         selectedParts: this.selectedParts,
    //         selectedWDIHs: res,
    //       })
    //       this.cd.detectChanges()
    //     }
    //   })
  }

  clicked(partId: string) {
    const side = partId.startsWith('Left-') ? 'Left' : partId.startsWith('Right-') ? 'Right' : null
    if (this.selectedParts?.find((x) => x === partId)) {
      const ind = this.selectedParts?.findIndex((x) => x === partId)
      // this.selectedParts.splice(ind, 1)
      this.selectedParts = this.selectedParts.filter((part) => part !== this.selectedParts[ind])
      this.selectedWDIHs = this.selectedWDIHs?.filter((x) => {
        if (side) {
          return `${side}-${x.bodyPartId}` !== partId ? true : x.sideId !== side
        }
        return x.bodyPartId !== partId && x.sideId !== side
      })
      if (side) {
        partId = side === 'Left' ? partId.slice(5) : partId.slice(6)
        this.filteredWDIHs = this.filteredWDIHs?.filter((x) => !(x.bodyPartId === partId && x.sideId === side))
      } else {
        this.filteredWDIHs = this.filteredWDIHs?.filter((x) => x.bodyPartId !== partId)
      }
    } else {
      this.selectedParts.push(partId)
      if (side) {
        partId = side === 'Left' ? partId.slice(5) : partId.slice(6)
        const newWDIHs = this.allWDIHs?.filter(
          (x) => x.bodyPartId === partId && x.sideId === side && !this.filteredWDIHs.some((e) => e.id === x.id),
        )
        this.filteredWDIHs = this.filteredWDIHs.concat(newWDIHs)
      } else {
        const newWDIHs = this.allWDIHs?.filter(
          (x) => x.bodyPartId === partId && !this.filteredWDIHs.some((e) => e.id === x.id),
        )
        this.filteredWDIHs = this.filteredWDIHs.concat(newWDIHs)
      }

      this.cd.detectChanges()
    }

    if (this.selectedParts?.length < 1) {
      this.selectedWDIHs = []
    }

    if(this.to.selectedParts) this.to.selectedParts(this.selectedParts)
    if(this.to?.selectedWhereDoesItHurts) this.to.selectedWhereDoesItHurts(this.selectedWDIHs)
    this.updateSpecialties()
  }

  isClicked(partId: string) {
    if (this.selectedParts?.find((x) => x === partId)) {
      return true
    } else {
      return false
    }
  }

  updateImages() {
    this.activeParts = this.parts[this.male ? 'male' : 'female'][this.front ? 'front' : 'back']
    this.backgroundImage = this.imageURLLookup[this.male ? 'male' : 'female'][this.front ? 'front' : 'back']
    this.backgroundAltImage = `${this.male ? 'Male' : 'Female'} ${this.front ? 'Front' : 'Back'}`
    if(this.to?.onGenderChange) this.to?.onGenderChange(typeof this.male === 'boolean' ? (this.male ? 'male' : 'female') : undefined)
    this.cd.detectChanges()
  }

  selectPart(event) {
    if (!this.selectedParts.includes(event.target.id)) {
      this.selectedParts.push(event.target.id)
    } else {
      this.selectedParts = this.selectedParts?.filter((a) => a !== event.taget.id)
    }
  }

  isSelected(event) {
    const id: string = event.target.id
    return this.selectedParts.includes(id)
  }

  isHovered(event) {
    return this.hoverPart === event
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }
}
