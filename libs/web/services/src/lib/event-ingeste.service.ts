import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class EventIngestService implements OnDestroy {
  private _eventTriggerEvent = new Subject();
  public eventTriggered$ = this._eventTriggerEvent.asObservable();

  private timerID = -1;
  private ingestedCount = 0;
  private ingestDuration = 500;

  public get Ingesting() : boolean {
    return this.timerID !== -1;
  }

  requireEventTrigger() {
    this.ingestedCount += 1;
    if(this.Ingesting) {
      window.clearTimeout(this.timerID);
    }
    this.timerID = window.setTimeout(() => {
      this._eventTriggerEvent.next(true);
      console.log(`Total ${this.ingestedCount} events has been ingested now and one event has been emitted now for all events`)
      this.ingestedCount = 0;
      this.timerID = -1;
    }, this.ingestDuration)
  }

  ngOnDestroy(): void {
    this._eventTriggerEvent.next(null);
    this._eventTriggerEvent.complete();
  }
}
