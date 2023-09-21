import { Component } from '@angular/core'
import { BlogStore } from '../blogs/blogs.component.store';
import { ProviderBaseComponent } from '../provider-base.component';
@Component({
  selector: 'provider-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  providers:[BlogStore]
})
export class BlogsComponent extends ProviderBaseComponent{
  portalName = "Vendor";
  pageName = 'Blogs';

  selectedProviderId$ = this.store.selectedProviderId$;
  vm$ = this.store.vm$;
  constructor(public store: BlogStore) {
    super();
  }

  formData={
    pageName: this.pageName,
    portalName: this.portalName,
    "blogs": [
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      },
      {
        "id": "BLG0010",
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020",
        "commentcount": 12,
        "category": "Health Tips",
        "doctor": {
          "avatar": "https://i.pravatar.cc/150?u=a",
          "name": "Michelle Fairfax",
          "id": "PT004",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        },
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
      }
    ],
    "tags": [
      {
        "id": "tag001",
        "name": "Children"
      },
      {
        "id": "tag001",
        "name": "Disease"
      },
      {
        "id": "tag001",
        "name": "Appointment"
      },
      {
        "id": "tag001",
        "name": "Booking"
      },
      {
        "id": "tag001",
        "name": "Kids"
      },
      {
        "id": "tag001",
        "name": "Family"
      },
      {
        "id": "tag001",
        "name": "Tips"
      },
      {
        "id": "tag001",
        "name": "Shedule"
      },
      {
        "id": "tag001",
        "name": "Treatment"
      },
      {
        "id": "tag001",
        "name": "Dr"
      },
      {
        "id": "tag001",
        "name": "Clinic"
      }
    ],
    "latestblogs": [
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Doccure â€“ Making your clinic painless visit?",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "What are the benefits of Online Doctor Booking?",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Online Doctor Appointment Scheduling",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Simple steps to make your doctor visits exceptional!",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Choose your own Online Doctor Appointment",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Simple steps to visit your doctor today",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "5 Great reasons to use an Online Doctor",
        "date": "May 27, 2020"
      },
      {
        "image": "https://images.unsplash.com/photo-1677658992560-e63ac0fa9e02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        "title": "Online Doctoral Programs",
        "date": "May 27, 2020"
      }
    ],
    "blogcategories": [
      {
        "id": "BCG001",
        "name": "Cardiology",
        "counts": 62
      },
      {
        "id": "BCG002",
        "name": "Health Care",
        "counts": 62
      },
      {
        "id": "BCG003",
        "name": "Nutritions",
        "counts": 62
      },
      {
        "id": "BCG004",
        "name": "Health Tips",
        "counts": 62
      },
      {
        "id": "BCG005",
        "name": "Medical Research",
        "counts": 62
      },
      {
        "id": "BCG006",
        "name": "Health Treatment",
        "counts": 62
      }
    ]
  }

  getFormData(data: any) {
    return {
      ...data,
      ...this.formData,
      pageName: this.pageName,
      providers: this.store.providerOptions$,
      portalName: this.portalName,
    }
  }
}
