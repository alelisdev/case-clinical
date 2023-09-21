import { ApiCoreDataAccessService, CorePaging } from '@case-clinical/api/core/data-access';
import { Injectable } from '@nestjs/common'
import { AdminCreateNavigationInput } from './dto/admin-create-navigation.input'
import { AdminUpdateNavigationInput } from './dto/admin-update-navigation.input'
import { AdminListRoleNavigationInput } from './dto/admin-list-role-navigation.input'
import { AdminListNavigationInput } from './dto/admin-list-navigation.input';
import { AdminUpdateRoleNavigationInput } from './dto/admin-update-role-navigation.input';

@Injectable()
export class ApiNavigationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) { }

  async adminRoleNavigations(adminId: string, input: AdminListRoleNavigationInput) {
    return this.data.roleNavigation.findMany({
      where: {
        roleId: input.roleId,
        type: 'basic'
      },
      include: {
        feature: true
      }
    })
  }

  async adminUpdateRoleNavigation(adminId: string, roleNavigationId: string, input: AdminUpdateRoleNavigationInput) {
    const updated = await this.data.roleNavigation.update({
      where: {
        id: roleNavigationId
      },
      include: {
        feature: true,
      },
      data: input,
    });

    const userRoles = await this.data.userRole.findMany({
      where: { roleId: updated.roleId }
    })
    const userIds = userRoles.map((userRole) => userRole.userId);
    if(userIds.length > 0) {
      await this.data.navigation.updateMany({
        where: {
          userId: { in: userIds },
          featureId: updated.featureId
        },
        data: input
      })
    }
    return updated;
  }

  async adminUpdateRoleNavigations(roleId: string, featureIds: string[]) {
    if (roleId === null) return false;
    const role = await this.data.role.findFirst({
      where: {
        id: roleId
      }
    })
    const roleName = role.name;
    await this.data.roleNavigation.deleteMany({
      where: {
        roleId: roleId
      }
    })

    {
      // Fetch navigation groups
      const navigationGroups = await this.data.featureNavigation.findMany({
        where: {
          parent: null,
        },
        select: {
          id: true,
          title: true,
          type: true,
          icon: true,
          link: true
        }
      });

      // Merge navigation groups with the current role
      await this.data.roleNavigation.createMany({
        data: navigationGroups.map((ng) => ({
          ...ng,
          id: `${roleId}_${ng.id}`,
          roleId,
          name: `${roleName}.${ng.title}`
        }))
      });

      // Fetch navigation items
      const navigaionItems = await this.data.featureNavigation.findMany({
        where: {
          featureId: {
            in: featureIds
          }
        },
        select: {
          id: true,
          title: true,
          type: true,
          icon: true,
          link: true,
          parentId: true,
          featureId: true
        }
      })
      // Merge navigation items with the current role
      await this.data.roleNavigation.createMany({
        data: navigaionItems.map((ni) => ({
          ...ni,
          parentId: `${roleId}_${ni.parentId}`,
          id: `${roleId}_${ni.id}`,
          roleId,
          name: `${roleName}.${ni.title}`
        }))
      });

      // Update user navigations that belongs to this role
      const role = await this.data.role.findFirst({
        where: {
          id: roleId
        },
        include: {
          userRoles: true
        }
      });
      const userIds = role.userRoles.map(userRole => userRole.userId);
      userIds.map(async userId => {
        const user = await this.data.user.findFirst({
          where: {
            id: userId
          },
          select: {
            userRoles: true
          }
        });
        console.log(user)
        const roleIds = user.userRoles.map(userRole => userRole.roleId);
        await this.adminUpdateUserNavigations(userId, roleIds)
      })
    }

    return true;
  }

  async adminUpdateUserNavigations(userId: string, roleIds: string[]) {

    // Delete all previous navigation items
    await this.data.navigation.deleteMany({
      where: {
        userId: userId,
        parentId: {
          not: null
        }
      }
    });
    await this.data.navigation.deleteMany({
      where: {
        userId: userId,
        parentId: null
      }
    });

    const navigationItems = await this.data.roleNavigation.findMany({
      // distinct: ['roleId', 'featureId'],
      where: {
        roleId: {
          in: roleIds
        },
        parent: null
      },
      include: {
        children: true
      }
    });

    if (navigationItems.length === 0) return false;
    console.log('navigatinItems = ', navigationItems)
    navigationItems.map(async navigationGroup => {
      const parentGroup = await this.data.navigation.create({
        data: {
          userId,
          name: `${userId}.${navigationGroup.title}`,
          title: navigationGroup.title,
          icon: navigationGroup.icon,
          type: navigationGroup.type,
          featureId: navigationGroup.featureId
        }
      });
      if (navigationGroup.children.length > 0) {
        await this.data.navigation.createMany({
          data: navigationGroup.children.map(ni => ({
            title: ni.title,
            icon: ni.icon,
            type: ni.type,
            userId,
            name: `${userId}.${ni.title}`,
            parentId: parentGroup.id,
            featureId: ni.featureId,
            link: ni.link
          }))
        })
      }
    })
    return true;
  }

  async adminNavigations(adminId: string, input?: AdminListNavigationInput) {
    await this.data.ensureAdminUser(adminId)
    return this.data.navigation.findMany({
      where: {
        name: {
          contains: input?.name
        }
      },
      take: input?.limit,
      skip: input?.skip, include: { children: true, user: true, parent: true }
    })
  }

  async adminCountNavigations(adminId: string, input?: AdminListNavigationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    const total = await this.data.navigation.count(
      {
        where: {
          name: {
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

  async adminNavigationNavigations(adminId: string, input?: AdminListNavigationInput) {
    await this.data.ensureAdminUser(adminId)
    return this.data.navigation.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name
            }
          },
          { parentId: input.parentId }
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async adminCountNavigationNavigations(adminId: string, input?: AdminListNavigationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    const total = await this.data.navigation.count({ where: { parentId: input.parentId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async adminNavigation(adminId: string, navigationId) {
    await this.data.ensureAdminUser(adminId)
    return this.data.navigation.findUnique({ where: { id: navigationId }, include: { children: true, user: true, parent: true } })
  }

  async adminCreateNavigation(adminId: string, input: AdminCreateNavigationInput) {
    await this.data.ensureAdminUser(adminId)
    return this.data.navigation.create({
      data: {
        user:
          input.userId != null
            ? {
              connect: {
                id: input.userId
              }
            } : undefined,
        parent:
          input.parentId != null
            ? {
              connect: {
                id: input.parentId
              }
            } : undefined, children: {
              createMany: {
                data: {
                  ...input.children,
                },
              },
            }, name: input.name,
        title: input.title,
        subtitle: input.subtitle,
        type: input.type,
        icon: input.icon,
        link: input.link,
      }
      , include: { children: true, user: true, parent: true }
    })
  }

  async adminUpdateNavigation(adminId: string, navigationId, input: AdminUpdateNavigationInput) {
    await this.data.ensureAdminUser(adminId)
    return this.data.navigation.update({
      where: { id: navigationId },
      data: {
        name: input.name,
        title: input.title,
        subtitle: input.subtitle,
        type: input.type,
        icon: input.icon,
        link: input.link,
        userId: input.userId,
        parentId: input.parentId
      }
      , include: { children: true, user: true, parent: true }
    })
  }

  async adminDeleteNavigation(adminId: string, navigationId) {
    await this.data.ensureAdminUser(adminId)
    return this.data.navigation.delete({ where: { id: navigationId } })
  }
}
