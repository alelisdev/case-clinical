import { Prisma, Role } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import {
  //createAccidentKinds,
  //createLegalCasePhases,
  createMessage,
  //createPolicyLimit,
  // createAccidentKinds,
  // createClientWas,
  // createPolicyLimit,
  createRole,
  createUser,
  //createYesNoUnknown,
  //createYesNoUnknown,
} from './lib/helpers'

const PASSWORD = hashSync('pch-dot-dev!', 10)

export const roles: Prisma.RoleCreateInput[] = [createRole('Admin'), createRole('User')]

export const users: Prisma.UserCreateInput[] = [
  createUser('admin', 'admin', 'admin@underwriting.dev', PASSWORD),
  createUser('user', 'user', 'user@underwriting.dev', PASSWORD),
]

export const permissions: Prisma.PermissionCreateInput[] = [
  { id: 'Archive', name: 'Archive' },
  { id: 'Create', name: 'Create' },
  { id: 'Delete', name: 'Delete' },
  { id: 'Edit', name: 'Edit' },
  { id: 'Read', name: 'Read' },
  { id: 'Update', name: 'Update' },
  { id: 'View', name: 'View' }
]

/* eslint-disable */
import * as moment from 'moment'

export const messages: Prisma.MessageCreateInput[] = [
  {
    id: '832276cc-c5e9-4fcc-8e23-d38e2e267bc9',
    image: 'assets/images/avatars/male-01.jpg',
    title: 'Gary Peters',
    description: 'We should talk about that at lunch!',
    time: moment().subtract(25, 'minutes').toISOString(), // 25 minutes ago
    read: false,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '608b4479-a3ac-4e26-8675-3609c52aca58',
    image: 'assets/images/avatars/male-04.jpg',
    title: 'Leo Gill (Client #8817)',
    description: 'You can download the latest invoices now. Please check and let me know.',
    time: moment().subtract(50, 'minutes').toISOString(), // 50 minutes ago
    read: false,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '22148c0c-d788-4d49-9467-447677d11b76',
    image: 'assets/images/avatars/female-01.jpg',
    title: 'Sarah',
    description: "Don't forget to pickup Jeremy after school!",
    time: moment().subtract(3, 'hours').toISOString(), // 3 hours ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '492e2917-760c-4921-aa5a-3201a857cd48',
    image: 'assets/images/avatars/female-12.jpg',
    title: 'Nancy Salazar &bull; Joy Publishing',
    description: "I'll proof read your bio on next Monday.",
    time: moment().subtract(5, 'hours').toISOString(), // 5 hours ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '214a46e5-cae7-4b18-9869-eabde7c7ea52',
    image: 'assets/images/avatars/male-06.jpg',
    title: 'Matthew Wood',
    description: 'Dude, I heard that they are going to promote you! Congrats man, tonight the drinks are on me!',
    time: moment().subtract(7, 'hours').toISOString(), // 7 hours ago
    read: false,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '95930319-61cc-4c7e-9324-f1091865330c',
    image: 'assets/images/avatars/female-04.jpg',
    title: 'Elizabeth (New assistant)',
    description: "Boss, I've sent all client invoices but Geoffrey refusing to pay.",
    time: moment().subtract(9, 'hours').toISOString(), // 9 hours ago
    read: false,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '802935e9-9577-48bc-98d1-308a4872afd7',
    image: 'assets/images/avatars/male-06.jpg',
    title: 'William Bell',
    description: 'Did you see this game? We should hang out and give it a shot sometime.',
    time: moment().subtract(1, 'day').toISOString(), // 1 day ago
    read: true,
    link: 'https://www.google.com',
    useRouter: false,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '059f3738-633b-48ea-ad83-19016ce24c62',
    image: 'assets/images/avatars/female-09.jpg',
    title: 'Cheryl Obrien - HR',
    description: "Why did't you still look at the kitten pictures I've sent to you!",
    time: moment().subtract(3, 'days').toISOString(), // 3 days ago
    read: false,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '5c2bb44d-5ca7-42ff-ad7e-46ced9f49a24',
    image: 'assets/images/avatars/female-15.jpg',
    title: 'Joan Jones - Tech',
    description: 'Dude, Cheryl keeps bugging me with kitten pictures all the time :( What are we gonna do about it?',
    time: moment().subtract(4, 'day').toISOString(), // 4 days ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
]

export const notifications: Prisma.NotificationCreateInput[] = [
  {
    id: '493190c9-5b61-4912-afe5-78c21f1044d7',
    icon: 'heroicons_solid:star',
    title: 'Daily challenges',
    description: 'Your submission has been accepted',
    time: moment().subtract(25, 'minutes').toISOString(), // 25 minutes ago
    read: false,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '6e3e97e5-effc-4fb7-b730-52a151f0b641',
    image: 'assets/images/avatars/male-04.jpg',
    description:
      '<strong>Leo Gill</strong> added you to <em>Top Secret Project</em> group and assigned you as a <em>Project Manager</em>',
    time: moment().subtract(50, 'minutes').toISOString(), // 50 minutes ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: 'b91ccb58-b06c-413b-b389-87010e03a120',
    icon: 'heroicons_solid:mail',
    title: 'Mailbox',
    description: 'You have 15 unread mails across 3 mailboxes',
    time: moment().subtract(3, 'hours').toISOString(), // 3 hours ago
    read: false,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '541416c9-84a7-408a-8d74-27a43c38d797',
    icon: 'heroicons_solid:refresh',
    title: 'Cron jobs',
    description: 'Your <em>Docker container</em> is ready to publish',
    time: moment().subtract(5, 'hours').toISOString(), // 5 hours ago
    read: false,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: 'ef7b95a7-8e8b-4616-9619-130d9533add9',
    image: 'assets/images/avatars/male-06.jpg',
    description: '<strong>Roger Murray</strong> accepted your friend request',
    time: moment().subtract(7, 'hours').toISOString(), // 7 hours ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: 'eb8aa470-635e-461d-88e1-23d9ea2a5665',
    image: 'assets/images/avatars/female-04.jpg',
    description: '<strong>Sophie Stone</strong> sent you a direct message',
    time: moment().subtract(9, 'hours').toISOString(), // 9 hours ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: 'b85c2338-cc98-4140-bbf8-c226ce4e395e',
    icon: 'heroicons_solid:mail',
    title: 'Mailbox',
    description: 'You have 3 new mails',
    time: moment().subtract(1, 'day').toISOString(), // 1 day ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '8f8e1bf9-4661-4939-9e43-390957b60f42',
    icon: 'heroicons_solid:star',
    title: 'Daily challenges',
    description:
      'Your submission has been accepted and you are ready to sign-up for the final assigment which will be ready in 2 days',
    time: moment().subtract(3, 'days').toISOString(), // 3 days ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
  {
    id: '30af917b-7a6a-45d1-822f-9e7ad7f8bf69',
    icon: 'heroicons_solid:refresh',
    title: 'Cron jobs',
    description: 'Your Vagrant container is ready to download',
    time: moment().subtract(4, 'day').toISOString(), // 4 days ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
    user: {
      connect: {
        id: 'admin',
      },
    },
  },
]

export const dashboardNavigations: Prisma.NavigationCreateInput[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    type: 'group',
    icon: 'heroicons_outline:home',
    user: {
      connect: {
        id: 'admin',
      },
    },
    children: {
      createMany: {
        data: [
          {
            id: 'dashboards.project',
            title: 'Underwriting / Servicing',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: '/dashboards/project',
          },
        ],
      },
    },
  },
]

export const appNavigations: Prisma.NavigationCreateInput[] = [
  {
    id: 'app',
    title: 'Apps',
    type: 'group',
    icon: 'heroicons_outline:home',
    user: {
      connect: {
        id: 'admin',
      },
    },
    children: {
      createMany: {
        data: [
          {
            id: 'apps.academy',
            title: 'Academy',
            type: 'basic',
            icon: 'heroicons_outline:academic-cap',
            link: '/apps/academy',
          },

          {
            id: 'apps.contacts',
            title: 'Contacts',
            type: 'basic',
            icon: 'heroicons_outline:user-group',
            link: '/apps/contacts',
          },

          {
            id: 'apps.file-manager',
            title: 'File Manager',
            type: 'basic',
            icon: 'heroicons_outline:cloud',
            link: '/apps/file-manager',
          },
          {
            id: 'apps.help-center',
            title: 'Help Center',
            type: 'collapsable',
            icon: 'heroicons_outline:support',
            link: '/apps/help-center',
          },
          {
            id: 'apps.mailbox',
            title: 'Mailbox',
            type: 'basic',
            icon: 'heroicons_outline:mail',
            link: '/apps/mailbox',
          },
        ],
      },
    },
  },
]

export const queuesNavigation: Prisma.NavigationCreateInput[] = [
  {
    id: 'a',
    title: 'Queues',
    type: 'group',
    icon: 'heroicons_outline:adjustments',
    user: {
      connect: {
        id: 'admin',
      },
    },
    children: {
      createMany: {
        data: [
          {
            id: 'a.legal-cases',
            title: 'Legal Cases',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/legal-cases',
          },
          {
            id: 'a.batches',
            title: 'Intakes',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/batch-controls',
          },
          {
            id: 'a.patients',
            title: 'Patients',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/patients',
          },
          {
            id: 'a.organizations',
            title: 'Organizations',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/organizations',
          },
          {
            id: 'a.vendors',
            title: 'Organizations',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/vendors',
          },
        ],
      },
    },
  },
]

export const settingsNavigation: Prisma.NavigationCreateInput[] = [
  {
    id: 'b',
    title: 'Settings',
    type: 'collapsable',
    icon: 'heroicons_outline:adjustments',
    user: {
      connect: {
        id: 'admin',
      },
    },
    children: {
      createMany: {
        data: [
          {
            id: 'b.accident-type',
            title: 'Accident Types',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/accident-types',
          },
          {
            id: 'b.account-status',
            title: 'Account Statuses',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/account-statuses',
          },
          {
            id: 'b.adverse-insurance-status',
            title: 'Adverse Insurance Statuses',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/adverse-insurance-statuses',
          },
          {
            id: 'b.agreement-Type',
            title: 'Agreement Types',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/agreement-types',
          },
          {
            id: 'b.appointment-status',
            title: 'Appointment Statuses',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/appointment-statuses',
          },
          {
            id: 'b.attorney-status',
            title: 'Attorney Statuses',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/queues/attorney-statuses',
          },
        ],
      },
    },
  },
]

export const appointment: Prisma.AppointmentCreateInput = {
  id: 'appointment1',
  name: 'default_calendar_1',
  appointmentDateAndTime: moment().subtract(25, 'minutes').toISOString(),
  duration: 30,
  notes: 'a test appointment',
  recurringEventId: undefined,
  isFirstInstance: false,
  description: 'a visit to the doctor',
  start: '800',
  end: '1000',
  allDay: false,
  recurrence: '',
}

export const userCalendars: Prisma.UserCalendarCreateInput[] = [
  {
    id: 'default_calendar',
    name: 'Default',
    user: {
      connect: {
        id: 'admin',
      },
    },
    calendar: {
      create: {
        name: 'default_calendar',
        title: 'Default Calendar',
        visible: true,
        color: 'blue',
        appointments: {
          connect: [{ id: 'appointment1' }],
        },
      },
    },
  },
]

export const firms: Prisma.FirmCreateInput[] = [
  {
    id: 'wilshirelawfirm',
    name: 'Wilshire Law Firm',
    attorneys: {
      createMany: {
        data: [
          {
            name: 'Bobby Saadian',
            firstName: 'Bobby',
            lastName: 'Saadian',
            email: 'pre-lit@wilshirelawfirm.com',
            barNumber: '#250377',
            barState: 'California',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Jennie Banda',
            firstName: 'Jennie',
            lastName: 'Banda',
            email: 'jennie@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Frank  Murillo',
            firstName: 'Frank ',
            lastName: 'Murillo',
            email: 'FMurillo@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Charlotte Nir',
            firstName: 'Charlotte',
            lastName: 'Nir',
            email: 'CNir@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Nancy Paek',
            firstName: 'Nancy',
            lastName: 'Paek',
            email: 'npaek@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Mary Mosqueda',
            firstName: 'Mary',
            lastName: 'Mosqueda',
            email: 'MMosqueda@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Karina Gonzales',
            firstName: 'Karina',
            lastName: 'Gonzales',
            email: 'kgonzales@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Josue  Flores',
            firstName: 'Josue ',
            lastName: 'Flores',
            email: 'joflores@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Maythe Lara',
            firstName: 'Maythe',
            lastName: 'Lara',
            email: 'MaythesTeam@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Alejandra Velasco',
            firstName: 'Alejandra',
            lastName: 'Velasco',
            email: 'alejandra@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Melanie Noriega',
            firstName: 'Melanie',
            lastName: 'Noriega',
            email: 'Melanie@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Charley Agueta',
            firstName: 'Charley',
            lastName: 'Agueta',
            email: 'Cargueta@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Rosie Stolerman',
            firstName: 'Rosie',
            lastName: 'Stolerman',
            email: 'Rosie@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Lisa  Nhan',
            firstName: 'Lisa ',
            lastName: 'Nhan',
            email: 'Lnhan@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Berenice Hurtado',
            firstName: 'Berenice',
            lastName: 'Hurtado',
            email: 'Berenice@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Millie Jiang',
            firstName: 'Millie',
            lastName: 'Jiang',
            email: 'millie@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Jonathan Reyes',
            firstName: 'Jonathan',
            lastName: 'Reyes',
            email: 'Jreyesteam@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Jennifer Prieto-Cano',
            firstName: 'Jennifer',
            lastName: 'Prieto-Cano',
            email: 'Jpcano@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Alan Blanco',
            firstName: 'Alan',
            lastName: 'Blanco',
            email: 'alan@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Sandra Rosales',
            firstName: 'Sandra',
            lastName: 'Rosales',
            email: 'srosales@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Precila Cisneros',
            firstName: 'Precila',
            lastName: 'Cisneros',
            email: 'Precila@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'J.P Gonzales',
            firstName: 'J.P',
            lastName: 'Gonzales',
            email: 'Jp@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Brenda Arriaga',
            firstName: 'Brenda',
            lastName: 'Arriaga',
            email: 'brenda@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Osiris Chamagua',
            firstName: 'Osiris',
            lastName: 'Chamagua',
            email: 'maity@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Linda Adran',
            firstName: 'Linda',
            lastName: 'Adran',
            email: 'Ladran@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
          {
            name: 'Jennifer Garcia',
            firstName: 'Jennifer',
            lastName: 'Garcia',
            email: 'Jgarcia@wilshirelawfirm.com',
            barNumber: '',
            barState: '',
            address: '3055 Wilshire Blvd, 12th Floor',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90010',
          },
        ],
      },
    },
  },
]

// export const sampleCase: Prisma.IntakeCreateInput = {
//   plaintiff:{
//     create:{
//       firstName: 'Sally',
//       lastName: 'SlipAndFall',
//       name: 'Sally SlipAndFall',
//       dateOfBirth: moment().subtract(25, 'years').toISOString(),
//       createdAt: moment().subtract(25, 'minutes').toISOString(),
//       updatedAt: moment().subtract(25, 'minutes').toISOString(),
//       primaryPhoneNumber: '301-123-1234',
//       requiresTranslator: false,
//       addressLine1: '',
//       addressCity: '',
//       addressStateOrProvince: '',
//       addressPostalCode: ''
//     }
//   },
//   dateOfIntake: moment().subtract(25, 'minutes').toISOString(),
//   policyLimit: {
//     connectOrCreate: {
//       create: {
//         id: '250000',
//         name: '$250,000'
//       },
//       where: {
//         id: '250000'
//       }
//     }
//   },
//   accidentKind: {
//     connectOrCreate: {
//       create: {
//         id: 'slipandfall',
//         name: 'Slip and Fall'
//       },
//       where: {
//         id: 'slipandfall'
//       }
//     }
//   },
//   attorneyDecision: {
//     connectOrCreate: {
//       create: {
//         id:'caseopen',
//         name: 'Case Open'
//       },
//       where:{
//         id: 'caseopen'
//       }
//     }
//   },
//   dateOfLoss: moment().subtract(25, 'days').toISOString(),
//   legalCase: {
//     connectOrCreate: {
//       create: {
//         accidentKind: {
//           connectOrCreate: {
//             create: {
//               id: 'slipandfall',
//               name: 'Slip and Fall'
//             },
//             where: {
//               id: 'slipandfall'
//             }
//           }
//         },
//         caseNumber:'SLIPANDFALL-SALLY-1231231',
//         casePhase: {
//           connectOrCreate:{
//             create: {
//               id: 'prelit',
//               name: 'Pre Litigation'
//             },
//             where: {id: 'prelit'}
//           }
//         },
//         appointments: {
//           createMany: {
//             data: {
//               appointmentDateAndTime: moment().add(1, 'days').toISOString(),
//               allDay: false,
//               checkedIn: false,
//               name: '',
//               description: '',
//               start: '',
//               end: '',
//               duration: 30,
//               notes: '',
//               checkedInDateTime: null,
//               appointmentStatusId: {
//                 connectOrCreate: {
//                   create: {
//                     id: 'scheduled',
//                     name: 'Scheduled'
//                   },
//                   where: {
//                     id: 'scheduled'
//                   }
//                 }
//               },
//             }
//           }
//         }
//       },
//       where: {
//         id: 'sallyslipandfallsamplecase'
//       }
//     }
//   }

// }

export const academyCategories: Prisma.AcademyCategoryCreateInput[] = [{ id: '', name: '', slug: '', title: '' }]

export const accidentTypes: Prisma.AccidentTypeCreateInput[] = [
  { id: 'AssaultAndBattery', name: 'Assault and Battery' },
  { id: 'MedicalMalpractice', name: 'Medical Malpractice' },
  { id: 'MVA', name: 'MVA' },
  { id: 'Other', name: 'Other' },
  { id: 'Premises Liability', name: 'Premises Liability' },
  { id: 'Products Liability', name: 'Products Liability' },
  { id: 'Dog Bite', name: 'Dog Bite' },
  { id: 'WorkmansCompensation', name: 'Workmans Compensation' },
]

export const accountStatuses: Prisma.AccountStatusCreateInput[] = [
  { id: 'Open', name: 'Open' },
  { id: 'Posted', name: 'Posted' },
  { id: 'WrittenOff', name: 'Written Off' },
  { id: 'Adjusted', name: 'Adjusted' },
]

export const adverseInsuranceStatuses: Prisma.AdverseInsuranceStatusCreateInput[] = [
  { id: 'Commercial', name: 'Commercial' },
  { id: 'Defendant', name: 'Defendant' },
  { id: 'Denied', name: 'Denied' },
  { id: 'Municipal', name: 'Municipal' },
  { id: 'Standard', name: 'Standard' },
  { id: 'Substandard', name: 'Substandard' },
  { id: 'UIM/UM', name: 'UIM/UM' },
  { id: 'Unknown', name: 'Unknown' },
]

export const agreementTypes: Prisma.AgreementTypeCreateInput[] = [{ id: 'OneTimeLoA', name: 'One Time LoA' }]

export const appointments: Prisma.AppointmentCreateInput[] = [
  {
    id: 'sample',
    name: '',
    allDay: false,
    appointmentDateAndTime: '',
    appointmentStatus: {
      connect: {
        id: 'Scheduled',
      },
    },
    calendar: {
      connect: {
        id: 'SamplePatientCalendar',
      },
    },
    checkedIn: false,
    checkedInDateTime: null,
    description: '',
    duration: 30,
    end: '',

    isFirstInstance: true,
    notes: '',
  },
]

export const appointmentStatuses: Prisma.AppointmentStatusCreateInput[] = [
  { id: 'Contracted', name: 'Contracted' },
  { id: 'NeedsDateOfService', name: 'Needs Date of Service' },
  { id: 'Scheduled', name: 'Scheduled' },
  { id: 'Pending', name: 'Pending' },
  { id: 'CheckedIn', name: 'Checked In' },
  { id: 'MedicalRecordsComplete', name: 'Medical Records Complete' },
  { id: 'ClaimReceived', name: 'Claim Received' },
]

//export const assignedDocuments: Prisma.AssignedDocumentCreateInput[] = [      { documentId: '',documentTypeId: '',entityId: '',entityName: '',expirationDate: '',id: '',name: '',templateId: '',userId: ''  }  ]
//export const attorneies: Prisma.AttorneyCreateInput[] = [      { addreses: '',attorneyStatusId: '',attorneyTypeId: '',barNumber: '',barState: '',cellPhone: '',city: '',createdById: '',dateCreated: '',direct: '',doNotDisturb: '',email: '',entity: '',fax: '',firmId: '',firmNolongerNeeded: '',firstName: '',id: '',lastName: '',migSource: '',name: '',removed: '',state: '',temp: '',title: '',zip: ''  }  ]
export const attorneyStatuses: Prisma.AttorneyStatusCreateInput[] = [
  { id: 'Active', name: 'Active' },
  { id: 'Inactive', name: 'Inactive' },
]

export const attorneyTypes: Prisma.AttorneyTypeCreateInput[] = [
  { id: 'Attorney', name: 'Attorney' },
  { id: 'Billing', name: 'Billing' },
  { id: 'Case Manager', name: 'Case Manager' },
  { id: 'Contact', name: 'Contact' },
  { id: 'Due Diligence', name: 'Due Diligence' },
  { id: 'Intake Specialist', name: 'Intake Specialist' },
  { id: 'Law Clerk', name: 'Law Clerk' },
  { id: 'Legal Assistant', name: 'Legal Assistant' },
  { id: 'Legal Secretary', name: 'Legal Secretary' },
  { id: 'Litigating Attorney', name: 'Litigating Attorney' },
  { id: 'Main', name: 'Main' },
  { id: 'Medical Records', name: 'Medical Records' },
  { id: 'Missing Lien Waiver Report', name: 'Missing Lien Waiver Report' },
  { id: 'Paralegal', name: 'Paralegal' },
  { id: 'Subpoenas', name: 'Subpoenas' },
  { id: 'Third Party', name: 'Third Party' },
]
export const calculationBasisTypes: Prisma.CalculationBasisTypeCreateInput[] = [
  { id: 'Account By Account', name: 'Account By Account' },
  { id: 'Aggregate', name: 'Aggregate' },
]
//export const calendars: Prisma.CalendarCreateInput[] = [      { color: '',id: '',name: '',title: '', visible: false }  ]
//export const calendarTypes: Prisma.CalendarTypeCreateInput[] = [      { id: '',name: ''  }  ]
//export const calendarWeekdaies: Prisma.CalendarWeekdayCreateInput[] = [      { abbr: '',id: '',label: '',name: '',value: ''  }  ]
//export const caseAccounts: Prisma.CaseAccountCreateInput[] = [      { accountAgentId: '',accountDateReceived: '',accountNumber: '',accountStatusId: '',accountTerm: '',additionalPayment: '',administrativeCost: '',agreementTypeId: '',amountApplied: '',assignedTo: '',assigneePaysToAssignor: '',attorneyPaid: '',averageSalePrice: '',averageWholesalePrice: '',bageledDate: '',balance: '',checkNumber: '',collectionsDate: '',contractedAmount: '',contractId: '',coPay: '',cost: '',count: '',cptCodes: '',createdBy: '',dateApplied: '',dateCreated: '',deemedWriteOffDate: '',defaultTeamLead: '',defaultTeamLeaderRate: '',description: '',dispensingCost: '',estMargin: '',excludeFromBorrowingBase: '',expectedPmtFlatFee: '',expectedPmtRate: '',expenseAmount: '',expensedBadDebtDate: '',factor: '',ghostAccount: '',ghostedBy: '',ghostedDate: '',id: '',ifgAdvanceDate: '',ifgDefaultServiceFee: '',ingredientCost: '',initialRevenue: '',insideBrokerMultiply: '',insideBrokerRate: '',interestRate: '',internalAgentId: '',invoiceCost: '',lastBalance: '',legalCaseId: '',locationId: '',markupPercent: '',mDSContractDate: '',medicareRate: '',minPerformanceFlatFee: '',minPerformanceRate: '',missingBill: '',missingLien: '',missingMedicalRecords: '',name: '',nationalDrugCode: '',note: '',originalDebt: '',originalDueDate: '',origination: '',outsideAgentId: '',outsideBrokerFlatFee: '',outsideBrokerMultiply: '',outsideBrokerRate: '',overageId: '',paidDate: '',paidToPlaintiff: '',parentAccountId: '',percentOfRetail: '',portfolioId: '',procedureTypeId: '',procedureVendorId: '',projectedPayoffDate: '',providerPercentOfMedicare: '',providerTxnID: '',qbEditSequence: '',qbJournalDate: '',qbTxnId: '',quantity: '',rate: '',reduction: '',referringPhysician: '',refundQBEditSequence: '',refundQBJournalDate: '',refundQBTxnId: '',reimbursable: '',reimbursedFromPCR: '',reimbursedTotal: '',removed: '',reOpenedDate: '',resubmitted: '',retailBill: '',roi: '',securitizationGroup: '',serviceDate: '',servicesPerformed: '',servicingFeePercent: '',taxable: '',taxRate: '',teamLeaderRateSource: '',temp: '',thirdPartyFunderName: '',thresholdFlatFee: '',thresholdLocationRate: '',thresholdProviderRate: '',thresholdRate: '',time: '',totalCost: '',treatingPhysician: '',treatmentCity: '',treatmentState: '',unExpensedBadDebtDate: '',unGhostedBy: '',unGhostedDate: '',usualAndCustomary: '',vendorId: '',wcFeeSchedule: '',weightedAverageCost: ''  }  ]
//export const casePreAccidents: Prisma.CasePreAccidentCreateInput[] = [      { accidentDate: '',dateCreated: '',id: '',injuries: '',legalCaseId: '',name: '',removed: '',symptoms: ''  }  ]
//export const casePreInjuries: Prisma.CasePreInjuryCreateInput[] = [      { affectsInjury: false, anatomic: '',dateCreated: '',id: '',injured: '',injuryDate: '',legalCaseId: '',name: '',removed: ''  }  ]
//export const casePreProblems: Prisma.CasePreProblemCreateInput[] = [      { duration: '',id: '',legalCaseId: '',name: '',problemDate: '',regions: '',removed: '',sameRegion: '',symptoms: ''  }  ]
//export const casePreProcedures: Prisma.CasePreProcedureCreateInput[] = [      { dateCreated: '',id: '',legalCaseId: '',name: '',procedureDate: '',procedureType: '',removed: ''  }  ]
//export const caseProcedures: Prisma.CaseProcedureCreateInput[] = [      { approvedDate: '', cost: 0, createdBy: '',dateCreated: '',decisionDate: '',id: '',legalCaseId: '',locationId: '',name: '',nextActionDate: '',notes: '',procedureDate: '',procedureReasonName: '',removed: ''  }  ]
export const caseProgressStatuses: Prisma.CaseProgressStatusCreateInput[] = [
  { id: 'In Progress', name: 'In Progress' },
  { id: 'In Progress No More Treatment', name: 'In Progress No More Treatment' },
  { id: 'New', name: 'New' },
  { id: 'New No More Treatment', name: 'New No More Treatment' },
  { id: 'Not In Progress', name: 'Not In Progress' },
  { id: 'Not In Progress No More Treatment', name: 'Not In Progress No More Treatment' },
]

export const caseStatuses: Prisma.CaseStatusCreateInput[] = [
  { name: 'Bankrupt', id: 'Bankrupt', color: '', isDefault: false, tickerDate: 30, maxTickerDate: 45 },
  { name: 'Billed', id: 'Billed', color: '#EC407A', isDefault: false, tickerDate: 60, maxTickerDate: 120 },
  { name: 'Client Dropped', id: 'Client Dropped', color: '#9575CD', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  { name: 'Closed', id: 'Closed', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  { name: 'Collections', id: 'Collections', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  { name: 'Deceased', id: 'Deceased', color: '', isDefault: false, tickerDate: 30, maxTickerDate: 45 },
  { name: 'Demand Sent', id: 'Demand Sent', color: '#26C6DA', isDefault: false, tickerDate: 90, maxTickerDate: 120 },
  { name: 'Denied', id: 'Denied', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  {
    name: 'Filing Interpleader',
    id: 'Filing Interpleader',
    color: '#4DB6AC',
    isDefault: false,
    tickerDate: 0,
    maxTickerDate: 0,
  },
  { name: 'Ghost', id: 'Ghost', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  {
    name: 'In House Collections',
    id: 'In House Collections',
    color: '',
    isDefault: false,
    tickerDate: 0,
    maxTickerDate: 0,
  },
  { name: 'Interpleader', id: 'Interpleader', color: '#66BB6A', isDefault: false, tickerDate: 180, maxTickerDate: 360 },
  { name: 'LEGAL', id: 'LEGAL', color: '', isDefault: false, tickerDate: 30, maxTickerDate: 45 },
  { name: 'LEGAL LITIGATION', id: 'LEGAL LITIGATION', color: '', isDefault: false, tickerDate: 30, maxTickerDate: 45 },
  { name: 'MedPay', id: 'MedPay', color: '', isDefault: false, tickerDate: 60, maxTickerDate: 90 },
  {
    name: 'Minimum Performance',
    id: 'Minimum Performance',
    color: '',
    isDefault: false,
    tickerDate: 0,
    maxTickerDate: 0,
  },
  { name: 'Open', id: 'Open', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  {
    name: 'Payment Arrangement',
    id: 'Payment Arrangement',
    color: '',
    isDefault: false,
    tickerDate: 0,
    maxTickerDate: 0,
  },
  { name: 'Pending', id: 'Pending', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  {
    name: 'Reduction Approval',
    id: 'Reduction Approval',
    color: '#FFCA28',
    isDefault: false,
    tickerDate: 75,
    maxTickerDate: 90,
  },
  { name: 'REFUND', id: 'REFUND', color: '', isDefault: false, tickerDate: 30, maxTickerDate: 60 },
  { name: 'Sent', id: 'Sent', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
  { name: 'Settled LCP', id: 'Settled LCP', color: '', isDefault: false, tickerDate: 30, maxTickerDate: 45 },
  { name: 'Underwriting', id: 'Underwriting', color: '', isDefault: false, tickerDate: 0, maxTickerDate: 0 },
]

export const patients: Prisma.PatientCreateInput[] = []

//export const caseTypes: Prisma.CaseTypeCreateInput[] = [      { dateCreated: '',entity: '',id: '',migSource: '',name: '',orderIndex: '',removed: '',temp: ''  }  ]
//export const chats: Prisma.ChatCreateInput[] = [      { id: '',lastMessage: '',lastMessageAt: '',muted: '',name: '',unreadCount: '',userId: ''  }  ]
//export const claims: Prisma.ClaimCreateInput[] = [      { accountNumber: '',additionalClaimInfo: '',amountPaid: '',billingCity: '',billingFacility: '',billingLine1: '',billingNpi: '',billingOther: '',billingPhoneNumber: '',billingPostalCode: '',billingState: '',carrierCity: '',carrierLine1: '',carrierLine2: '',carrierName: '',carrierPostalCode: '',carrierState: '',diagnosisCode1: '',diagnosisCode2: '',diagnosisCode3: '',diagnosisCode4: '',diagnosisCode5: '',diagnosisCode6: '',diagnosisCode7: '',diagnosisCode8: '',dueDate: '',facility: '',federalTaxId: '',id: '',insuredCity: '',insuredLine1: '',insuredName: '',insuredPostalCode: '',insuredState: '',name: '',notes: '',originalRecordDate: '',patientAddressCity: '',patientAddressLine1: '',patientAddressPostalCode: '',patientAddressState: '',patientDob: '',patientId: '',patientName: '',patientSignature: '',physicianSignature: '',physicianSignedOn: '',priorAuthorizationNumber: '',providerName: '',providerNumber: '',receivedDate: '',referenceNumber: '',referringProvider: '',referringProviderNpi: '',serviceFacility: '',serviceFacilityCity: '',serviceFacilityLine1: '',serviceFacilityNpi: '',serviceFacilityPostalCode: '',serviceFacilityState: '',sessionNotes: '',totalApprovedAmount: '',totalBilledAmount: '',totalCharges: '',totalNetPayAmount: '',vendor: '',vendorCSZ: '',vendorLine1: '',vendorTaxId: ''  }  ]
//export const claimProcedures: Prisma.ClaimProcedureCreateInput[] = [      { adjustmentAmount: '',approvedAmount: '',billedAmount: '',claimId: '',claimProcedureCodeId: '',claimStatusId: '',diagnosisPointer: '',drugQuantity: '',drugUnit: '',explainationOfBenefitsComment: '',fromDateOfService: '',id: '',internalMemo: '',modifier1: '',modifier2: '',modifier3: '',modifier4: '',name: '',nationalDrugCode: '',netPaymentAmount: '',paymentMethod: '',placeOfServiceId: '',procedureCode: '',procedureCodeId: '',quantity: '',reason: '',toDateOfService: ''  }  ]
export const claimStatuses: Prisma.ClaimStatusCreateInput[] = [
  { id: 'Received', name: 'Received' },
  { id: 'OCRPerformed', name: 'OCR Performed' },
  { id: 'PriorAuthLocated', name: 'Prior Auth Located' },
  { id: 'RetroauthRequired', name: 'Retro Auth Required' },
  { id: 'TPAInProcess', name: 'TPA In Process' },
  { id: 'TPAComplete', name: 'TPA Complete' },
  { id: 'CaseAccountsCreated', name: 'Case Accounts Created' },
  { id: 'ProviderPaid', name: 'Provider Paid' },
  { id: 'Billed', name: 'Billed' },
]
//export const contacts: Prisma.ContactCreateInput[] = [      { adjuster: '',dateOfBirth: '',firstName: '',id: '',insured: '',intake: '',lastName: '',name: '',notes: '',primaryAddressCity: '',primaryAddressLine1: '',primaryAddressLine2: '',primaryAddressPostalCode: '',primaryAddressStateOrProvince: '',primaryEmailAddreses: '',primaryPhoneNumber: '',suffix: ''  }  ]
//export const contracts: Prisma.ContractCreateInput[] = [      { billingOrganizationId: '',billOnBehalf: '',billRate: '',calculationBasisTypeId: '',contractDate: '',id: '',maturityDate: '',name: '',organizationId: '',processId: '',reconciliationPeriodTypeId: '',requiresTpaMedicalNecessity: '',requiresTpaMedicareAllowable: '',signed: '',templateId: '',vendorId: ''  }  ]
//export const contractedRates: Prisma.ContractedRateCreateInput[] = [      { amount: '',billOnBehalf: '',contractedRateKindId: '',contractId: '',contractKindId: '',id: '',name: '',percentage: '',reimbursedRate: ''  }  ]
//export const contractedRateKinds: Prisma.ContractedRateKindCreateInput[] = [{ code: '', id: '', name: '', value: '' }]
export const contractKinds: Prisma.ContractKindCreateInput[] = [{ id: '', name: '' }]
//export const contractTerms: Prisma.ContractTermCreateInput[] = [      { contractTermId: '',factor: '',id: '',maxApproved: '',name: '',numberIncluded: ''  }  ]
//export const courses: Prisma.CourseCreateInput[] = [      { categoryId: '',content: '',description: '',duration: '',featured: '',id: '',name: '',slug: '',title: '',totalSteps: ''  }  ]
//export const documents: Prisma.DocumentCreateInput[] = [      { attachment: '',contractId: '',encoding: '',extension: '',id: '',name: '',patientId: '',patientStudyId: '',prescriptionId: '',procedureVendorId: '',providerId: ''  }  ]
export const documentTypes: Prisma.DocumentTypeCreateInput[] = [{ id: '', name: '' }]
//export const emails: Prisma.EmailCreateInput[] = [      { email: '',id: '',isPublic: '',name: '',ownerId: '',primary: '',verified: '',verifyExpires: '',verifyToken: ''  }  ]
//export const facilityFeeSchedules: Prisma.FacilityFeeScheduleCreateInput[] = [      { baseUnit: '',code: '',description: '',facilityFee: '',id: '',medicareFacilityRate: '',modifier: '',name: '',organizationId: '',profCf: '',specialtyId: ''  }  ]
//export const feeSchedules: Prisma.FeeScheduleCreateInput[] = [      { baseUnit: '',code: '',description: '',id: '',medicarePhysicianFacilityRate: '',medicarePhysicianNonFacilityRate: '',modifier: '',name: '',organizationId: '',physicianFacilityFee: '',physicianNonFacilityFee: '',profCf: '',specialtyId: ''  }  ]
//export const firmStatuses: Prisma.FirmStatusCreateInput[] = [      { active: '',blackListed: '',id: '',name: '',statusColor: ''  }  ]
export const genders: Prisma.GenderCreateInput[] = [{ code: '', id: '', name: '' }]
//export const healthInsurances: Prisma.HealthInsuranceCreateInput[] = [      { healthInsuranceKind: '',id: '',identificationGroupNumber: '',legalCaseId: '',mediCalNumber: '',medicareNumber: '',name: '',policyNumber: ''  }  ]
//export const insurances: Prisma.InsuranceCreateInput[] = [      { adjuster: '',id: '',insuranceCompany: '',insuranceSectorId: '',insuranceTypeId: '',isStackable: '',legalCaseId: '',maximumCoverageAmount: '',minimumCoverageAmount: '',name: '',policyNumber: ''  }  ]
export const insuranceSectors: Prisma.InsuranceSectorCreateInput[] = [{ id: '', name: '' }]
export const insuranceTypes: Prisma.InsuranceTypeCreateInput[] = [{ id: '', name: '' }]
export const languages: Prisma.LanguageCreateInput[] = [{ id: '', name: '' }]
//export const legalCases: Prisma.LegalCaseCreateInput[] = [      { accidentInformation_accidentDescription: '',accidentInformation_accidentTypeId: '',accidentInformation_complaints: '',accidentInformation_dateOfLoses: '',accidentInformation_evaluatedIn: '',accidentInformation_evaluation: '',accidentInformation_evaluationAfterHowLong: '',accidentInformation_gapInCare: '',accidentInformation_gapInCareWhen: '',accidentInformation_initialEvaluation: '',accidentInformation_otherInjuriesSince: '',accidentInformation_preExistingProblems: '',accidentInformation_previousHistory: '',accidentInformation_priorInjuries: '',accidentInformation_review: '',accidentState: '',accidentTypeId: '',adverseInsuranceStatusId: '',agentId: '',assignedTo: '',attorneyFee: '',attorneyId: '',attorneyPaid: '',attorneyReview: '',attorneySentDate: '',caseNoteSummary: '',caseNumber: '',caseProgressStatusId: '',caseStatusDate: '',caseStatusId: '',caseStatusOther: '',caseTypeId: '',createdBy: '',criteria1712: '',dateOfLoses: '',documentsUploaded: '',documentUploadedDate: '',escalatedReview: '',fileNumber: '',firmCaseManager: '',firmId: '',hot: '',id: '',inActive: '',medLevelId: '',medpay: '',motorVehicleAccident_mvaAmount: '',motorVehicleAccident_mvaClaimants: '',motorVehicleAccident_mvaDamage: '',motorVehicleAccident_mvaDriver: '',motorVehicleAccident_mvaGreater: '',motorVehicleAccident_mvaLeses: '',motorVehicleAccident_mvaOperable: '',motorVehicleAccident_mvaPassenger: '',motorVehicleAccident_mvaTar: '',motorVehicleAccident_mvaVehicle: '',name: '',noFirstAppointment: '',noMoreTreatment: '',noMRI: '',noPT: '',paralegal: '',paralegalContact: '',patientDischargedGatheringRecordsDate: '',patientId: '',patientTreatmentStatusId: '',policyLimit: '',premiseAccident_advanceAmount: '',premiseAccident_clientHasCriminalHistory: '',premiseAccident_clientHasObtainedPlaintiffAdvance: '',premiseAccident_criminalHistory: '',premiseAccident_DoYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart: '',premiseAccident_explain: '',premiseAccident_locationOfIncident: '',premiseAccident_LossOfEarningsIsBeingFiled: '',productLiability_product: '',productLiability_productWasRecalled: '',productLiability_proofOfLiability: '',productLiability_whereDidItHappen: '',referringPhysician: '',renegotiatePayOffDate: '',resubmitted: '',underwriting_balance: '',underwriting_billsAttached: '',underwriting_completedMedRecs: '',underwriting_covered: '',underwriting_dateCreated: '',underwriting_estimate: '',underwriting_lastUpdateDate: '',underwriting_medBills: '',underwriting_needsMoreInfo: '',underwriting_plaintiff: '',underwriting_procedureRequested: '',underwriting_remarks: '',underwriting_signedLien: '',underwriting_timeSensitive: '',workRelated_reasonNotFiledUnderWorkComp: '',workRelated_selfInsuredWorkComp: '',workRelated_workCompCaseIsOpenClosed: '',workRelated_workCompCaseSettledAmount: '',workRelated_workCompCaseSettlementIncludesFutureMedicals: '',writeOff: ''  }  ]
//export const locations: Prisma.LocationCreateInput[] = [      { abbrev: '',attentionTo: '',city: '',cotes: '',country: '',division: '',fax: '',id: '',latitude: '',line1: '',line2: '',locationName: '',longitude: '',name: '',officePhone: '',postalCode: '',state: ''  }  ]
export const medLevels: Prisma.MedLevelCreateInput[] = [
  { approvedSiteCosts: 0, id: '', maximumMedicalBillsToDate: 0, name: '' },
]
//export const messages: Prisma.MessageCreateInput[] = [      { chatId: '',description: '',id: '',image: '',isMine: '',link: '',name: '',read: '',time: '',title: '',userId: '',useRouter: ''  }  ]
//export const navigations: Prisma.NavigationCreateInput[] = [      { icon: '',id: '',link: '',name: '',parentId: '',subtitle: '',title: '',type: '',userId: ''  }  ]
//export const notifications: Prisma.NotificationCreateInput[] = [      { description: '',icon: '',id: '',image: '',link: '',name: '',read: '',time: '',title: '',type: '',userId: '',useRouter: ''  }  ]
export const organizations: Prisma.OrganizationCreateInput[] = [{ id: '', name: '' }]
//export const patients: Prisma.PatientCreateInput[] = [      { bmi: '',dateOfBirth: '',debtorRemarks: '',emergencyContactId: '',ethnicityId: '',firstName: '',genderId: '',height: '',homePhoneNumber: '',honorific: '',id: '',isPrimaryPhoneMobile: '',isSecondaryPhoneMobile: '',languageId: '',lastName: '',latitude: '',longitude: '',memberRegistrationNumber: '',middleName: '',mobileNumber: '',name: '',nickname: '',notes: '',occupation: '',primaryAddressCity: '',primaryAddressLine1: '',primaryAddressLine2: '',primaryAddressPostalCode: '',primaryAddressStateOrProvince: '',primaryEmailAddreses: '',primaryPhoneNumber: '',requiresTranslator: '',secondaryPhoneNumber: '',socialSecurityNumber: '',suffix: '',weight: ''  }  ]
//export const patientStudies: Prisma.PatientStudyCreateInput[] = [      { id: '',name: '',patientId: ''  }  ]
export const patientTreatmentStatuses: Prisma.PatientTreatmentStatusCreateInput[] = [{ id: '', name: '' }]
export const placeOfServices: Prisma.PlaceOfServiceCreateInput[] = [{ id: '', isFacility: false, name: '' }]
//export const portfolios: Prisma.PortfolioCreateInput[] = [      { id: '',name: ''  }  ]
//export const prescriptions: Prisma.PrescriptionCreateInput[] = [      { category: '',dateWritten: '',daies: '',id: '',kind: '',medicalProvider: '',name: '',note: '',patientId: '',quantity: '',refills: '',rxNumber: '',sig: '',strength: '',unit: ''  }  ]
//export const priorMedsToDates: Prisma.PriorMedsToDateCreateInput[] = [      { amount: 0,id: '', legalCaseId: '',name: '',priorMedsToDateStatusId: '', quantity:  0  }  ]
export const priorMedsToDateStatuses: Prisma.PriorMedsToDateStatusCreateInput[] = [{ id: '', name: '' }]
export const procedureTypes: Prisma.ProcedureTypeCreateInput[] = [
  { dateCreated: '', id: '', isSystem: false, modality: '', name: '', removed: false },
]
//export const procedureVendors: Prisma.ProcedureVendorCreateInput[] = [      { contractId: '',estimate: '',fundingApproved: '',id: '',name: '',procedureId: '',vendorId: ''  }  ]
export const processes: Prisma.ProcessCreateInput[] = [{ id: '', name: '' }]
export const reconciliationPeriodTypes: Prisma.ReconciliationPeriodTypeCreateInput[] = [{ id: '', name: '' }]
//export const requiredFields: Prisma.RequiredFieldCreateInput[] = [      { accidentTypeId: '',entityName: '',id: '',medLevelId: '',name: ''  }  ]
//export const roles: Prisma.RoleCreateInput[] = [      { id: '',name: ''  }  ]
//export const settings: Prisma.SettingCreateInput[] = [      { dateFormat: '',id: '',name: '',startWeekOn: '',timeFormat: '',userId: ''  }  ]
//export const shortcuts: Prisma.ShortcutCreateInput[] = [      { description: '',icon: '',id: '',label: '',link: '',name: '',userId: '',useRouter: ''  }  ]
export const specialties: Prisma.SpecialtyCreateInput[] = [{ active: true, id: '', name: '' }]
export const tags: Prisma.TagCreateInput[] = [{ id: '', name: '' }]
//export const taskItems: Prisma.TaskItemCreateInput[] = [      { assignedDate: '',assignedToId: '',completed: false, completedOn: '',dueDate: '',id: '',legalCaseId: '',name: '',notes: '',order: '',priority: '',title: '',type: ''  }  ]
//export const taskTags: Prisma.TaskTagCreateInput[] = [      { id: '',name: '',tagId: '',taskId: ''  }  ]
//export const teams: Prisma.TeamCreateInput[] = [      { id: '',name: ''  }  ]
//export const teamRoles: Prisma.TeamRoleCreateInput[] = [      { id: '',name: ''  }  ]
//export const teamUsers: Prisma.TeamUserCreateInput[] = [      { id: '',name: '',teamId: '',teamRoleId: '',userId: ''  }  ]
//export const templates: Prisma.TemplateCreateInput[] = [      { attachment: '',encoding: '',id: '',name: '',signatureFileType: ''  }  ]
//export const timeEntries: Prisma.TimeEntryCreateInput[] = [      { date: '',description: '',hours: '',id: '',isBilled: '',legalCaseId: '',name: '',rate: ''  }  ]
//export const userCourseProgresses: Prisma.UserCourseProgressCreateInput[] = [      { completed: '',courseId: '',currentStep: '',id: '',name: '',userId: ''  }  ]
//export const userRoles: Prisma.UserRoleCreateInput[] = [      { id: '',name: '',roleId: '',userId: ''  }  ]
//export const vendors: Prisma.VendorCreateInput[] = [      { ach: '',agreementDetails: '',apDetailTemplate: '',baa: '',bankAccountNumber: '',bankCity: '',bankName: '',bankRoutingNumber: '',bankState: '',bankZip: '',billOfSaleInstructions: '',billOfSaleTemplate: '',businessCentralName: '',cellphone: '',city: '',contactPerson: '',contract: '',country: '',dl: '',email: '',emailAddreses: '',facilityCheck: '',fax: '',id: '',latitude: '',line1: '',line2: '',longitude: '',mailingAddreses: '',name: '',nci: '',nds: '',notes: '',office: '',ota: '',other: '',owner: '',permission: '',phoneNumber: '',postalCode: '',reductionNotes: '',sa: '',state: '',taxId: '',ucc: '',vendorTypeId: '',w9: '',website: '',wire: ''  }  ]
export const vendorTypes: Prisma.VendorTypeCreateInput[] = [{ id: '', name: '' }]
//export const writeOffs: Prisma.WriteOffCreateInput[] = [      { accountId: '', amount: 0,createdBy: '',dateCreated: '',id: '',name: '',writeOffStatusId: ''  }  ]
export const writeOffStatuses: Prisma.WriteOffStatusCreateInput[] = [{ id: '', name: '' }]