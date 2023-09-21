import { Tree } from '@nrwl/devkit'
import { Seeder } from './lib/seeder'
import {
  // compactNavigation,
  // defaultNavigation,
  // futuristicNavigation,
  dashboardNavigations,
  queuesNavigation,
  //messages,
  notifications,
  //accidentKinds, clientWas, policyLimits,
  users,
  appNavigations,
  userCalendars,
  appointment,
  messages,
  roles,
  specialties,
  permissions,
  //bodyParts,
  // casePhases,
  // policyLimits,
  //yesNoUnknowns
} from './sample-data'
import { Schema } from './schema'
import * as path from 'path'

import * as fs from 'fs'
import { getDMMF, getConfig } from '@prisma/internals'
import * as moment from 'moment'
// import { Model } from './deserializer'
import { Prisma } from '@prisma/client'
const schemaPath: string = 'libs/api/core/data-access/src/prisma/schema.prisma'
const primsaschema = fs.readFileSync(schemaPath, 'utf-8')

export default async function (host: Tree, schema: Schema) {
  if (!schema.confirm) {
    console.warn(`Seeding database cancelled`)
    return
  }

  const seeder = new Seeder(schema)
  const userNames: string[] = ['admin']

  //---------------STEP 1 Start--------------

  // await seeder.createData('role', roles)
  // await seeder.createData('user', users)
  // await seeder.createData('message', messages)
  // await seeder.createData('notification', notifications)
  // await seeder.createData('navigation', dashboardNavigations, { children: true, user: true, parent: true })
  // await seeder.createData('navigation', appNavigations, { children: true, user: true, parent: true })
  // await seeder.createData('navigation', queuesNavigation, { children: true, user: true, parent: true })
  // await seeder.createData('appointment', [appointment])
  // await seeder.createData('userCalendar', userCalendars, { calendar: true })

  // await seeder.createData('specialty', specialties)

  //---------------STEP 1 End--------------

  // var jsonPath = path.join(__dirname, 'importFiles', 'contacts.tsv');
  // await seeder.importFromCSV('contact', jsonPath)

  //---------------STEP 2 Start--------------

  // await seeder.removeData([ 'userFeature', 'feature', 'permission', 'userFeaturePermission'])

  // await seeder.createData('permission', permissions)

  // await getDMMF({ datamodel: primsaschema }).then(async (datam) => {
  //   let features = datam?.datamodel?.models.map((m) => {
  //     console.log(m.name)
  //     return {
  //       id: m.name,
  //       name: m.name,
  //     }
  //   })

  //   await seeder.createData('feature', features)

  //   var userFeatures: Prisma.UserFeatureCreateInput[] = []
  //   datam?.datamodel?.models.map((entity) => {
  //     userNames.forEach((userId) => {
  //       userFeatures.push({
  //         id: `${userId}.${entity.name}`,
  //         name: `${userId}.${entity.name}`,
  //         user: {
  //           connect: {
  //             id: `${userId}`,
  //           },
  //         },
  //         feature: {
  //           connect: {
  //             id: `${entity.name}`,
  //           },
  //         },
  //       })
  //     })
  //   })
  //   await seeder.createData('userFeature', userFeatures)
  // })

  //---------------STEP 2 End--------------

  
  //---------------STEP 3 Start--------------

  //  await seeder.removeData(['featurePermission'])
  
  // await getDMMF({ datamodel: primsaschema }).then(async (datam) => {
  //   var featurePermissions: Prisma.FeaturePermissionCreateInput[] = []
  //   datam?.datamodel?.models.map((entity) => {
  //     permissions.forEach((perm) => {
  //       featurePermissions.push({
  //         id: `${entity.name}.${perm.id}`,
  //         name: `${entity.name}.${perm.id}`,
  //         feature: {
  //           connect: {
  //             id: `${entity.name}`,
  //           },
  //         },
  //         permission: {
  //           connect: {
  //             id: `${perm.id}`,
  //           },
  //         },
  //       })
  //     })
  //   })
  //   await seeder.createData('featurePermission', featurePermissions)
  // })

  //---------------STEP 3 End--------------

  //---------------STEP 4 Start--------------

  // await seeder.removeData(['userFeaturePermission'])

  // await getDMMF({ datamodel: primsaschema }).then(async (datam) => {
  //   var userFeatures: Prisma.UserFeaturePermissionCreateInput[] = []
  //   datam?.datamodel?.models.map((entity) => {
  //     userNames.forEach((userId) => {
  //       permissions.forEach((perm) => {
  //         userFeatures.push({
  //           id: `${userId}.${entity.name}.${perm.id}`,
  //           name: `${entity.name}.${perm.id}`,
  //           user: {
  //             connect: {
  //               id: `${userId}`,
  //             },
  //           },
  //           featurePermission: {
  //             connect: {
  //               id: `${entity.name}.${perm.id}`,
  //             },
  //           },
  //         })
  //       })
  //     })
  //   })
  //   await seeder.createData('userFeaturePermission', userFeatures)
  // })

  //---------------STEP 4 End--------------

  //---------------STEP 5 Start--------------

  await getDMMF({ datamodel: primsaschema }).then(async (datam) => {
    var userFeatures: Prisma.UserFeaturePermissionCreateInput[] = []
    var fieldPerms: string[] = ['Read', 'Edit', 'Delete']
    datam?.datamodel?.models.map((entity) => {
      entity.fields.forEach((field) => {
        userNames.forEach((userId) => {
          fieldPerms.forEach((fieldPerms) => {
            userFeatures.push({
              id: `${userId}.${entity.name}.${field.name}.${fieldPerms}`,
              name: `${entity.name}.${field.name}.${fieldPerms}`,
              user: {
                connect: {
                  id: `${userId}`,
                },
              },
              featurePermission: {
                connect: {
                  id: `${entity.name}.${fieldPerms}`,
                },
              },
            })
          })
        })
      })

    })

    // try to exclude existing by query and map where not exists

    await seeder.createData('userFeaturePermission', userFeatures)
  })

  //---------------STEP 5 End--------------













  //<---------------------Don't do anything below this line










  // // await seeder.removeData(['userFeaturePermission', 'featurePermission', 'userFeature', 'feature', 'permission'])
  // await seeder.createData('permission', permissions)

  // getDMMF({ datamodel: primsaschema }).then(async (datam) => {
  //   let features = datam?.datamodel?.models.map((m) => {
  //     console.log(m.name)
  //     return {
  //       id: m.name,
  //       name: m.name,
  //     }
  //   })

  //   await seeder.createData('feature', features)

  //   var userFeatures: Prisma.UserFeatureCreateInput[] = []
  //   datam?.datamodel?.models.map((entity) => {
  //     users.forEach((userId) => {
  //       userFeatures.push({
  //         id: `${userId}.${entity.name}`,
  //         name: `${userId}.${entity.name}`,
  //         user: {
  //           connect: {
  //             id: `${userId}`,
  //           },
  //         },
  //         feature: {
  //           connect: {
  //             id: `${entity.name}`,
  //           },
  //         },
  //       })
  //     })
  //   })
  //   await seeder.createData('userFeature', userFeatures)
  // })

  // getDMMF({ datamodel: primsaschema }).then(async (datam) => {
  //   var featurePermissions: Prisma.FeaturePermissionCreateInput[] = []
  //   datam?.datamodel?.models.map((entity) => {
  //     permissions.forEach((perm) => {
  //       featurePermissions.push({
  //         id: `${entity.name}.${perm.id}`,
  //         name: `${entity.name}.${perm.id}`,
  //         feature: {
  //           connect: {
  //             id: `${entity.name}`,
  //           },
  //         },
  //         permission: {
  //           connect: {
  //             id: `${perm.id}`,
  //           },
  //         },
  //       })
  //     })
  //   })
  //   await seeder.createData('featurePermission', featurePermissions)
  // })

  // getDMMF({ datamodel: primsaschema }).then(async (datam) => {
  //   var userFeatures: Prisma.UserFeaturePermissionCreateInput[] = []
  //   datam?.datamodel?.models.map((entity) => {
  //     users.forEach((userId) => {
  //       permissions.forEach((perm) => {
  //         userFeatures.push({
  //           id: `${userId}.${entity.name}.${perm.id}`,
  //           name: `${userId}.${entity.name}.${perm.id}`,
  //           user: {
  //             connect: {
  //               id: `${userId}`,
  //             },
  //           },
  //           featurePermission: {
  //             connect: {
  //               id: `${entity.name}.${perm.id}`,
  //             },
  //           },
  //         })
  //       })
  //     })
  //   })
  //   await seeder.createData('userFeaturePermission', userFeatures)
  // })



  // // Clean up existing data
  // await seeder.removeData([
  //   // These models to be listed in reversed order of dependency as Prisma doesn't support cascading deletes yet.
  //   // Give this issue a thumbs-up to vote for it: https://github.com/prisma/prisma/issues/4711
  //   'message',
  //   'navigation',
  //   'notification',
  //   'email',
  //   'user',
  // ])


  // await seeder.removeData(['whereDoesItHurtSpecialty', 'whereDoesItHurt', 'side', 'specialty', 'clinicalFinding', 'bodyPart'])
  // await seeder.createData('bodyPart', bodyParts)
  // await seeder.createData('specialty', specialties)
  // await seeder.createData('side', sides)
  // await seeder.createData('whereDoesItHurt', whereDoesItHurts)
  // await seeder.createData('whereDoesItHurtSpecialty', whereDoesItHurtSpecialties)



  // var jsonPath = path.join(__dirname, 'importFiles', 'contacts.tsv');
  // await seeder.importFromCSV('contact', jsonPath)
  // await seeder.createData('yesNoUnknown', yesNoUnknowns)
  // await seeder.createData('accidentKind', accidentKinds)

  // await seeder.createData('clientWas', clientWas)
  // await seeder.createData('policyLimit', policyLimits)

  // await seeder.createData('legalCasePhase', casePhases)

  // await seeder.createData('', authorizationKinds)

  //await seeder.createData('feature', )
}
