
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminListUserInput } from './dto/admin-list-user.input'
import { AdminListEmailInput } from '@case-clinical/api/email/data-access'
import { AdminListSettingInput } from '@case-clinical/api/setting/data-access'
import { AdminListUserRoleInput } from '@case-clinical/api/user-role/data-access'
import { AdminListUserCalendarInput } from '@case-clinical/api/user-calendar/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminListAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access'
import { AdminListMessageInput } from '@case-clinical/api/message/data-access'
import { AdminListChatInput } from '@case-clinical/api/chat/data-access'
import { AdminListNavigationInput } from '@case-clinical/api/navigation/data-access'
import { AdminListNotificationInput } from '@case-clinical/api/notification/data-access'
import { AdminListShortcutInput } from '@case-clinical/api/shortcut/data-access'
import { AdminListTeamUserInput } from '@case-clinical/api/team-user/data-access'
import { AdminListTaskItemInput } from '@case-clinical/api/task-item/data-access'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'

@Injectable()
export class ApiUserDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminUsers(adminId: string, input?: AdminListUserInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.findMany({
      where: { 
            lastName: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {emails: true,settings: true,userRoles: true,userCalendars: true,documents: true,assignedDocuments: true,
        messages: true,chats: true,navigations: true,notifications: true,shortcuts: true,teamUsers: true,tasks: true} 
    })
  }

  async adminCountUsers(adminId: string, input?: AdminListUserInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.user.count(
    {
      where: { 
            lastName: { 
                contains: input?.name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }


  async adminUserEmails(adminId: string, input?: AdminListEmailInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.email.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { ownerId: input.ownerId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserSettings(adminId: string, input?: AdminListSettingInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.setting.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserUserRoles(adminId: string, input?: AdminListUserRoleInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userRole.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserUserCalendars(adminId: string, input?: AdminListUserCalendarInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCalendar.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserDocuments(adminId: string, input?: AdminListDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.document.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserAssignedDocuments(adminId: string, input?: AdminListAssignedDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.assignedDocument.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserMessages(adminId: string, input?: AdminListMessageInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.message.findMany({
      where: { 
        AND: [
          { 
            description: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserChats(adminId: string, input?: AdminListChatInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.chat.findMany({
      where: { 
        AND: [
          { 
            lastMessage: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserNavigations(adminId: string, input?: AdminListNavigationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.findMany({
      where: { 
        AND: [
          { 
            link: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserNotifications(adminId: string, input?: AdminListNotificationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.notification.findMany({
      where: { 
        AND: [
          { 
            description: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserShortcuts(adminId: string, input?: AdminListShortcutInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.shortcut.findMany({
      where: { 
        AND: [
          { 
            link: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserTeamUsers(adminId: string, input?: AdminListTeamUserInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.teamUser.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { userId: input.userId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminUserTaskItems(adminId: string, input?: AdminListTaskItemInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.taskItem.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { assignedToId: input.assignedToId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }


  async adminCountUserEmails(adminId: string, input?: AdminListEmailInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.email.count({where: {ownerId: input.ownerId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserSettings(adminId: string, input?: AdminListSettingInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.setting.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserUserRoles(adminId: string, input?: AdminListUserRoleInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userRole.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserUserCalendars(adminId: string, input?: AdminListUserCalendarInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userCalendar.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserDocuments(adminId: string, input?: AdminListDocumentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.document.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserAssignedDocuments(adminId: string, input?: AdminListAssignedDocumentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.assignedDocument.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserMessages(adminId: string, input?: AdminListMessageInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.message.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserChats(adminId: string, input?: AdminListChatInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.chat.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserNavigations(adminId: string, input?: AdminListNavigationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.navigation.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserNotifications(adminId: string, input?: AdminListNotificationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.notification.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserShortcuts(adminId: string, input?: AdminListShortcutInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.shortcut.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserTeamUsers(adminId: string, input?: AdminListTeamUserInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.teamUser.count({where: {userId: input.userId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminCountUserTaskItems(adminId: string, input?: AdminListTaskItemInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.taskItem.count({where: {assignedToId: input.assignedToId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminUser(adminId: string, userId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.findUnique({ where: { id: userId } , include: {emails: true,settings: true,userRoles: true,userCalendars: true,
      documents: true,assignedDocuments: true,messages: true,chats: true,navigations: true,notifications: true,shortcuts: true,
      teamUsers: true,tasks: true} })
  }

  async adminCreateUser(adminId: string, input: AdminCreateUserInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.create({
      data: { 
                 emails: {
                    createMany: {
                        data: {
                            ...input.emails,
                        },
                    },
                },  settings: {
                    createMany: {
                        data: {
                            ...input.settings,
                        },
                    },
                },  userRoles: {
                    createMany: {
                        data: {
                            ...input.userRoles,
                        },
                    },
                },  userCalendars: {
                    createMany: {
                        data: {
                            ...input.userCalendars,
                        },
                    },
                },  documents: {
                    createMany: {
                        data: {
                            ...input.documents,
                        },
                    },
                },  assignedDocuments: {
                    createMany: {
                        data: {
                            ...input.assignedDocuments,
                        },
                    },
                },  messages: {
                    createMany: {
                        data: {
                            ...input.messages,
                        },
                    },
                },  chats: {
                    createMany: {
                        data: {
                            ...input.chats,
                        },
                    },
                },  navigations: {
                    createMany: {
                        data: {
                            ...input.navigations,
                        },
                    },
                },  notifications: {
                    createMany: {
                        data: {
                            ...input.notifications,
                        },
                    },
                },  shortcuts: {
                    createMany: {
                        data: {
                            ...input.shortcuts,
                        },
                    },
                },  teamUsers: {
                    createMany: {
                        data: {
                            ...input.teamUsers,
                        },
                    },
                },  tasks: {
                    createMany: {
                        data: {
                            ...input.tasks,
                        },
                    },
                },developer: input.developer, 
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

}
, include: {emails: true,settings: true,userRoles: true,userCalendars: true,documents: true,assignedDocuments: true,messages: true,
  chats: true,navigations: true,notifications: true,shortcuts: true,teamUsers: true,tasks: true} 
    })
  }

  async adminUpdateUser(adminId: string, userId, input: AdminUpdateUserInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.update({
      where: { id: userId },
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
}
, include: {emails: true,settings: true,userRoles: true,userCalendars: true,documents: true,assignedDocuments: true,messages: true,chats: true,
  navigations: true,notifications: true,shortcuts: true,teamUsers: true,tasks: true} 
    })
  }

  async adminDeleteUser(adminId: string, userId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.delete({ where: { id: userId } })
  }
}

