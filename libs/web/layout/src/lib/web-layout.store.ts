import { Injectable } from '@angular/core'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { Role, UserRole } from '@case-clinical/web/core/data-access'
import { ComponentStore } from '@ngrx/component-store'
import { debounce } from 'rxjs/operators'

export interface WebLayoutLink {
  label: string
  route: string
  role?: Role
}

export interface WebLayoutState {
  theme: 'dark' | 'light'
  logo: string
  footerHtml: string
  links: WebLayoutLink[]
  profileLinks: WebLayoutLink[]
}

@Injectable()
export class WebLayoutStore extends ComponentStore<WebLayoutState> {
  constructor(private readonly authStore: WebAuthStore) {
    super({
      theme: 'dark',
      logo: 'assets/images/logo.png',
      footerHtml: `Copyright &copy; ${new Date().getFullYear()}`,
      links: [
        { label: 'Batch Control', route: 'batch-controls' },
        //{ label: 'Dashboard', route: '/dashboard' },
        //{ label: 'Legal Cases', route: 'legal-cases' },
        // { label: 'Settings', route: 'settings' },
        // { label: 'Witnesss', route: 'witnesss' },
        // { label: 'Where-does-it-hurt-specialtys', route: 'where-does-it-hurt-specialtys' },
        // { label: 'Where-does-it-hurt-body-parts', route: 'where-does-it-hurt-body-parts' },
        // { label: 'Where-does-it-hurts', route: 'where-does-it-hurts' },
        // { label: 'User-roles', route: 'user-roles' },
        // { label: 'User-calendars', route: 'user-calendars' },
        // { label: 'Team-users', route: 'team-users' },
        // { label: 'Teams', route: 'teams' },
        // { label: 'Specialtys', route: 'specialtys' },
        // { label: 'Settingss', route: 'settingss' },
        // { label: 'Roles', route: 'roles' },
        // { label: 'Rental-companys', route: 'rental-companys' },
        // { label: 'Prior-injurys', route: 'prior-injurys' },
        // { label: 'Patients', route: 'patients' },
        // { label: 'Intake-where-does-it-hurts', route: 'intake-where-does-it-hurts' },
        //{ label: 'Intakes', route: 'intakes' },
        // { label: 'Insurance-companys', route: 'insurance-companys' },
        // { label: 'Insurances', route: 'insurances' },
        // { label: 'Injurys', route: 'injurys' },
        // { label: 'Health-insurances', route: 'health-insurances' },
        // { label: 'Firms', route: 'firms' },
        // { label: 'Emergency-rooms', route: 'emergency-rooms' },
        // { label: 'Documents', route: 'documents' },
        // { label: 'Contacts', route: 'contacts' },
        // { label: 'Calendar-weekdays', route: 'calendar-weekdays' },
        //{ label: 'Calendars', route: 'calendars' },

        // { label: 'Body-parts', route: 'body-parts' },
        //{ label: 'Tasks', route: 'tasks' },
        //{ label: 'Admin', route: '/admin', role: { name: 'Admin' } },
      ],
      profileLinks: [
        { label: 'Settings', route: '/account' },
        { label: 'Admin', route: '/admin', role: { name: 'Admin' } },
        { label: 'About', route: '/about' },
        { label: 'Logout', route: '/logout' },
      ],
    })
  }

  readonly user$ = this.authStore.user$
  readonly links$ = this.select(this.authStore.user$, this.state$, (user, state) => ({
    main: state.links.filter((l) => (l.role ? user.userRoles.some((r: UserRole) => r.name == l.role?.name) : l)),
    profile: state.profileLinks.filter((l) =>
      l.role ? user.userRoles.some((r: UserRole) => r.name == l.role?.name) : l,
    ),
  }))

  readonly layout$ = this.select(({ logo, footerHtml, theme }) => ({
    logo,
    footerHtml,
    theme,
  }))
  readonly vm$ = this.select(
    this.user$,
    this.links$,
    this.layout$,
    (user, links, layout) => ({
      user,
      links,
      layout,
    }),
    { debounce: true },
  )
}
