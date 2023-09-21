import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { environment } from '@case-clinical/web/core/feature'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { tap, Observable, BehaviorSubject, filter } from 'rxjs';

@Injectable()
export class MailComposeService {
  private token: string
  private filteredEmail = []
  private _mailComposeLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  baseUrl = environment?.email_api
  legalCaseId = "";

  constructor(
    private http: HttpClient,
    private readonly data: WebCoreDataAccessService,
    private readonly toast: WebUiToastService,
  ) {
  }

  get mailComposeLoading(): Observable<boolean> {
    return this._mailComposeLoading.asObservable();
  }

  set setLegalCaseId(legalCaseId: string) {
    this.legalCaseId = legalCaseId
  }

  get getLegalCaseId() {
      return this.legalCaseId
  }

  searchEmails(searchStr: string) {
    return this.data.userSearchEmails({ email: searchStr })
  }

  getLegalCases() {
    return this.data.userLegalCases({ input: { name: "", limit: 10000, skip: 0 } })
  }

  sendEmail(formData: FormData) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post<any[]>(this.baseUrl+'/send-email', formData, {headers: new HttpHeaders({"authorization":this.accessToken})}).pipe(
        tap(
          (res: any) => {
            this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  sendDraft(draftId:string){
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post<any[]>(this.baseUrl+`/send-draft`, {draftId}, {headers: new HttpHeaders({"authorization":this.accessToken})}).pipe(
        tap(
          (res: any) => {
            this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  updateDraft(draftId: string, formData: FormData, isSuccessMsgRequired = true) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.put<any[]>(this.baseUrl+`/draft/${draftId}`, formData, {headers: new HttpHeaders({"authorization":this.accessToken})}).pipe(
        tap(
          (res: any) => {
            if(isSuccessMsgRequired) this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  forwardEmail(formData: FormData) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post<any[]>(this.baseUrl+'/forward-email', formData, {headers: new HttpHeaders({"authorization":this.accessToken})}).pipe(
        tap(
          (res: any) => {
            console.log('res', res)
            this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            console.log('err', err)
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  deleteDraft(draftId: string, isSuccessMsgRequired = true) {
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.delete<any[]>(this.baseUrl+`/draft/${draftId}`, {headers: new HttpHeaders({"authorization":this.accessToken})}).pipe(
        tap(
          (res: any) => {
            console.log('res', res)
            if(isSuccessMsgRequired) this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            console.log('err', err)
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  deleteDraftFile(draftId: string, fileId: string, isSuccessMsgRequired = true) {
    if (this.accessToken) {
      let req = {
        headers: new HttpHeaders({"authorization":this.accessToken}),
        body: {draftId: draftId, fileId: fileId}
      }
      this._mailComposeLoading.next(true);
      return this.http.delete<any[]>(this.baseUrl+`/draft-attachment`, req).pipe(
        tap(
          (res: any) => {
            console.log('res', res)
            if(isSuccessMsgRequired) this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            console.log('err', err)
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  saveAsDraft(formData: FormData){
    if (this.accessToken) {
      this._mailComposeLoading.next(true);
      return this.http.post<any[]>(this.baseUrl+'/draft', formData, {headers: new HttpHeaders({"authorization":this.accessToken})}).pipe(
        tap(
          (res: any) => {
            this.toast.success(res.message)
            this._mailComposeLoading.next(false);
          },
          (err) => {
            this.toast.error(err.message ?? err)
            this._mailComposeLoading.next(false);
          },
        ),
      )
    }
  }

  getFile(id: string): Observable<any>
    {
        this._mailComposeLoading.next(true);
        return this.http.get<any[]>(this.baseUrl + '/file/' + id, {headers: new HttpHeaders({"authorization":this.accessToken})} ).pipe(
            tap(() => {
                this._mailComposeLoading.next(false);
            }, ()=> {
                this._mailComposeLoading.next(false);
            })
        );
    }

  set accessToken(token: string) {
    this.token = token
  }

  get accessToken() {
    return this.token
  }
}
