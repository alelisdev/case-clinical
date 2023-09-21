/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { includes } from 'lodash';
import { Orientation } from '../typings/body-region';
import { Variant } from '../typings/variant.model';
import { Size } from '../typings/size.model';
import { Gender } from '../typings/gender';
import { nodes } from './node-configs';
import { MALE_BACK_REGION_ID, MALE_FRONT_REGION_ID, regions } from './region-configs';
import { IRegion } from '../typings/region.model';
import { INode } from '../typings/node.model';
import * as _ from 'lodash';
import { Observable, Subject, from, of  } from 'rxjs';
import { takeUntil, pluck, shareReplay, tap, take, mergeMap, find, map, toArray, combineLatestWith } from 'rxjs/operators';
import { BodyPart, WebCoreDataAccessService, WhereDoesItHurt } from '@case-clinical/web/core/data-access';


@Component({
  selector: 'app-where-does-it-hurt-model',
  templateUrl: './anatomical-model.component.html',
  styleUrls: ['./anatomical-model.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms cubic-bezier(0.645, 0.045, 0.355, 1.000)', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WhereDoesItHurtModelComponent implements OnInit, OnChanges, OnDestroy {

  public devMode = true;

  public MALE_FRONT_REGION_ID = MALE_FRONT_REGION_ID;
  public MALE_BACK_REGION_ID = MALE_BACK_REGION_ID;
  public SMALL_SIZE = Size.Small;
  public SECONDARY_VARIANT = Variant.Secondary;

  public NODE_SIZE = 20;
  public IMAGE_HEIGHT = 640;
  public IMAGE_WIDTH = 235;

  public regions = regions;
  public nodes = nodes;

  @ViewChild('RootSvg', { static: false }) rootSvg: ElementRef;

  @Input() gender: Gender = Gender.Male;
  @Input() orientation: Orientation = Orientation.Front;
  @Input() showControls: boolean = true;
  @Input() height: number = 640;
  @Input() interactive: boolean;

  @Input() clinicalFindings: any[];
  @Input() bodyParts: BodyPart[];
  @Input() whereDoesItHurts: WhereDoesItHurt[];

  @Output() bodyPartChange = new EventEmitter<BodyPart>();

  activeBodyParts$: Observable<BodyPart[]>;

  whereDoesItHurtChange$ = new Subject<WhereDoesItHurt[]>();

  width: number;
  svgHeight: string;
  svgWidth: string;
  aspectRatio = '1:2.72';
  nodeHoverTarget: INode;
  showGrid: boolean = false;
  focusedRegion: string;

  destroyed$ = new Subject<void>();
  bodyParts$: Observable<BodyPart[]>;

  get visibleRegions(): IRegion[] {
    return this.regions
      .filter(({ gender }) => gender === this.gender)
      .filter(({ orientation }) => orientation === this.orientation);
  }

  get selectedBodyParts() {
    if (this.clinicalFindings) {
      return _.chain(this.clinicalFindings)
        .groupBy('bodyPart')
        .keys()
        .value()
    } else if (this.bodyParts) {
      return this.bodyParts
        .map(({name}) => name)
    }
  }

  logMousePosition(evt) {
    if (this.devMode) {
    }
  }

  constructor(
    private data: WebCoreDataAccessService
  ) {}

  ngOnInit() {
    console.log('anatomical model component')
    const computedWidth = this.height / parseFloat(this.aspectRatio.split(':')[1]);
    this.width = computedWidth;
    this.svgHeight = `${this.height}px`;
    this.svgWidth = `${computedWidth}px`;

    console.log(this.bodyParts)

    this.bodyParts$ = this.data.userBodyParts().pipe(
      takeUntil(this.destroyed$),
      pluck('data', 'items'),
      shareReplay(),
      map((bodyParts:any) => {
        const results: BodyPart[] = bodyParts
        return results
      })
    );

    this.activeBodyParts$ = this.whereDoesItHurtChange$.pipe(
      takeUntil(this.destroyed$),
      combineLatestWith(this.bodyParts$),
      mergeMap(([activeWhereDoesItHurts, bodyParts]) =>
        from(activeWhereDoesItHurts).pipe(
          map((whereDoesItHurt) =>
            //bodyParts.find(({ whereDoesItHurtBodyPart }) => whereDoesItHurt?.bodyPartId === whereDoesItHurtBodyPart?.bodyPartId)
            whereDoesItHurt.bodyPart
          ),
          toArray()
        )
      ),
      shareReplay()
    );

    this.activeBodyParts$.subscribe();

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.whereDoesItHurts) {
      if (changes.whereDoesItHurts.currentValue !== changes.whereDoesItHurts.previousValue) {
          this.whereDoesItHurtChange$.next(this.whereDoesItHurts);
        }
    }
  }

  isNodeHoverTarget = (node: INode) => node === this.nodeHoverTarget;

  rotate() {
    this.orientation = (this.orientation === Orientation.Front)
      ? Orientation.Back
      : Orientation.Front;
  }



  onMouseEnterRegion(id: string) {
    this.focusedRegion = id;
  }

  onMouseLeaveRegion(id: string) {
    this.focusedRegion = undefined;
  }

  onBodyPartClick(targetBodyPartName: string) {
    this.bodyParts$.pipe(
      take(1),
      mergeMap((bodyParts) => from(bodyParts)),
      find((bodyPart: BodyPart) => {
        return _.upperCase(bodyPart.name) === _.upperCase(targetBodyPartName)
      }
    )).subscribe((bodyPart) => this.bodyPartChange.emit(bodyPart))
  }



}
