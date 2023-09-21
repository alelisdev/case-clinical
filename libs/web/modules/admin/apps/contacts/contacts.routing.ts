import { Route } from '@angular/router';
import { CanDeactivateContactsDetails } from 'libs/web/modules/admin/apps/contacts/contacts.guards';
import { ContactsContactResolver, ContactsCountriesResolver, ContactsResolver, ContactsTagsResolver } from 'libs/web/modules/admin/apps/contacts/contacts.resolvers';
import { ContactsComponent } from 'libs/web/modules/admin/apps/contacts/contacts.component';
import { ContactsListComponent } from 'libs/web/modules/admin/apps/contacts/list/list.component';
import { ContactsDetailsComponent } from 'libs/web/modules/admin/apps/contacts/details/details.component';

export const contactsRoutes: Route[] = [
    {
        path     : '',
        component: ContactsComponent,
        resolve  : {
            tags: ContactsTagsResolver
        },
        children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]
    }
];
