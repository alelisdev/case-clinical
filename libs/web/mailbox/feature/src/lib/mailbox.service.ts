import { environment } from 'libs/core/feature/src/environments/environment';
import { folders, mailType } from './mailbox.constants';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Mail, MailCategory, MailFolder, MailLabel, MailLabelNew, MailNew } from './mailbox.types';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';

@Injectable()
export class MailboxService
{
    selectedMailChanged: BehaviorSubject<any> = new BehaviorSubject(null);
    private _category: BehaviorSubject<MailCategory> = new BehaviorSubject(null);
    private _folders: BehaviorSubject<MailFolder[]> = new BehaviorSubject(null);
    private _labels: BehaviorSubject<MailLabelNew[]> = new BehaviorSubject(null);
    private _mails: BehaviorSubject<Mail[]> = new BehaviorSubject(null);
    private _mailsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _labelsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _mailDetailLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _mail: BehaviorSubject<Mail> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);
    public readMail: BehaviorSubject<any> = new BehaviorSubject(null);
    legalCaseId:string = "";

    url  = environment.email_api;
    labelUrl = this.url + '/label/';
    // local
    token = this.getAccessToken();
    email = this.getMail();
    legalCaseMailListData = {
        count: 0,
        data: []
    }

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private readonly toast: WebUiToastService,
        private readonly data: WebCoreDataAccessService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for category
     */
    get category$(): Observable<MailCategory>
    {
        return this._category.asObservable();
    }

    /**
     * Getter for folders
     */
    get folders$(): Observable<MailFolder[]>
    {
        return this._folders.asObservable();
    }

    /**
     * Getter for labels
     */
    get labels$(): Observable<MailLabelNew[]>
    {
        return this._labels.asObservable();
    }

    /**
     * Getter for mails
     */
    get mails$(): Observable<Mail[]>
    {
        return this._mails.asObservable();
    }

    /**
     * Getter for mails loading
     */
    get mailsLoading$(): Observable<boolean>
    {
        return this._mailsLoading.asObservable();
    }

    get labelsLoading$(): Observable<boolean>
    {
        return this._labelsLoading.asObservable();
    }

    get mailDetailLoading$(): Observable<boolean>
    {
        return this._mailDetailLoading.asObservable();
    }

    /**
     * Getter for mail
     */
    get mail$(): Observable<Mail>
    {
        return this._mail.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<any>
    {
        return this._pagination.asObservable();
    }

    get readMail$(): Observable<MailCategory>
    {
        return this.readMail.asObservable();
    }

    set setLegalCaseId(legalCaseId: string) {
        this.legalCaseId = legalCaseId
    }

    get getLegalCaseId() {
        return this.legalCaseId
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Get folders
     */
    getFolders(): Observable<any>
    {
        this._folders.next(folders)
        return of(folders)
        // return this._httpClient.get<MailFolder[]>('api/apps/mailbox/folders').pipe(
        //     tap((response: any) => {
        //         this._folders.next(response);
        //     })
        // );
    }

    /**
     * Get labels
     */
    getLabels(): Observable<any>
    {
        return this._httpClient.get<any[]>(this.url + '/labels').pipe(
            tap((response: any) => {
                const folders = ['drafts', 'spam', 'trash', 'sent', 'inbox', 'all'];
                response.data = response.data.filter(f => !folders.includes(f.name));
                this._labels.next(response.data);
            })
        );
    }

    /**
     * Get mails by folder
     */
    getMailsByFolder(folder: string, page: string = '1'): Observable<any>
    {
        let folderSlug = folder;
        // Execute the mails loading with true
        this._mailsLoading.next(true);
        const resultsPerPage = 10;
        const pageNumber = Number(page ?? 1);
        const queryParams = {
            params: {
            offset: pageNumber - 1,
            limit: this.getLegalCaseId ? 1000000 : resultsPerPage
          }
        }
        if(this.getLegalCaseId){
            queryParams.params["legalCaseId"] = this.getLegalCaseId;
            if(folder === 'all') {
                folderSlug = 'case-threads'
            }
            else{
                this._mailsLoading.next(false);
                this._router.navigate([this._router.url]);
                return
            }

            if(!this.legalCaseMailListData.data.length){
                queryParams.params["offset"] = 0;
            }
        }

        if(this.legalCaseMailListData.data.length && queryParams.params.offset){
            let tmpRes = this.setLegalCaseMailPagination(Number(page ?? 1), this.legalCaseMailListData)
            let data = tmpRes.data
            delete tmpRes.data
            this._mails.next(data);
            const pagination = tmpRes;
            this._pagination.next(pagination);
            this._mailsLoading.next(false);

            return of({
                count: this.legalCaseMailListData.count,
                data: data
            })
        }
        else{
            return this._httpClient.get<any[]>(this.url + '/' + folderSlug, queryParams).pipe(
                tap((response: any) => {
                    this._category.next({
                        type: 'folder',
                        name: folder
                    });

                    response.data.forEach(async element => {
                        element.mailType =  await this.getMailType(element);
                    });

                    if(this.getLegalCaseId && folder === 'all'){
                        this.legalCaseMailListData = {
                            count: response.count,
                            data: response.data
                        }
                        let tmpRes = this.setLegalCaseMailPagination(Number(page ?? 1), this.legalCaseMailListData)
                        let data = tmpRes.data
                        delete tmpRes.data
                        this._mails.next(data);
                        const pagination = tmpRes;
                        this._pagination.next(pagination);
                        this._mailsLoading.next(false);
                    }
                    else{
                        this._mails.next(response.data);
                        const pagination = this.setPagination(Number(page ?? 1), response.count);
                        this._pagination.next(pagination);
                        this._mailsLoading.next(false);
                    }
                }),
                switchMap((response) => {
                    if ( response.data === null )
                    {
                        const pagination = this.setPagination(Number(page ?? 1), response.data.length);
                        return throwError({
                            message   : 'Requested page is not available!',
                            pagination: pagination
                        });
                    }

                    return of(response);
                })
            );
        }
    }

    /**
     * Get mails by label
     */
    getMailsByLabel(labelId: string, page: string = '1'): Observable<any>
    {
        // Execute the mails loading with true
        this._mailsLoading.next(true);
        const resultsPerPage = 10;
        const pageNumber = Number(page ?? 1);
        const queryParams = {
            params: {
            offset: pageNumber - 1,
            limit: resultsPerPage,
            labelId: labelId
          }
        }
        return this._httpClient.get<any[]>(this.url + '/label-threads', queryParams).pipe(
            tap(async (response: any) => {
                const labelName: any = await this.getLabelNameById(labelId);
                this._category.next({
                    type: 'label',
                    name: labelName
                });
                response.data.forEach(async element => {
                    element.mailType =  await this.getMailType(element);
                });
                this._mails.next(response.data);
                const pagination = this.setPagination(Number(page ?? 1), response.count);
                this._pagination.next(pagination);
                this._mailsLoading.next(false);
            }),
            switchMap((response) => {
                if ( response.data === null )
                {
                    const pagination = this.setPagination(Number(page ?? 1), response.data.length);
                    return throwError({
                        message   : 'Requested page is not available!',
                        pagination: pagination
                    });
                }

                return of(response);
            })
        );
    }

    /**
     * Get mail by id
     */
    getMailById(id: string): Observable<any>
    {
        const queryParams = {
          params: {
            messageId: id,
          }
        }
        this._mailDetailLoading.next(true);
        return this._httpClient.get<any[]>(this.url + '/' + 'mail-details', queryParams).pipe(
            tap((response: any) => {
                if(response && response.data && response.data.labels) {
                    // const folders = ['drafts', 'spam', 'trash', 'sent', 'inbox', 'all'];
                    response.data.labelNames = response.data.labels.filter(f=> f.name != '').map((m) => m.name);
                    // response.data.labels = response.data.labels.filter(f => !folders.includes(f.name));
                }
                const mail = response.data;

                // Update the mail
                this._mail.next(mail);

                this._mailDetailLoading.next(false);
                // Return the mail
                return mail;
            }),
            switchMap((response) => {
                this._mailDetailLoading.next(false);
                if ( !response.data )
                {
                    return throwError('Could not found mail with id of ' + id + '!');
                }

                return of(response.data);
            })
        );
    }

    getMailByThreadId(id: string): Observable<any>
    {
        this._mailDetailLoading.next(true);
        return this._httpClient.get<any[]>(this.url + '/threads/' + id).pipe(
            tap((response: any) => {
                if(response && response.data && response.data.labels) {
                    // const folders = ['drafts', 'spam', 'trash', 'sent', 'inbox', 'all'];
                    response.data.labelNames = response.data.labels.filter(f=> f.name != '').map((m) => m.name);
                    // response.data.labels = response.data.labels.filter(f => !folders.includes(f.name));
                }

                if(response && response.data && response.data.messages.length > 0) {
                    response.data.messages.forEach(element => {
                        element.labelNames = element.labels.filter(f=> f.name != '').map((m) => m.name);
                    });
                }
                const mail = response.data;

                // Update the mail
                this._mail.next(mail);

                this._mailDetailLoading.next(false);
                // Return the mail
                return mail;
            }),
            switchMap((response) => {
                this._mailDetailLoading.next(false);
                if ( !response.data )
                {
                    return throwError('Could not found mail with id of ' + id + '!');
                }

                return of(response.data);
            })
        );
    }

    /**
     * Update mail
     *
     * @param id
     * @param mail
     */
    updateMail(id: string, mail: Mail): Observable<any>
    {
        return this._httpClient.patch('api/apps/mailbox/mail', {
            id,
            mail
        }).pipe(
            tap(() => {

                // Re-fetch the folders on mail update
                // to get the updated counts on the sidebar
                this.getFolders().subscribe();
            })
        );
    }

    /**
     * Reset the current mail
     */
    resetMail(): Observable<boolean>
    {
        return of(true).pipe(
            take(1),
            tap(() => {
                this._mail.next(null);
            })
        );
    }

    /**
     * Add label
     *
     * @param label
     */
    addLabel(label: MailLabel): Observable<any>
    {
        this._labelsLoading.next(true)
        return this._httpClient.post<any[]>(this.labelUrl, {label: label.title.trim()}).pipe(
            tap((res) => {
                this.getLabels().subscribe();
                this._labelsLoading.next(false);
                if(res && res.type) {
                    this.toast.success("Created Successfully!");
                } else {
                    this.toast.error("The label name you have chosen already exists. Please try another name")
                }
            }, () => {
                this._labelsLoading.next(false);
            })
        );
    }

    /**
     * Update label
     *
     * @param label
     */
    updateLabel(label: MailLabel): Observable<any>
    {

        this._labelsLoading.next(true)
        return this._httpClient.put<any[]>(this.labelUrl + label.id, {name: label.title.trim()}).pipe(
            tap((res) => {
                console.log('response');
                this.getLabels().subscribe();
                this._labelsLoading.next(false);
                if(res && res.type) {
                    this.toast.success("Updated Successfully!");
                } else {
                    this.toast.error("The label name you have chosen already exists. Please try another name")
                }
            }, () => {
                this._labelsLoading.next(false);
            })
        );
    }

    /**
     * Delete label
     *
     * @param id
     */
    deleteLabel(id: string): Observable<any>
    {
        this._labelsLoading.next(true);
        return this._httpClient.delete<any[]>(this.labelUrl + id).pipe(
            tap(() => {
                console.log('response');
                this.getLabels().subscribe();
                this._labelsLoading.next(false);
                this.toast.success("Deleted Successfully!");
            }, () => {
                this._labelsLoading.next(false);
            })
        );
    }

    // set accessToken(token: string) {
    //     localStorage.setItem('accessToken', token)
    // }

    // get accessToken(): string {
    //     // return localStorage.getItem('accessToken') ?? ''
    //     // return 'IW1exliKwtIfNtMIZmq7RIzjoTQY2P'

    //     return 'lvNPoRbYCmuZPYnB6C38Z9ZmqMADi4'
    // }

    toggleStar(isThread = true, id: string): Observable<any>
    {
        this._mailDetailLoading.next(true);
        const body = {
            object: isThread ? mailType.thread : mailType.message,
            id: id
        }
        return this._httpClient.post(this.url + '/star', body).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, () => {
                this._mailDetailLoading.next(false);
            })
        );
    }

    toggleUnread(isThread = true, id: string): Observable<any>
    {
        this._mailDetailLoading.next(true);
        const body = {
            object: isThread ? mailType.thread : mailType.message,
            ids: [id]
          }
        return this._httpClient.post(this.url + '/read', body).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, () => {
                this._mailDetailLoading.next(false);
            })
        );
    }

    toggleSpam(isThread = true, id: string, markSpam = true) {
        this._mailDetailLoading.next(true);
        const body = {
            object: isThread ? mailType.thread : mailType.message,
            ids: [id],
            markSpam: markSpam
          }
        return this._httpClient.post(this.url + '/toggle-spam', body).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, ()=> {
                this._mailDetailLoading.next(false);
            })
        );
    }

    toggleTrash(isThread = true, id: string, moveToTrash = true) {
        this._mailDetailLoading.next(true);
        const body = {
            object: isThread ? mailType.thread : mailType.message,
            ids: [id],
            moveToTrash: moveToTrash
          }
        return this._httpClient.post(this.url + '/toggle-trash', body).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, ()=> {
                this._mailDetailLoading.next(false);
            })
        );
    }

    assignLabel(labelId: string, threadId: string) {
        this._mailDetailLoading.next(true);
        const body = {
            threadId: threadId
          }
        return this._httpClient.post(this.url + '/mark-label/' + labelId, body).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, ()=> {
                this._mailDetailLoading.next(false);
            })
        );
    }

    unAssignLabel(labelId: string, threadId: string) {
        this._mailDetailLoading.next(true);
        const body = {
            threadId: threadId
        };
        return this._httpClient.post(this.url + '/unmark-label/' + labelId, body).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, ()=> {
                this._mailDetailLoading.next(false);
            })
        );
    }

    getFile(id: string): Observable<any>
    {
        this._mailDetailLoading.next(true);
        return this._httpClient.get<any[]>(this.url + '/file/' + id ).pipe(
            tap(() => {
                this._mailDetailLoading.next(false);
            }, ()=> {
                this._mailDetailLoading.next(false);
            })
        );
    }

    updateMessageByIds(legalCaseId: string, msgIds: any)
    {
        this._mailDetailLoading.next(true);
        return this._httpClient.put<any[]>(this.url + '/message', {legalCaseId: (legalCaseId ? legalCaseId : ""), ids: msgIds}).pipe(
            tap((res) => {
                this._mailDetailLoading.next(false);
                if(res && res?.["data"]?.length) {
                    this.toast.success("Updated Successfully!");
                } else {
                    this.toast.error("Error while update!")
                }
            }, () => {
                this._mailDetailLoading.next(false);
            })
        );
    }

    setPagination(pageNumber = 1, length) {
        const mailsLength = length;
        const resultsPerPage = 10
        const page = pageNumber;
        const begin = (page - 1) * resultsPerPage
        const end = Math.min(resultsPerPage * page, mailsLength)
        const lastPage = Math.max(Math.ceil(mailsLength / resultsPerPage), 1)

        if (page > lastPage) {
            return  {
                lastPage,
            }
        } else {
            return {
                totalResults: mailsLength,
                resultsPerPage: resultsPerPage,
                currentPage: page,
                lastPage: lastPage,
                startIndex: begin,
                endIndex: end - 1,
            }
        }
    }

    setLegalCaseMailPagination(pageNumber, response){
        const mailsLength = response.count
        const resultsPerPage = 10
        const page = pageNumber;
        const begin = (page - 1) * resultsPerPage
        const end = Math.min(resultsPerPage * page, mailsLength)
        const lastPage = Math.max(Math.ceil(mailsLength / resultsPerPage), 1)

        if (page > lastPage) {
            return  {
                lastPage,
                data: response.data.slice(begin, end - 1)
            }
        } else {
            return {
                totalResults: mailsLength,
                resultsPerPage: resultsPerPage,
                currentPage: page,
                lastPage: lastPage,
                startIndex: begin,
                endIndex: end - 1,
                data: response.data.filter((ele, i) => (i >= begin) && (i <= (end - 1)))
            }
        }
    }

    getMailType(mail: MailNew) {
        return new Promise((resolve) => {
            const folders = ['inbox', 'drafts', 'spam', 'trash', 'sent'];
            const label  =  mail.labels.find((f => folders.includes(f.name)));
            let type = '';
            if(label) {
                type =  label.name;
            }
            resolve(type);
        });
    }

    getLabelNameById(id: string) {
        return new Promise((resolve) => {
            this.labels$
            .subscribe((labels: MailLabelNew[]) => {
                let labelName = 'label';
                if(labels && labels.length > 0 ) {
                    labelName =  ((labels.find(f => f.id == id)).display_name) ?? '';
                }
                resolve(labelName);
            });
        });

    }

    getAccessToken() {
        const emailService = JSON.parse(localStorage.getItem("emailService"));
        return emailService?.token ?? null;
    }

    getMail() {
        const emailService = JSON.parse(localStorage.getItem("emailService"));
        return emailService?.email ?? null;
    }

    setEmailService(obj) {
        localStorage.setItem("emailService", JSON.stringify(obj));
    }

    removeAccessTokenFromLocal() {
        localStorage.removeItem('emailService');
    }

    getLegalCases() {
        return this.data.userLegalCases({ input: { name: "", limit: 10000, skip: 0 } })
    }
}
