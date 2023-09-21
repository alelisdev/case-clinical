import { Component } from '@angular/core'
import { ProviderBaseComponent } from '../provider-base.component';

@Component({
  selector: 'provider-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent extends ProviderBaseComponent{
  portalName = "Vendor";
  pageName = 'Blog Details';

  formData={
    pageName: this.pageName,
    portalName: this.portalName,
    "blog": [
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
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        "comments": [
          {
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae, gravida pellentesque urna varius vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "date": "Dec 6, 2017",
            "doctor": {
              "avatar": "https://i.pravatar.cc/150?u=a",
              "name": "Michelle Fairfax",
              "id": "PT004"
            }
          },
          {
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae, gravida pellentesque urna varius vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "date": "Dec 6, 2017",
            "doctor": {
              "avatar": "https://i.pravatar.cc/150?u=JJJAAAJJEd",
              "name": "Carl Kelly",
              "id": "PT003"
            }
          }
        ]
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

  constructor(){
    super();
  }
}
