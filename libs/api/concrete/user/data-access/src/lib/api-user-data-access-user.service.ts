import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput, UpdateResult } from '@case-clinical/api/core/data-access'
import { UserCreateUserInput } from './dto/user-create-user.input'
import { UserListUserInput } from './dto/user-list-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserUpdateUsersInput } from './dto/user-update-users.input'
import { UserListEmailInput } from '@case-clinical/api/email/data-access'
import { UserListSettingInput } from '@case-clinical/api/setting/data-access'
import { UserListUserRoleInput } from '@case-clinical/api/user-role/data-access'
import { UserListUserCalendarInput } from '@case-clinical/api/user-calendar/data-access'
import { UserListDocumentInput } from '@case-clinical/api/document/data-access'
import { UserListAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access'
import { UserListMessageInput } from '@case-clinical/api/message/data-access'
import { UserListChatInput } from '@case-clinical/api/chat/data-access'
import { UserCreateNavigationInput, UserListNavigationInput } from '@case-clinical/api/navigation/data-access'
import { UserListNotificationInput } from '@case-clinical/api/notification/data-access'
import { UserListShortcutInput } from '@case-clinical/api/shortcut/data-access'
import { UserListTeamUserInput } from '@case-clinical/api/team-user/data-access'
import { UserListTaskItemInput } from '@case-clinical/api/task-item/data-access'
import { getGravatarUrl, hashPassword } from '@case-clinical/api/core/util'
import { UserUpdateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access'
import { UserUpdateUserFeatureInput } from '@case-clinical/api/user-feature/data-access'
import { ApiChatUsersDataAccessService } from './api-chat-users-data-access.service'

@Injectable()
export class ApiUserDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService,    private readonly chatUser: ApiChatUsersDataAccessService) { }

  async userUsers(userId: string, input?: UserListUserInput) {
    return this.data.user.findMany({
      take: input?.limit,
      skip: input?.skip,
      include: {
        emails: true,
        settings: true,
        userRoles: true,
        userCalendars: true,
        documents: true,
        assignedDocuments: true,
        messages: true,
        chats: true,
        navigations: true,
        notifications: true,
        shortcuts: true,
        teamUsers: true,
        tasks: true,
      },
    })
  }

  async userCountUsers(userId: string, input?: UserListUserInput): Promise<CorePaging> {
    const total = await this.data.user.count({
      where: {
        lastName: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUser(userId: string, targetUserId: string) {
    return this.data.user.findUnique({
      where: { id: targetUserId },
      include: {
        emails: true,
        settings: true,
        userRoles: true,
        userCalendars: true,
        documents: true,
        assignedDocuments: true,
        messages: true,
        chats: true,
        navigations: true,
        notifications: true,
        shortcuts: true,
        teamUsers: true,
        tasks: true,
        userFeaturePermissions: {
          include: {
            featurePermission: true
          }
        },
        userFeatures: {
          include: {
            feature: true
          }
        }
      },
    })
  }

  async userCreateUser(userId: string, input: UserCreateUserInput) {
    const email = input?.email?.trim()
    const attorney_navigations: UserCreateNavigationInput[] = [
      {
        name: 'Dashboard',
        title: 'Dashboard',
        icon: 'heroicons_outline:desktop-computer',
        link: '/dashboards/attorney',
        type: 'basic'
      },
      {
        name: 'Legal Case',
        title: 'Legal Case',
        icon: 'heroicons_outline:adjustments',
        link: '/queues/legal-cases',
        type: 'basic'
      },
      {
        name: 'Intakes',
        title: 'Intakes',
        icon: 'heroicons_outline:adjustments',
        link: '/queues/intakes',
        type: 'basic'
      },
      {
        name: 'Calendar',
        title: 'Calendar',
        icon: 'heroicons_outline:calendar',
        link: '/apps/calendar',
        type: 'basic'
      },
      {
        name: 'Tasks',
        title: 'Tasks',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/tasks',
        type: 'basic'
      },
      {
        name: 'Teams',
        title: 'Teams',
        icon: 'heroicons_outline:users',
        link: '/attorney/teams',
        type: 'basic'
      },
    ];

    const case_manager_navigations: UserCreateNavigationInput[] = [
      {
        name: 'Dashboard',
        title: 'Dashboard',
        icon: 'heroicons_outline:desktop-computer',
        link: '/dashboards/attorney',
        type: 'basic'
      },
      {
        name: 'Legal Case',
        title: 'Legal Case',
        icon: 'heroicons_outline:adjustments',
        link: '/queues/legal-cases',
        type: 'basic'
      },
      {
        name: 'Calendar',
        title: 'Calendar',
        icon: 'heroicons_outline:calendar',
        link: '/apps/calendar',
        type: 'basic'
      },
      {
        name: 'Tasks',
        title: 'Tasks',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/tasks',
        type: 'basic'
      },
    ];

    const default_navigations: UserCreateNavigationInput[] = [
      {
        name: 'Calendar',
        title: 'Calendar',
        icon: 'heroicons_outline:calendar',
        link: '/apps/calendar',
        type: 'basic'
      },
      {
        name: 'Tasks',
        title: 'Tasks',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/tasks',
        type: 'basic'
      },
    ];


    const inputRole = await this.data.role.findFirst({
      where: {
        id: input.roleId,
      }
    })

    const navigations: UserCreateNavigationInput[] = [];

    if(input.roleId == null || input.roleId == undefined) {
      input.roleId = 'Default'
      navigations.push(...default_navigations)
    }
    if(inputRole != null)
    {
      if ( inputRole.name === 'Attorney') {
        navigations.push(...attorney_navigations);
      }
      if (inputRole.name === 'Case Manager') {
        navigations.push(...case_manager_navigations);
      }
    }
    

    const result = await this.data.user.create({
      data: {
        emails: { create: { email, primary: true } },
        settings: {
          createMany: {
            data: {
              ...input.settings,
            },
          },
        },
        userRoles: {
          create: {
            roleId: input.roleId,
            name: input.username,
          },
        },
        userCalendars: {
          createMany: {
            data: {
              ...input.userCalendars,
            },
          },
        },
        documents: {
          createMany: {
            data: {
              ...input.documents,
            },
          },
        },
        assignedDocuments: {
          createMany: {
            data: {
              ...input.assignedDocuments,
            },
          },
        },
        messages: {
          createMany: {
            data: {
              ...input.messages,
            },
          },
        },
        chats: {
          createMany: {
            data: {
              ...input.chats,
            },
          },
        },
        navigations: {
          createMany: {
            data: [
              ...navigations,
            ],
          },
        },
        notifications: {
          createMany: {
            data: {
              ...input.notifications,
            },
          },
        },
        shortcuts: {
          createMany: {
            data: {
              ...input.shortcuts,
            },
          },
        },
        teamUsers: {
          createMany: {
            data: {
              ...input.teamUsers,
            },
          },
        },
        tasks: {
          createMany: {
            data: {
              ...input.tasks,
            },
          },
        },
        userFeaturePermissions: {
          createMany: {
            data: {
              ...input.userFeaturePermissions,
            },
          },
        },
        userFeatures: {
          createMany: {
            data: {
              ...input.userFeatures,
            },
          },
        },
        name:input.name,
        developer: input.developer,
        username: input.username,
        password: hashPassword(input.password),
        firstName: input.firstName,
        lastName: input.lastName,
        // avatarUrl: input.avatarUrl || getGravatarUrl(input.emails[0]?.email),
        line1: input.line1,
        line2: input.line2,
        city: input.city,
        state: input.state,
        postalCode: input.postalCode,
        phone: input.phone,
        bio: input.bio,
        status: input.status,
        dateOfBirth: input.dateOfBirth,
        cellPhone: input.cellPhone,
        education: input.education,
         //added
        //planId:input.planId,
        customerId:input.customerId,
        slug:input.slug,
        signupStatus:input.signupStatus,
        officeName:input.officeName
      },
      include: {
        emails: true,
        settings: true,
        userRoles: true,
        userCalendars: true,
        documents: true,
        assignedDocuments: true,
        messages: true,
        chats: true,
        navigations: true,
        notifications: true,
        shortcuts: true,
        teamUsers: true,
        tasks: true,
        userFeatures: true,
        userFeaturePermissions: true
      },
    })
    await this.chatUser.createChatUsers({ userId: result.id, firstname: result.firstName, lastname: result.lastName })
    return result;
  }

  async userUserEmails(userId: string, input?: UserListEmailInput) {
    return this.data.email.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { ownerId: input.ownerId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserSettings(userId: string, input?: UserListSettingInput) {
    return this.data.setting.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserUserRoles(userId: string, input?: UserListUserRoleInput) {
    return this.data.userRole.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserUserCalendars(userId: string, input?: UserListUserCalendarInput) {
    return this.data.userCalendar.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserDocuments(userId: string, input?: UserListDocumentInput) {
    return this.data.document.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput) {
    return this.data.assignedDocument.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserMessages(userId: string, input?: UserListMessageInput) {
    return this.data.message.findMany({
      where: {
        AND: [
          {
            description: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserChats(userId: string, input?: UserListChatInput) {
    return this.data.chat.findMany({
      where: {
        AND: [
          {
            lastMessage: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserNavigations(userId: string, input?: UserListNavigationInput) {
    return this.data.navigation.findMany({
      where: {
        AND: [
          {
            link: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserNotifications(userId: string, input?: UserListNotificationInput) {
    return this.data.notification.findMany({
      where: {
        AND: [
          {
            description: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserShortcuts(userId: string, input?: UserListShortcutInput) {
    return this.data.shortcut.findMany({
      where: {
        AND: [
          {
            link: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userUserTeamUsers(userId: string, input?: UserListTeamUserInput) {
    return this.data.teamUser.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { userId: input.userId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async userSelectUsers(userId: string, input?: UserListUserInput) {
    return this.data.user.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }


  async userUserTaskItems(userId: string, input?: UserListTaskItemInput) {
    return this.data.taskItem.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { assignedToId: input.assignedToId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountUserEmails(userId: string, input?: UserListEmailInput): Promise<CorePaging> {
    const total = await this.data.email.count({ where: { ownerId: input.ownerId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserSettings(userId: string, input?: UserListSettingInput): Promise<CorePaging> {
    const total = await this.data.setting.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserUserRoles(userId: string, input?: UserListUserRoleInput): Promise<CorePaging> {
    const total = await this.data.userRole.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserUserCalendars(userId: string, input?: UserListUserCalendarInput): Promise<CorePaging> {
    const total = await this.data.userCalendar.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserDocuments(userId: string, input?: UserListDocumentInput): Promise<CorePaging> {
    const total = await this.data.document.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput): Promise<CorePaging> {
    const total = await this.data.assignedDocument.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserMessages(userId: string, input?: UserListMessageInput): Promise<CorePaging> {
    const total = await this.data.message.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserChats(userId: string, input?: UserListChatInput): Promise<CorePaging> {
    const total = await this.data.chat.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserNavigations(userId: string, input?: UserListNavigationInput): Promise<CorePaging> {
    const total = await this.data.navigation.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserNotifications(userId: string, input?: UserListNotificationInput): Promise<CorePaging> {
    const total = await this.data.notification.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserShortcuts(userId: string, input?: UserListShortcutInput): Promise<CorePaging> {
    const total = await this.data.shortcut.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserTeamUsers(userId: string, input?: UserListTeamUserInput): Promise<CorePaging> {
    const total = await this.data.teamUser.count({ where: { userId: input.userId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCountUserTaskItems(userId: string, input?: UserListTaskItemInput): Promise<CorePaging> {
    const total = await this.data.taskItem.count({ where: { assignedToId: input.assignedToId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUpdateUser(userId: string, targetUserId: string, input: UserUpdateUserInput) {
    return this.data.user.update({
      where: { id: targetUserId },
      data: {
        developer: input.developer,
        username: input.username,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
        avatarUrl: input.avatarUrl,
        line1: input.line1,
        line2: input.line2,
        city: input.city,
        state: input.state,
        postalCode: input.postalCode,
        phone: input.phone,
        bio: input.bio,
        status: input.status,
        dateOfBirth: input.dateOfBirth,
        cellPhone: input.cellPhone,
        education: input.education,
        planId:input.planId,
        customerId:input.customerId,
        slug:input.slug,
        signupStatus:input.signupStatus,
        officeName:input.officeName
      },
      include: {
        emails: true,
        settings: true,
        userRoles: true,
        userCalendars: true,
        documents: true,
        assignedDocuments: true,
        messages: true,
        chats: true,
        navigations: true,
        notifications: true,
        shortcuts: true,
        teamUsers: true,
        tasks: true,
      },
    })
  }

  async userUpdateUserStatus(userId: string, status: string) {
    var result = await this.data.user.update({
      where: { id: userId },
      data: {
        status,
      },
    })

    return result.id !== undefined
  }

  async userUpdateUserFeaturePermissions(userId: string, userFeaturePermissions: UserUpdateUserFeaturePermissionInput[]) {
    await this.data.userFeaturePermission.updateMany({
      where: { userId: userId },
      data: userFeaturePermissions
    })
  }

  async userUpdateUserFeatures(userId: string, userFeatures: UserUpdateUserFeatureInput[]) {
    //TODO: Check the FK side for a connect Or Create

    await this.data.userFeature.updateMany({
      where: { userId: userId },
      data: userFeatures
    })
  }


  async userUpdateUsers(userId: string, input: UserUpdateUsersInput): Promise<UpdateResult> {
    const total = input.users.length;
    let updated = [];
    let created = [];
    let failed = [];
    input.users.forEach(async (inputData) => {
      const data =  {
        id: inputData.id,
name: inputData.name,
developer: inputData.developer,
username: inputData.username,
password: inputData.password,
firstName: inputData.firstName,
lastName: inputData.lastName,
avatarUrl: inputData.avatarUrl,
line1: inputData.line1,
line2: inputData.line2,
city: inputData.city,
state: inputData.state,
postalCode: inputData.postalCode,
phone: inputData.phone,
bio: inputData.bio,
slug: inputData.slug,
status: inputData.status,
signupStatus: inputData.signupStatus,
verified: inputData.verified,
customerId: inputData.customerId,
planId: inputData.planId,
dateOfBirth: inputData.dateOfBirth,
cellPhone: inputData.cellPhone,
education: inputData.education,
officeName: inputData.officeName,

      }

      try {
        const result = await this.data.user.upsert({
          where: {id: inputData.id || ""},
          create: data,
          update: data
        })
        if(result.id === inputData.id) 
          updated.push(data);
        else {
          created.push(data);
        }
      } catch (error) {
        failed.push(data);
      }
    })

    return {
      total: total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed)
    }
  }

  async userDeleteUser(userId: string, targetUserId: string) {
    return this.data.user.delete({ where: { id: targetUserId } })
  }
}
