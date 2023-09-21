import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { AdminCreateCourseInput } from './dto/admin-create-course.input'
import { AdminListCourseInput } from './dto/admin-list-course.input'
import { AdminUpdateCourseInput } from './dto/admin-update-course.input'

@Injectable()
export class ApiCourseDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCourses(adminId: string, input?: AdminListCourseInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.course.findMany({
      where: {
        name: {
          contains: input?.name,
        },
      },
      take: input?.limit,
      skip: input?.skip,
      include: { category: true },
    })
  }

  async adminCountCourses(adminId: string, input?: AdminListCourseInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.course.count({
      where: {
        name: {
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

  async adminCourse(adminId: string, courseId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.course.findUnique({ where: { id: courseId }, include: { category: true } })
  }

  async adminCreateCourse(adminId: string, input: AdminCreateCourseInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.course.create({
      data: {
        category:
          input.categoryId != null
            ? {
                connect: {
                  id: input.categoryId,
                },
              }
            : undefined,
        name: input.name,
        slug: input.slug,
        title: input.title,
        description: input.description,
        duration: input.duration,
        totalSteps: input.totalSteps,
        featured: input.featured,
        content: input.content,
      },
      include: { category: true },
    })
  }

  async adminUpdateCourse(adminId: string, courseId, input: AdminUpdateCourseInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.course.update({
      where: { id: courseId },
      data: {
        name: input.name,
        slug: input.slug,
        title: input.title,
        description: input.description,
        duration: input.duration,
        totalSteps: input.totalSteps,
        featured: input.featured,
        content: input.content,
        categoryId: input.categoryId,
      },
      include: { category: true },
    })
  }

  async adminDeleteCourse(adminId: string, courseId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.course.delete({ where: { id: courseId } })
  }
}
