import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'fuse-dashboard',
    templateUrl    : './fuse.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseDashboardComponent
{
  formData = {
    "events": 20,
    "approaching": 50,
    "pending": 12,
    "dob": "1985-12-12",
    "casePaging": {
      "limit": 10,
      "skip": 30,
      "total": 145
    },
    "cases": [
      {
        "client": {
          "name": "Client1"
        },
        "dateOfLoss": "2023-11-12",
        "accidentType": {
          "name": "Motor Vehicle Accident"
        }
      },
      {
        "client": {
          "name": "Client2"
        },
        "dateOfLoss": "2023-10-9",
        "accidentType": {
          "name": "Heart Attack"
        }
      }
    ],
    "taskPaging": {
      "limit": 10,
      "skip": 120,
      "total": 125
    },
    "tasks": [
      {
        "title": "Task1",
        "dueDate": "2024-12-11",
        "assignedTo": {
          "name": "John"
        },
        "status": "Confirm"
      },
      {
        "title": "Task2",
        "dueDate": "2024-10-11",
        "assignedTo": {
          "name": "Alice"
        },
        "status": "Pending"
      },
      {
        "title": "Task3",
        "dueDate": "2023-6-11",
        "assignedTo": {
          "name": "Alex"
        },
        "status": "Cancel"
      }
    ],
    "images": [
      {
        "path": "https://i.postimg.cc/8FpZjGjT/dr-atoian-orthopedic-surgeon-pasadena.png",
        "name": "Dr. Atoian",
        "location": "Pasadena",
        "title": "Orthopedic Surgeon"
      },
      {
        "path": "https://i.postimg.cc/bGm3n5tk/dr-bergen-ortho-extremity-la-jolla.png",
        "name": "Dr. Kim",
        "location": "San Diego",
        "title": "Ortho Extremity"
      },
      {
        "path": "https://i.postimg.cc/7Gc9sTXL/dr-eldringhoff-ortho-extremity-west-covina-los-anglese.png",
        "name": "Dr. Eldringhoff",
        "location": "Los Anglese",
        "title": "Ortho Extremity"
      },
      {
        "path": "https://i.postimg.cc/CnqNWL6s/dr-kim-ortho-extremity-san-diego.png",
        "name": "Dr. Bergen",
        "location": "La Jolla",
        "title": "Ortho Extremity"
      },
      {
        "path": "https://i.postimg.cc/gJH5dSnY/dr-samimi-ortho-extremity-west-covina.png",
        "name": "Dr. Samimi",
        "location": "West Covina",
        "title": "Ortho Extremity"
      }
    ],
    "doctors":[
      {
        "id":1,
        "name" : "Jami Anna",
        "feedback" : 49,
        "avatar" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0yQxCnWumx466KJwJZjBsc5gG0ytm8xhsjA&usqp=CAU",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 4,
        "scope" : "$160",
        "date" : "Available on Fri, 22 Mar",
        "price" : 160
      },
      {
        "id":2,
        "name" : "Jame Tom",
        "feedback" : 49,
        "avatar" : "https://i.postimg.cc/CnqNWL6s/dr-kim-ortho-extremity-san-diego.png",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 4,
        "scope" : "$110-$220",
        "date" : "Available on Fri, 22 Mar",
        "price" : 180
      },
      {
        "id":3,
        "name" : "Anny Bolt",
        "feedback" : 49,
        "avatar" : "https://i.postimg.cc/7Gc9sTXL/dr-eldringhoff-ortho-extremity-west-covina-los-anglese.png",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 3,
        "scope" : "$120",
        "date" : "Available on Fri, 22 Mar",
        "price" : 130
      },
      {
        "id":4,
        "name" : "Burin Perrin",
        "feedback" : 49,
        "avatar" : "https://i.postimg.cc/gJH5dSnY/dr-samimi-ortho-extremity-west-covina.png",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 4,
        "scope" : "$160",
        "date" : "Available on Fri, 22 Mar",
        "price" : 160
      },
      {
        "id":5,
        "name" : "Luca Simon",
        "feedback" : 49,
        "avatar" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABdL3NnT27uPg-oc6nBfw1NRJek1pREYHeQ&usqp=CAU",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 4,
        "scope" : "$160-220",
        "date" : "Available on Fri, 22 Mar",
        "price" : 160
      },
      {
        "id":6,
        "name" : "Ruby Perrin",
        "feedback" : 49,
        "avatar" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uWIigI7TtAks_DJCAg-5LJcEgPjt-6xRSiHiG4bTWhDBRJJE2RLHAFsRGv3_w2NXxhs&usqp=CAU",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 5,
        "scope" : "$260",
        "date" : "Available on Fri, 22 Mar",
        "price" : 160
      },
      {
        "id":7,
        "name" : "Antoy Suan",
        "avatar" : "https://i.postimg.cc/gJH5dSnY/dr-samimi-ortho-extremity-west-covina.png",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 5,
        "scope" : "$260",
        "date" : "Available on Fri, 22 Mar",
        "price" : 160
      },
      {
        "id":8,
        "name" : "Jami Anna",
        "feedback" : 49,
        "avatar" : "https://i.postimg.cc/bGm3n5tk/dr-bergen-ortho-extremity-la-jolla.png",
        "subtitle" : "BDS, MDS - Oral & Maxillofacial Surgery",
        "rating": 4,
        "scope" : "$160",
        "date" : "Available on Fri, 22 Mar",
        "price" : 160
      }
    ],
    "imagesForSlider": [
      {
        "path": "/assets/carousels/photo-1444065707204-12decac917e8.jfif"
      },
      {
        "path": "/assets/carousels/photo-1445452916036-9022dfd33aa8.jfif"
      },
      {
        "path": "/assets/carousels/photo-1443996104801-80c82e789b18.jfif"
      },
      {
        "path": "/assets/carousels/photo-1505839673365-e3971f8d9184.jfif"
      },
      {
        "path": "/assets/carousels/photo-1545420333-23a22b18b8fa.jfif"
      }
    ],
    "brands": [
      {
        "path": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT7Du_HVwacowjAEkl1d37QoVDE5BD6p7UYQ&usqp=CAU",
        "name": "advertisement"
      },
      {
        "path": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynj2lKWS13AUUYwU2wvLIfPBWcj03REY5BA&usqp=CAU",
        "name": "advertisement"
      },
      {
        "path": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjoZt6wpM0kxuQzvlNpILBR6NfRwAaqqZgQ&usqp=CAU",
        "name": "advertisement"
      }
    ],
    "tabs": [
      {
        "id": "music",
        "active": true,
        "color": "text-white",
        "background": "bg-blue-700",
        "title": "Listen to Your Favorite Music",
        "content": "Sign in to Apple music or Spotify on your profile to access your favorite music."
      },
      {
        "id": "par",
        "active": false,
        "color": "text-white",
        "background": "bg-green-700",
        "title": "Prior Authorization Request",
        "content": "Have a Rx or orders for your client in hand? Submit them here to PCH to quickly retrieve an Authorization number."
      },
      {
        "id": "task",
        "active": false,
        "color": "text-white",
        "background": "bg-blue-700",
        "title": "Task List",
        "content": "Click here for quick access to the tasks currently assigned to you or your team."
      },
      {
        "id": "funding",
        "active": false,
        "color": "text-white",
        "background": "bg-yellow-700",
        "title": "Apply for Funding",
        "content": "Have a STAT surgery? If you don't have time to submit your case for PCH Underwriting and need funding, click here for quick access."
      },
      {
        "id": "expense",
        "active": false,
        "color": "text-white",
        "background": "bg-blue-700",
        "title": "Submit an expense",
        "content": "Track your case expenditures. Any out of pocket expenses that you require reimbursement for must be tracked to a case."
      },
      {
        "id": "training",
        "active": false,
        "color": "text-white",
        "background": "bg-indigo-700",
        "title": "Training",
        "content": "Case Clinical Underwriting E-Learning, click here to access 'content' on how to use the system. You will also find a great course library on specific procedures and what they entail."
      }
    ]
  }
}
