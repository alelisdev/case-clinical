
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ContactTag, Contact, Country, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { of } from 'rxjs'

export interface ContactCreateState {
  errors?: any
  loading?: boolean
  item?: Contact,
  contacts?: Contact[],
  searchTerm?: string,
  tagsItem?: ContactTag,
  tags?: ContactTag[]
  countries?: Country[]
}

@Injectable()
export class ContactStore extends ComponentStore<ContactCreateState> {
  constructor(private readonly toast: WebUiToastService, 
    private readonly data: WebCoreDataAccessService, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute ) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly countries$ = this.select((s) => s.countries || [])
  readonly tags$ = this.select((s) => s.tags || [])
  readonly tagsItems$ = this.select((s) => s.tagsItem)

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.contacts$, this.tags$, this.tagsItems$,

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

  }),
{debounce: true})

  readonly filterContacts = (term) =>
    this.data.userContacts({ input: { name: term, limit: 10000 } }).pipe(
      tapResponse(
        (res: any) => {
            const contacts = res.data.items
            if(term !== '') {
              this.patchState({ contacts: contacts })
            } else {
              this.patchState({ contacts: [] })
            }
            return contacts
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
          return result.data.items
      }),
  )

  readonly getContactTags = (term) =>
    this.data.userContactTags({ input: { name: term, limit: 5000 } }).pipe(
      tapResponse(
        (res: any) => {
            const tags = res.data.items
            this.patchState({ tags: tags })
            return tags
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
          return result.data.items
      }),
    )

  readonly getCountries = (term) =>
    this.data.userCountries({ input: { name: term, limit: 5000 } }).pipe(
      tapResponse(
        (res: any) => {
            const countries = res.data.items
            this.patchState({ countries: countries })
            return countries
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result: any) => {
          return result.data.items
      }),
  )

  readonly getContactById = (id) =>
    this.data.userContacts({ input: { name: '' } }).pipe(
      tapResponse(
        (res: any) => {
          const contacts = res.data.items
          // this.patchState({ contacts })
          const contact = contacts.find(item => item.id === id) || null;

          return contact
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

    }
