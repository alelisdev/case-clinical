export const labelColors = [
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink'
];

export const labelColorDefs = {
    gray  : {
        text    : 'text-gray-500',
        bg      : 'bg-gray-500',
        combined: 'text-gray-800 bg-gray-100'
    },
    red   : {
        text    : 'text-red-500',
        bg      : 'bg-red-500',
        combined: 'text-red-800 bg-red-100'
    },
    orange: {
        text    : 'text-orange-500',
        bg      : 'bg-orange-500',
        combined: 'text-orange-800 bg-orange-100'
    },
    yellow: {
        text    : 'text-yellow-500',
        bg      : 'bg-yellow-500',
        combined: 'text-yellow-800 bg-yellow-100'
    },
    green : {
        text    : 'text-green-500',
        bg      : 'bg-green-500',
        combined: 'text-green-800 bg-green-100'
    },
    teal  : {
        text    : 'text-teal-500',
        bg      : 'bg-teal-500',
        combined: 'text-teal-800 bg-teal-100'
    },
    blue  : {
        text    : 'text-blue-500',
        bg      : 'bg-blue-500',
        combined: 'text-blue-800 bg-blue-100'
    },
    indigo: {
        text    : 'text-indigo-500',
        bg      : 'bg-indigo-500',
        combined: 'text-indigo-800 bg-indigo-100'
    },
    purple: {
        text    : 'text-purple-500',
        bg      : 'bg-purple-500',
        combined: 'text-purple-800 bg-purple-100'
    },
    pink  : {
        text    : 'text-pink-500',
        bg      : 'bg-pink-500',
        combined: 'text-pink-800 bg-pink-100'
    }
};


export const folders = [
    {
        id: '7c004a19-4506-48ef-93ab-f16381302e3b',
        title: 'Inbox',
        slug: 'inbox',
        icon: 'heroicons_outline:inbox',
        count: 0
    },
    {
        id: 'de1b41f6-6839-4f1b-9d2c-07e55f6f8f82',
        title: 'Starred',
        slug: 'starred',
        icon: 'heroicons_outline:star',
        count: 0
    },
    {
        id: '1ee2ea29-9a1f-4c27-b4d2-5e465703b6a0',
        title: 'Sent',
        slug: 'sent',
        icon: 'heroicons_outline:paper-airplane',
        count: 0
    },
    {
        id: 'fbdc8e79-a0c4-4a27-bc98-9c81ee7a86e5',
        title: 'Drafts',
        slug: 'draft',
        icon: 'heroicons_outline:document',
        count: 0
    },
    {
        id: '85c004a19-4506-48ef-93ab-f16365302e3b',
        title: 'All Mail',
        slug: 'all',
        icon: 'heroicons_outline:mail',
        count: 0
    },
    {
        id: '0197c436-2ef3-424d-b546-8b7f49186e15',
        title: 'Spam',
        slug: 'spam',
        icon: 'heroicons_outline:exclamation',
        count: 0
    },
    {
        id: '2fa74637-d362-4fd2-9a88-f7195a88bdde',
        title: 'Trash',
        slug: 'trash',
        icon: 'heroicons_outline:trash',
        count: 0
    },
]

export const labels = [
    {
        id: 'b167d3c4-f6ed-4ea6-9579-a12f95a9d76e',
        title: 'Personal',
        slug: 'personal',
        color: 'blue',
    },
    {
        id: '745cf30e-ca84-47a1-a553-b70eb630d8e7',
        title: 'Work',
        slug: 'work',
        color: 'indigo',
    },
    {
        id: '8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3',
        title: 'Payments',
        slug: 'payments',
        color: 'red',
    },
    {
        id: 'b2d1e4e7-7cfd-4b51-ae59-217a093df754',
        title: 'Invoices',
        slug: 'invoices',
        color: 'teal',
    },
    {
        id: '184cd689-4ee4-47cf-9f8a-12233d614326',
        title: 'Accounts',
        slug: 'accounts',
        color: 'purple',
    },
    {
        id: 'b67fc437-6118-4ec8-a3c7-9320b828e3fc',
        title: 'Forums',
        slug: 'forums',
        color: 'green',
    },
]

export const ApiRelateTo = {
  draft: 'DRAFT',
  sent: 'SENT'
}

export const MailAction = {
    reply: 'Reply',
    replyAll: 'Reply All',
    forward: 'Forward'
  }

export const mailType = {
    thread: 'thread',
    message: 'message'
  }
