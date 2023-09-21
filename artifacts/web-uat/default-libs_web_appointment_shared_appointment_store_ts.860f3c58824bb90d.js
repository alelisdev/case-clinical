"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_appointment_shared_appointment_store_ts"],{

/***/ 241907:
/*!*********************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/appointment.business-action-base.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppointmentBusinessActionBase": () => (/* binding */ AppointmentBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class AppointmentBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
  // override loggingService!: ILoggingService;
  // override actionName: string;
  constructor(actionName) {
    super();
    this.showRuleMessages = true;
    this.hideRuleMessages = false;
    this.actionName = actionName;
  }
  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;
    this.execute();
    return this.response;
  }
}

/***/ }),

/***/ 195149:
/*!***************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/cancel-appointments.action.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancelAppointmentAction": () => (/* binding */ CancelAppointmentAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class CancelAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment) {
    super('CancelAppointmentAction');
    this.appointment = appointment;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointment.id, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userCancelAppointment({
      appointmentId: this.appointment.id
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 878579:
/*!*****************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/check-in-appointments.action.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckInAppointmentAction": () => (/* binding */ CheckInAppointmentAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class CheckInAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment) {
    super('CheckInAppointmentAction');
    this.appointment = appointment;
  }
  preValidateAction() {
    var _a;
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointment.id, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.AreEqual('currentStatus', 'You can only check confirmed appointments in', (_a = this.appointment.appointmentStatus) === null || _a === void 0 ? void 0 : _a.name, 'Confirmed', true));
  }
  performAction() {
    this.response = this.businessProvider.data.userCheckInAppointment({
      appointmentId: this.appointment.id
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 145881:
/*!****************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/confirm-appointments.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfirmAppointmentAction": () => (/* binding */ ConfirmAppointmentAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class ConfirmAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment) {
    super('ConfirmAppointmentAction');
    this.appointment = appointment;
  }
  preValidateAction() {
    var _a;
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointment.id, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.AreEqual('currentStatus', 'You can confirm only pending appointments', (_a = this.appointment.appointmentStatus) === null || _a === void 0 ? void 0 : _a.name, 'Pending', true));
  }
  performAction() {
    this.response = this.businessProvider.data.userConfirmAppointment({
      appointmentId: this.appointment.id
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 444712:
/*!**************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/create-appointment.action.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAppointmentAction": () => (/* binding */ CreateAppointmentAction)
/* harmony export */ });
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ 328234);
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rules_create_appointment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rules/create-appointment-input-is-valid.rule */ 697471);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);





class CreateAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_2__.AppointmentBusinessActionBase {
  constructor(input) {
    super('CreateAppointmentAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _rules_create_appointment_input_is_valid_rule__WEBPACK_IMPORTED_MODULE_3__.CreateAppointmentInputIsValidRule('InputIsNotNull', 'The input information is not valid.', this.input, this.showRuleMessages));
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_1__.CompareDatesLessRule('AppointmentDateTimeIsBeforeCheckInDateTime', 'CheckIn DateTime should be after Appointment DateTime', this.input.appointmentDateAndTime, this.input.checkedInDateTime));
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateAppointment({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,zen_observable__WEBPACK_IMPORTED_MODULE_0__.of)(result.data.created);
    }));
  }
}

/***/ }),

/***/ 494143:
/*!*************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/hide-appointments.action.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HideAppointmentAction": () => (/* binding */ HideAppointmentAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class HideAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment) {
    super('HideAppointmentAction');
    this.appointment = appointment;
  }
  preValidateAction() {
    var _a;
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointment.id, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.AreNotEqual('currentStatus', 'You can only hide non-pending appointments', (_a = this.appointment.appointmentStatus) === null || _a === void 0 ? void 0 : _a.name, 'Pending', true));
  }
  performAction() {
    this.response = this.businessProvider.data.userHideAppointment({
      appointmentId: this.appointment.id
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 484000:
/*!***************************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/request-reschedule-appointments.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestRescheduleAppointmentAction": () => (/* binding */ RequestRescheduleAppointmentAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class RequestRescheduleAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment) {
    super('RequestRescheduleAppointmentAction');
    this.appointment = appointment;
  }
  preValidateAction() {
    var _a;
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointment.id, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.AreEqual('currentStatus', 'You can only request reschedule for cancelled appointments', (_a = this.appointment.appointmentStatus) === null || _a === void 0 ? void 0 : _a.name, 'Cancelled', true));
  }
  performAction() {
    this.response = this.businessProvider.data.userRequestReschedule({
      appointmentId: this.appointment.id
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 204130:
/*!*******************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/reschedule-appointments.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RescheduleAppointmentAction": () => (/* binding */ RescheduleAppointmentAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class RescheduleAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment, rescheduleDate) {
    super('RescheduleAppointmentAction');
    this.appointment = appointment;
    this.rescheduleDate = rescheduleDate;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointment.id, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userRescheduleAppointment({
      appointmentId: this.appointment.id,
      rescheduleDate: this.rescheduleDate
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.created)));
  }
}

/***/ }),

/***/ 176272:
/*!***************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/update-appointments.action.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAppointmentAction": () => (/* binding */ UpdateAppointmentAction),
/* harmony export */   "UpdateAppointmentsAction": () => (/* binding */ UpdateAppointmentsAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);




class UpdateAppointmentsAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointments) {
    super('UpdateAppointmentsAction');
    this.appointments = appointments;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointments, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAppointments({
      input: {
        appointments: this.appointments
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}
class UpdateAppointmentAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(appointment, appointmentId) {
    super('UpdateAppointmentAction');
    this.appointment = appointment;
    this.appointmentId = appointmentId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('Input', 'Input should have values', this.appointment, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CellIdIsValidRule('Id', 'Id should be a CUID and not null', this.appointmentId, true));
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateAppointment({
      appointmentId: this.appointmentId,
      input: this.appointment
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.updated)));
  }
}

/***/ }),

/***/ 515418:
/*!***************************************************************************************!*\
  !*** ./libs/web/appointment/shared/actions/validate-appointment-excel-data.action.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateAppointmentExcelDataAction": () => (/* binding */ ValidateAppointmentExcelDataAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment.business-action-base */ 241907);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class ValidateAppointmentExcelDataAction extends _appointment_business_action_base__WEBPACK_IMPORTED_MODULE_1__.AppointmentBusinessActionBase {
  constructor(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses) {
    super('ValidateAppointmentExcelDataAction');
    this.valid = false;
    this.excelData = excelData;
    this.locations = locations;
    this.patients = patients;
    this.clinicalProviders = clinicalProviders;
    this.legalCases = legalCases;
    this.appointmentStatuses = appointmentStatuses;
  }
  preValidateAction() {
    const names = [];
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`patientName_${index}_is_valid}`, "Patient Is Not Valid", 'patient.name', datum['patient'], this.patients, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`clinicalProviderName_${index}_is_valid}`, "Clinical Provider Is Not Valid", 'clinicalProvider.name', datum['clinicalProvider'], this.clinicalProviders, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule(`appointmentStatusName_${index}_is_valid}`, "Appointment Status Is Not Valid", 'appointmentStatus.name', datum['appointmentStatus'], this.appointmentStatuses, true));
    });
    // Check Duplicate Error
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportDuplicateRule('nameIsUnique', 'Name should be unique', names, true));
  }
  performAction() {}
  finish() {
    super.finish();
    const unknownNamesByColumn = {};
    let conflictNames = [];
    if (this.validationContext.hasRuleViolations()) {
      this.valid = false;
      this.validationContext.rules.map(rule => {
        if (rule instanceof _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportSolutionRule) {
          if (!rule.isValid) {
            if (!unknownNamesByColumn[rule.columnName]) {
              unknownNamesByColumn[rule.columnName] = {
                options: rule.possibleValueList.map(el => el.name),
                newNames: [rule.newName]
              };
            } else {
              if (!unknownNamesByColumn[rule.columnName]['newNames'].includes(rule.newName)) {
                unknownNamesByColumn[rule.columnName]['newNames'].push(rule.newName);
              }
            }
          }
        } else if (rule instanceof _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.ImportDuplicateRule) {
          if (!rule.isValid) conflictNames = rule.conflicts;
        }
      });
    } else this.valid = true;
    this.response = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)({
      valid: this.valid,
      excelData: this.excelData,
      conflictNames,
      unknownNames: unknownNamesByColumn
    });
  }
}

/***/ }),

/***/ 420333:
/*!******************************************************************************!*\
  !*** ./libs/web/appointment/shared/appointment.business-provider.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppointmentBusinessProviderService": () => (/* binding */ AppointmentBusinessProviderService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_validate_appointment_excel_data_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./actions/validate-appointment-excel-data.action */ 515418);
/* harmony import */ var _actions_create_appointment_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/create-appointment.action */ 444712);
/* harmony import */ var _actions_update_appointments_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-appointments.action */ 176272);
/* harmony import */ var _actions_check_in_appointments_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/check-in-appointments.action */ 878579);
/* harmony import */ var _actions_request_reschedule_appointments_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/request-reschedule-appointments.action */ 484000);
/* harmony import */ var _actions_reschedule_appointments_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./actions/reschedule-appointments.action */ 204130);
/* harmony import */ var _actions_confirm_appointments_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actions/confirm-appointments.action */ 145881);
/* harmony import */ var _actions_cancel_appointments_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./actions/cancel-appointments.action */ 195149);
/* harmony import */ var _actions_hide_appointments_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actions/hide-appointments.action */ 494143);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
















class AppointmentBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext) {
    super('NotificationService.AppointmentBusinessProviderService', logger, serviceContext);
    this.data = data;
  }
  createAppointment(input) {
    const action = new _actions_create_appointment_action__WEBPACK_IMPORTED_MODULE_2__.CreateAppointmentAction(input);
    action.Do(this);
    return action.response;
  }
  updateAppointment(input, appointmentId) {
    const action = new _actions_update_appointments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAppointmentAction(input, appointmentId);
    action.Do(this);
    return action.response;
  }
  checkInAppointment(appointment) {
    const action = new _actions_check_in_appointments_action__WEBPACK_IMPORTED_MODULE_4__.CheckInAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }
  requestRescheduleAppointment(appointment) {
    const action = new _actions_request_reschedule_appointments_action__WEBPACK_IMPORTED_MODULE_5__.RequestRescheduleAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }
  rescheduleAppointment(appointment, rescheduleDate) {
    const action = new _actions_reschedule_appointments_action__WEBPACK_IMPORTED_MODULE_6__.RescheduleAppointmentAction(appointment, rescheduleDate);
    action.Do(this);
    return action.response;
  }
  confirmAppointment(appointment) {
    const action = new _actions_confirm_appointments_action__WEBPACK_IMPORTED_MODULE_7__.ConfirmAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }
  cancelAppointment(appointment) {
    const action = new _actions_cancel_appointments_action__WEBPACK_IMPORTED_MODULE_8__.CancelAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }
  hideAppointment(appointment) {
    const action = new _actions_hide_appointments_action__WEBPACK_IMPORTED_MODULE_9__.HideAppointmentAction(appointment);
    action.Do(this);
    return action.response;
  }
  importAppointments(appointments) {
    const updateAppointmentsAction = new _actions_update_appointments_action__WEBPACK_IMPORTED_MODULE_3__.UpdateAppointmentsAction(appointments);
    updateAppointmentsAction.Do(this);
    return updateAppointmentsAction.response;
  }
  validateAppointmentExcelData(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses) {
    const validateAppointmentExcelDataAction = new _actions_validate_appointment_excel_data_action__WEBPACK_IMPORTED_MODULE_10__.ValidateAppointmentExcelDataAction(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses);
    validateAppointmentExcelDataAction.Do(this);
    return validateAppointmentExcelDataAction.response;
  }
}
AppointmentBusinessProviderService.ɵfac = function AppointmentBusinessProviderService_Factory(t) {
  return new (t || AppointmentBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_12__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext));
};
AppointmentBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
  token: AppointmentBusinessProviderService,
  factory: AppointmentBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 882588:
/*!************************************************************!*\
  !*** ./libs/web/appointment/shared/appointment.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppointmentService": () => (/* binding */ AppointmentService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var _appointment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appointment.business-provider.service */ 420333);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);







class AppointmentService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(serviceContext, businessProvider, loggingService) {
    super("AppointmentService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  createAppointment(input) {
    const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
    return this.businessProvider.createAppointment(filteredObj);
  }
  updateAppointment(input, appointmentId) {
    return this.businessProvider.updateAppointment(input, appointmentId);
  }
  checkInAppointment(appointment) {
    return this.businessProvider.checkInAppointment(appointment);
  }
  requestRescheduleAppointment(appointment) {
    return this.businessProvider.requestRescheduleAppointment(appointment);
  }
  rescheduleAppointment(appointment, rescheduleDate) {
    return this.businessProvider.rescheduleAppointment(appointment, rescheduleDate);
  }
  confirmAppointment(appointment) {
    return this.businessProvider.confirmAppointment(appointment);
  }
  cancelAppointment(appointment) {
    return this.businessProvider.cancelAppointment(appointment);
  }
  hideAppointment(appointment) {
    return this.businessProvider.hideAppointment(appointment);
  }
  importAppointments(appointments) {
    return this.businessProvider.importAppointments(appointments);
  }
  validateAppointmentExcelData(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses) {
    return this.businessProvider.validateAppointmentExcelData(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses);
  }
}
AppointmentService.ɵfac = function AppointmentService_Factory(t) {
  return new (t || AppointmentService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_appointment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AppointmentBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_appointment_business_provider_service__WEBPACK_IMPORTED_MODULE_3__.AppointmentBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
AppointmentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: AppointmentService,
  factory: AppointmentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 31392:
/*!**********************************************************!*\
  !*** ./libs/web/appointment/shared/appointment.store.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebAppointmentFeatureStore": () => (/* binding */ WebAppointmentFeatureStore),
/* harmony export */   "appointmentStatusColorMap": () => (/* binding */ appointmentStatusColorMap),
/* harmony export */   "appointmentStatusIconMap": () => (/* binding */ appointmentStatusIconMap)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 670262);
/* harmony import */ var _case_clinical_shared_util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/shared/util/helpers */ 284264);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _appointment_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./appointment.service */ 882588);















const appointmentStatusColorMap = {
  'Pending': "#ffbc03",
  'Checked In': "#49c204",
  'Claim Submitted': "#50fe93",
  'Approved': 'green',
  'Rejected': "red",
  'Rescheduled': "#ffbc03",
  'Personal': 'orange',
  'Provider Paid': "blue",
  'No Showed': "#ff1d1a",
  'Confirmed': "#49c204",
  'Processing': "#50fe93",
  'Cancelled': "red"
};
const appointmentStatusIconMap = {
  'Pending': "assets/icons/pending.png",
  'Checked In': "assets/icons/checkedin.png",
  'Rescheduled': "assets/icons/rescheduled.png",
  'No Showed': "assets/icons/noshow.png",
  'Confirmed': "assets/icons/confirmed.png",
  'Cancelled': "assets/icons/cancel.png",
  'Approved': 'assets/icons/pending.png',
  'Rejected': "assets/icons/pending.png",
  'Personal': 'assets/icons/pending.png',
  'Processing': "assets/icons/pending.png",
  'Provider Paid': "assets/icons/pending.png",
  'Claim Submitted': "assets/icons/pending.png"
};
class WebAppointmentFeatureStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, appointmentService) {
    super({
      loading: false,
      appointments: [],
      done: false,
      searchQuery: '',
      id: undefined,
      formName: undefined,
      locationId: undefined,
      patientId: undefined,
      clinicalProviderId: undefined,
      attorneyId: undefined,
      firmId: undefined,
      legalCaseId: undefined,
      appointmentStatusId: undefined,
      visitKindId: undefined,
      medicalRecordStatusId: undefined,
      medicalRecordStatusOptions: undefined,
      paging: {
        limit: 10000,
        skip: 0
      }
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.appointmentService = appointmentService;
    this.medicalRecordStatuses$ = this.data.userMedicalRecordStatuses({
      input: {}
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(res => {
      var _a;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)((_a = res.data.items) === null || _a === void 0 ? void 0 : _a.map(medicalRecordStatus => {
        return {
          id: medicalRecordStatus === null || medicalRecordStatus === void 0 ? void 0 : medicalRecordStatus.id,
          title: medicalRecordStatus === null || medicalRecordStatus === void 0 ? void 0 : medicalRecordStatus.name
        };
      }).filter(f => f.title != "Test Status" && f.title != "Medical Records Complete"));
    }));
    this.dateFilter$ = this.select(s => s.dateFilter);
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.done$ = this.select(s => s.done);
    this.item$ = this.select(s => {
      var _a, _b, _c, _d;
      return Object.assign(Object.assign({}, s.item), {
        firstSpecialty: (_c = (_b = (_a = s.item) === null || _a === void 0 ? void 0 : _a.clinicalProvider) === null || _b === void 0 ? void 0 : _b.clinicalProviderSpecialties) === null || _c === void 0 ? void 0 : _c.at(0),
        color: ((_d = s.item) === null || _d === void 0 ? void 0 : _d.appointmentStatus) ? appointmentStatusColorMap[s.item.appointmentStatus.name] : 'red'
      });
    });
    this.appointments$ = this.select(s => s.appointments);
    this.locations$ = this.select(s => s.locations || []);
    this.patients$ = this.select(s => s.patients || []);
    this.clinicalProviders$ = this.select(s => s.clinicalProviders || []);
    this.legalCases$ = this.select(s => s.legalCases || []);
    this.appointmentStatuses$ = this.select(s => s.appointmentStatuses || []);
    this.visitKinds$ = this.select(s => s.visitKinds || []);
    this.locationId$ = this.select(s => s.locationId);
    this.patientId$ = this.select(s => s.patientId);
    this.attorneyId$ = this.select(s => s.attorneyId);
    this.firmId$ = this.select(s => s.firmId);
    this.clinicalProviderId$ = this.select(s => s.clinicalProviderId);
    this.legalCaseId$ = this.select(s => s.legalCaseId);
    this.appointmentCount$ = this.select(s => s.appointmentCount);
    this.appointmentStatusId$ = this.select(s => s.appointmentStatusId);
    this.medicalRecordStatusId$ = this.select(s => s.medicalRecordStatusId);
    this.medicalRecordStatusOptions$ = this.select(s => s.medicalRecordStatusOptions);
    this.visitKindId$ = this.select(s => s.visitKindId);
    this.paging$ = this.select(s => s.paging);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.formName$ = this.select(s => s.formName);
    this.actionResult$ = this.select(this.item$, this.done$, (item, done) => ({
      item,
      done
    }), {
      debounce: true
    });
    // Further Processed Appointment List
    this.formattedAppointments$ = this.select(this.appointments$, appointments => {
      return appointments.map(appointment => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let timeAndDuration = '- -(-min)';
        if (appointment.start) {
          let duration = appointment.duration || '0 min';
          if (appointment.duration) {
            if (appointment.duration < 60) {
              duration = `${appointment.duration}min`;
            } else {
              if (appointment.duration > 60) duration = Math.floor(appointment.duration / 60) + 'h ' + appointment.duration % 60 + 'min';
              if (appointment.duration % 60 === 0) duration = Math.floor(appointment.duration / 60) + 'h';
            }
          }
          timeAndDuration = `${(0,_case_clinical_shared_util_helpers__WEBPACK_IMPORTED_MODULE_3__.convertTo12HourFormat)(appointment.start)} (${duration})`;
        }
        const otherActions = [{
          title: 'View'
        }, {
          title: 'Edit'
        }];
        if (((_a = appointment.appointmentStatus) === null || _a === void 0 ? void 0 : _a.name) !== 'No Showed') {
          otherActions.unshift({
            title: 'No Show'
          });
        }
        let canRequestVisits = false;
        const arr = (_b = appointment.clinicalProvider) === null || _b === void 0 ? void 0 : _b.clinicalProviderSpecialties;
        arr === null || arr === void 0 ? void 0 : arr.forEach(item => {
          var _a;
          if (((_a = item.specialty) === null || _a === void 0 ? void 0 : _a.name) === 'Chiropractor' || (item === null || item === void 0 ? void 0 : item.name) === 'Home Health') canRequestVisits = true;
        });
        if (canRequestVisits) {
          otherActions.push({
            title: 'Request More Visits'
          });
        }
        return Object.assign(Object.assign({}, appointment), {
          timeAndDuration,
          canRequestVisits,
          otherActions,
          providerImage: (_d = (_c = appointment.clinicalProvider) === null || _c === void 0 ? void 0 : _c.profileImage) === null || _d === void 0 ? void 0 : _d.id,
          firstSpecialty: (_f = (_e = appointment.clinicalProvider) === null || _e === void 0 ? void 0 : _e.clinicalProviderSpecialties) === null || _f === void 0 ? void 0 : _f.at(0),
          patientImage: ((_g = appointment.patient) === null || _g === void 0 ? void 0 : _g.users) != null && ((_h = appointment.patient) === null || _h === void 0 ? void 0 : _h.users) != undefined ? (_k = (_j = appointment.patient) === null || _j === void 0 ? void 0 : _j.users[0]) === null || _k === void 0 ? void 0 : _k.avatarUrl : '',
          providerSpecialties: (_l = appointment.clinicalProvider) === null || _l === void 0 ? void 0 : _l.clinicalProviderSpecialties,
          color: appointment.appointmentStatus ? (_m = appointmentStatusColorMap[appointment.appointmentStatus.name]) !== null && _m !== void 0 ? _m : "red" : 'red',
          icon: appointment.appointmentStatus ? (_o = appointmentStatusIconMap[appointment.appointmentStatus.name]) !== null && _o !== void 0 ? _o : 'assets/icons/rescheduled.png' : 'assets/icons/rescheduled.png'
        });
      });
    });
    this.formattedAppointmentsForProvider$ = this.select(this.formattedAppointments$, appointments => {
      return appointments.map(appointment => {
        var _a, _b, _c;
        const actions = [{
          title: 'Check In',
          color: (_a = appointmentStatusColorMap['Checked In']) !== null && _a !== void 0 ? _a : 'red',
          icon: appointmentStatusIconMap['Checked In']
        }, {
          title: 'Cancel',
          color: (_b = appointmentStatusColorMap['Cancelled']) !== null && _b !== void 0 ? _b : 'red',
          icon: appointmentStatusIconMap['Cancelled']
        }, {
          title: 'No Show',
          color: (_c = appointmentStatusColorMap['No Showed']) !== null && _c !== void 0 ? _c : 'red',
          icon: appointmentStatusIconMap['No Showed']
        }];
        return Object.assign(Object.assign({}, appointment), {
          actions,
          canChangeStatus: true
        });
      });
    });
    this.formattedAppointmentsForPatient$ = this.select(this.formattedAppointments$, appointments => {
      return appointments.map(appointment => {
        var _a, _b, _c, _d;
        const possibleActions = {
          'Pending': [{
            title: 'Confirm',
            color: (_a = appointmentStatusColorMap['Confirmed']) !== null && _a !== void 0 ? _a : 'red',
            icon: appointmentStatusIconMap['Confirmed']
          }, {
            title: 'Cancel',
            color: (_b = appointmentStatusColorMap['Cancelled']) !== null && _b !== void 0 ? _b : 'red',
            icon: appointmentStatusIconMap['Cancelled']
          }],
          'Checked In': [],
          'Rescheduled': [{
            title: 'Confirm',
            color: (_c = appointmentStatusColorMap['Confirmed']) !== null && _c !== void 0 ? _c : 'red',
            icon: appointmentStatusIconMap['Confirmed']
          }, {
            title: 'Cancel',
            color: (_d = appointmentStatusColorMap['Cancelled']) !== null && _d !== void 0 ? _d : 'red',
            icon: appointmentStatusIconMap['Cancelled']
          }],
          'No Showed': [],
          'Confirmed': [],
          'Cancelled': [
            // {
            //   title: 'Request Reschedule',
            //   color:  appointmentStatusColorMap['Rescheduled'] ?? 'red',
            //   icon: appointmentStatusIconMap['Rescheduled'],
            // }
          ]
        };
        const statusChangeActions = appointment.appointmentStatus ? possibleActions[appointment.appointmentStatus.name] : [];
        return Object.assign(Object.assign({}, appointment), {
          actions: statusChangeActions,
          canChangeStatus: statusChangeActions.length > 0
        });
      });
    });
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.formattedAppointments$, this.locations$, this.patients$, this.clinicalProviders$, this.legalCases$, this.appointmentStatuses$, this.visitKinds$, this.medicalRecordStatuses$, (errors, loading, item, formName, appointments, locations, patients, clinicalProviders, legalCases, appointmentStatuses, visitKinds, medicalRecordStatuses) => ({
      errors,
      loading,
      item,
      formName,
      appointments,
      locations,
      patients,
      clinicalProviders,
      legalCases,
      appointmentStatuses,
      visitKinds,
      medicalRecordStatuses
    }), {
      debounce: true
    });
    this.input$ = this.select(this.paging$, this.locationId$, this.dateFilter$, this.patientId$, this.clinicalProviderId$, this.legalCaseId$, this.appointmentStatusId$, this.visitKindId$, this.searchQuery$, this.attorneyId$, this.firmId$, this.medicalRecordStatusId$, this.medicalRecordStatusOptions$, (paging, locationId, dateFilter, patientId, clinicalProviderId, legalCaseId, appointmentStatusId, visitKindId, searchQuery, attorneyId, firmId, medicalRecordStatusId, medicalRecordStatusOptions) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      locationId: locationId,
      patientId: patientId,
      clinicalProviderId: clinicalProviderId,
      legalCaseId: legalCaseId,
      appointmentStatusId: appointmentStatusId,
      visitKindId: visitKindId,
      total: paging.total,
      attorneyId: attorneyId,
      firmId: firmId,
      dateFilter,
      medicalRecordStatusId: medicalRecordStatusId,
      medicalRecordStatusOptions: medicalRecordStatusOptions
    }));
    this.setFormName = this.updater((state, formName) => Object.assign(Object.assign({}, state), {
      formName
    }));
    this.setAttorneyId = this.updater((state, attorneyId) => Object.assign(Object.assign({}, state), {
      attorneyId
    }));
    this.setProviderId = this.updater((state, providerId) => Object.assign(Object.assign({}, state), {
      providerId
    }));
    this.setFirmId = this.updater((state, firmId) => Object.assign(Object.assign({}, state), {
      firmId
    }));
    this.setLocationId = this.updater((state, locationId) => Object.assign(Object.assign({}, state), {
      locationId
    }));
    this.setId = this.updater((state, id) => Object.assign(Object.assign({}, state), {
      id
    }));
    this.setPatientId = this.updater((state, patientId) => Object.assign(Object.assign({}, state), {
      patientId
    }));
    this.setClinicalProviderId = this.updater((state, clinicalProviderId) => Object.assign(Object.assign({}, state), {
      clinicalProviderId
    }));
    this.setLegalCaseId = this.updater((state, legalCaseId) => Object.assign(Object.assign({}, state), {
      legalCaseId
    }));
    this.setAppointmentStatusId = this.updater((state, appointmentStatusId) => Object.assign(Object.assign({}, state), {
      appointmentStatusId
    }));
    this.setMedicalRecordStatusId = this.updater((state, medicalRecordStatusId) => Object.assign(Object.assign({}, state), {
      medicalRecordStatusId
    }));
    this.setMedicalRecordStatusOptions = this.updater((state, medicalRecordStatusOptions) => Object.assign(Object.assign({}, state), {
      medicalRecordStatusOptions
    }));
    this.setVisitKindId = this.updater((state, visitKindId) => Object.assign(Object.assign({}, state), {
      visitKindId
    }));
    this.setDateFilter = this.updater((state, dateFilter) => Object.assign(Object.assign({}, state), {
      dateFilter
    }));
    this.setSkip = this.updater((state, skip) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        skip: skip
      })
    }));
    this.setLimit = this.updater((state, limit) => Object.assign(Object.assign({}, state), {
      paging: Object.assign(Object.assign({}, state.paging), {
        limit: limit
      })
    }));
    this.filterLocations = term => this.data.userSelectLocations({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const locations = res.data.items;
      this.patchState({
        locations
      });
      return locations;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
      return result.data.items;
    }));
    this.filterPatients = term => this.data.userSelectPatients({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const patients = res.data.items;
      this.patchState({
        patients
      });
      return patients;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
      return result.data.items;
    }));
    this.filterClinicalProviders = term => this.data.userSelectClinicalProviders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const clinicalProviders = res.data.items;
      this.patchState({
        clinicalProviders
      });
      return clinicalProviders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
      return result.data.items;
    }));
    this.filterLegalCases = term => this.data.userSelectLegalCases({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const legalCases = res.data.items;
      this.patchState({
        legalCases
      });
      return legalCases;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
      return result.data.items;
    }));
    this.filterAppointmentStatuses = term => this.data.userSelectAppointmentStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const appointmentStatuses = res.data.items;
      this.patchState({
        appointmentStatuses
      });
      return appointmentStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
      return result.data.items;
    }));
    this.filterVisitKinds = term => this.data.userSelectVisitKinds({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const visitKinds = res.data.items;
      this.patchState({
        visitKinds
      });
      return visitKinds;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
      return result.data.items;
    }));
    this.addLocation = this.updater((state, location) => Object.assign(Object.assign({}, state), {
      locations: state.locations.concat(location)
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addClinicalProvider = this.updater((state, clinicalProvider) => Object.assign(Object.assign({}, state), {
      clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
    }));
    this.addLegalCase = this.updater((state, legalCase) => Object.assign(Object.assign({}, state), {
      legalCases: state.legalCases.concat(legalCase)
    }));
    this.addAppointmentStatus = this.updater((state, appointmentStatus) => Object.assign(Object.assign({}, state), {
      appointmentStatuses: state.appointmentStatuses.concat(appointmentStatus)
    }));
    this.addVisitKind = this.updater((state, visitKind) => Object.assign(Object.assign({}, state), {
      visitKinds: state.visitKinds.concat(visitKind)
    }));
    this.deleteAppointment = this.updater((state, appointment) => {
      return Object.assign(Object.assign({}, state), {
        appointments: state.appointments.filter(el => el.id !== appointment.id)
      });
    });
    this.setItem = this.updater((state, item) => Object.assign(Object.assign({}, state), {
      item
    }));
    this.addNewAppointment = this.updater((state, appointment) => Object.assign(Object.assign({}, state), {
      appointments: [...state.appointments, appointment]
    }));
    this.updateAppointment = this.updater((state, appointment) => {
      return Object.assign(Object.assign({}, state), {
        appointments: state.appointments.map(el => {
          return el.id === appointment.id ? appointment : el;
        })
      });
    });
    this.addAppointments = this.updater((state, newAppointments) => Object.assign(Object.assign({}, state), {
      appointments: state.appointments.concat(newAppointments)
    }));
    this.updateAppointments = this.updater((state, updatedAppointments) => {
      return Object.assign(Object.assign({}, state), {
        appointments: state.appointments.map(appointment => {
          const updated = updatedAppointments.find(el => el.id === appointment.id);
          return updated ? updated : appointment;
        })
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => Object.assign(Object.assign({}, state), {
      searchQuery
    }));
    this.loadAppointmentEffect = this.effect(appointmentId$ => appointmentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(appointmentId => this.data.userAppointment({
      appointmentId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      const appointment = res.data.item;
      return this.patchState({
        item: appointment,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadAppointmentsEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.input$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([_, input]) => {
      console.log('appointment input', input);
      return this.data.userAppointments({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        return this.patchState({
          paging: {
            limit: input.limit,
            skip: input.skip,
            total: res.data.count.total
          },
          appointments: res.data.items,
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.uploadBillEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(input => {
      console.log('appointment input', input);
      return this.data.userUploadBill({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        return this.patchState({
          item: Object.assign(Object.assign({}, input), {
            bill: res.data.updated.bill
          }),
          errors: res.errors,
          loading: false
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.createAppointmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(input => this.appointmentService.createAppointment(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
      this.addNewAppointment(appointment);
      this.toast.success('Created Successfully!');
      setTimeout(() => this.patchState({
        item: appointment,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    this.updateAppointmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([input, item]) => this.appointmentService.updateAppointment(input, input.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
      this.updateAppointment(appointment);
      this.toast.success('Updated Successfully!');
      setTimeout(() => this.patchState({
        item: appointment,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    this.deleteAppointmentEffect = this.effect($ => $.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([_, appointment]) => {
      return this.data.userDeleteAppointment({
        appointmentId: appointment.id
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.toast.success('Deleted successfully!', {
          duration: 3000
        });
        setTimeout(() => this.patchState({
          item: res.data.deleted,
          loading: false,
          done: true
        }), 300);
        setTimeout(() => this.patchState({
          done: false,
          item: null
        }), 600);
      }, errors => {
        if (errors.graphQLErrors) {
          this.toast.error(errors.graphQLErrors[0].message, {
            duration: 3000
          });
          this.patchState({
            loading: false,
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors
          });
        } else {
          this.toast.error(errors.Message);
          this.formService.setErrors(errors.Data);
        }
      }));
    })));
    this.importExcelEffect = this.effect($data => $data.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(data => this.appointmentService.importAppointments(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => {
      var _a;
      this.toast.error((_a = error.Message) !== null && _a !== void 0 ? _a : 'Failed to save', {
        duration: 3000
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_8__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(updateResult => {
      const created = JSON.parse(updateResult.created);
      const updated = JSON.parse(updateResult.updated);
      const failed = JSON.parse(updateResult.failed);
      const total = created.length + updated.length + failed.length;
      this.addAppointments(created);
      this.updateAppointments(updated);
      this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, {
        duration: 3000
      });
    })))));
    this.deleteSpecificAppointmentEffect = this.effect(appointment$ => appointment$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(appointment => this.data.userDeleteAppointment({
      appointmentId: appointment.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success('Deleted successfully!', {
        duration: 3000
      });
      setTimeout(() => this.patchState({
        item: res.data.deleted,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    this.checkInAppointmentEffect = this.effect(appointment$ => appointment$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([appointment, item]) => {
      console.log("checkIn store appointment", appointment);
      return this.appointmentService.checkInAppointment(appointment).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
        this.updateAppointment(appointment);
        this.toast.success('Checked In Successfully!');
        setTimeout(() => this.patchState({
          item: appointment,
          loading: false,
          done: true
        }), 300);
        setTimeout(() => this.patchState({
          done: false,
          item: null
        }), 600);
      }, errors => {
        if (errors.graphQLErrors) {
          this.toast.error(errors.graphQLErrors[0].message, {
            duration: 3000
          });
          this.patchState({
            loading: false,
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors
          });
        } else {
          this.toast.error(errors.Message);
          this.formService.setErrors(errors.Data);
        }
      }));
    })));
    this.confirmAppointmentEffect = this.effect(appointment$ => appointment$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([appointment, item]) => {
      return this.appointmentService.confirmAppointment(appointment).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
        this.updateAppointment(appointment);
        this.toast.success('Confirmed Successfully!');
        setTimeout(() => this.patchState({
          item: appointment,
          loading: false,
          done: true
        }), 300);
        setTimeout(() => this.patchState({
          done: false,
          item: null
        }), 600);
      }, errors => {
        if (errors.graphQLErrors) {
          this.toast.error(errors.graphQLErrors[0].message, {
            duration: 3000
          });
          this.patchState({
            loading: false,
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors
          });
        } else {
          this.toast.error(errors.Message);
          this.formService.setErrors(errors.Data);
        }
      }));
    })));
    this.requestRescehduleAppointmentEffect = this.effect(appointment$ => appointment$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([appointment, item]) => {
      return this.appointmentService.requestRescheduleAppointment(appointment).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
        this.updateAppointment(appointment);
        this.toast.success('Requested Reschedule Successfully!');
        setTimeout(() => this.patchState({
          item: appointment,
          loading: false,
          done: true
        }), 300);
        setTimeout(() => this.patchState({
          done: false,
          item: null
        }), 600);
      }, errors => {
        if (errors.graphQLErrors) {
          this.toast.error(errors.graphQLErrors[0].message, {
            duration: 3000
          });
          this.patchState({
            loading: false,
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors
          });
        } else {
          this.toast.error(errors.Message);
          this.formService.setErrors(errors.Data);
        }
      }));
    })));
    this.rescehduleAppointmentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([{
      appointment,
      rescheduleDate
    }, item]) => {
      return this.appointmentService.rescheduleAppointment(appointment, rescheduleDate).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
        this.updateAppointment(appointment);
        this.toast.success('Rescheduled Successfully!');
        setTimeout(() => this.patchState({
          item: appointment,
          loading: false,
          done: true
        }), 300);
        setTimeout(() => this.patchState({
          done: false,
          item: null
        }), 600);
      }, errors => {
        if (errors.graphQLErrors) {
          this.toast.error(errors.graphQLErrors[0].message, {
            duration: 3000
          });
          this.patchState({
            loading: false,
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors
          });
        } else {
          this.toast.error(errors.Message);
          this.formService.setErrors(errors.Data);
        }
      }));
    })));
    this.cancelAppointmentEffect = this.effect(appointment$ => appointment$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([appointment, item]) => this.appointmentService.cancelAppointment(appointment).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
      this.updateAppointment(appointment);
      this.toast.success('Cancelled Successfully!');
      setTimeout(() => this.patchState({
        item: appointment,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    this.hideAppointmentEffect = this.effect(appointment$ => appointment$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(([appointment, item]) => this.appointmentService.hideAppointment(appointment).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(appointment => {
      this.updateAppointment(appointment);
      this.toast.success('Hided Successfully!');
      setTimeout(() => this.patchState({
        item: appointment,
        loading: false,
        done: true
      }), 300);
      setTimeout(() => this.patchState({
        done: false,
        item: null
      }), 600);
    }, errors => {
      if (errors.graphQLErrors) {
        this.toast.error(errors.graphQLErrors[0].message, {
          duration: 3000
        });
        this.patchState({
          loading: false,
          errors: errors.graphQLErrors ? errors.graphQLErrors : errors
        });
      } else {
        this.toast.error(errors.Message);
        this.formService.setErrors(errors.Data);
      }
    })))));
    if (this.route.snapshot.paramMap.has('appointmentId')) {
      const appointmentId = this.route.snapshot.paramMap.get('appointmentId');
      this.setId(appointmentId);
      this.setFormName('appointment_edit');
    } else {
      this.setFormName('appointment_create');
    }
    if (this.route.snapshot.paramMap.has('locationId')) {
      const locationId = this.route.snapshot.paramMap.get('locationId');
      this.setLocationId(locationId);
    }
    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId');
      this.setPatientId(patientId);
    }
    if (this.route.snapshot.paramMap.has('clinicalProviderId')) {
      const clinicalProviderId = this.route.snapshot.paramMap.get('clinicalProviderId');
      this.setClinicalProviderId(clinicalProviderId);
    }
    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      const legalCaseId = this.route.snapshot.paramMap.get('legalCaseId');
      this.setLegalCaseId(legalCaseId);
    }
    if (this.route.snapshot.paramMap.has('appointmentStatusId')) {
      const appointmentStatusId = this.route.snapshot.paramMap.get('appointmentStatusId');
      this.setAppointmentStatusId(appointmentStatusId);
    }
    if (this.route.snapshot.paramMap.has('visitKindId')) {
      const visitKindId = this.route.snapshot.paramMap.get('visitKindId');
      this.setVisitKindId(visitKindId);
    }
    if (this.route.snapshot.paramMap.has('attorneyId')) {
      const attorneyId = this.route.snapshot.paramMap.get('attorneyId');
      this.setAttorneyId(attorneyId);
    }
    if (this.route.snapshot.paramMap.has('firmId')) {
      const firmId = this.route.snapshot.paramMap.get('firmId');
      this.setFirmId(firmId);
    }
  }
  validateImportData(excelData) {
    return this.vm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(vm => {
      return this.appointmentService.validateAppointmentExcelData(excelData, vm.locations, vm.patients, vm.clinicalProviders, vm.legalCases, vm.appointmentStatuses);
    }));
  }
  /** Assign To User */
  setAssignUserModalCtrl(ctrl) {
    this.assignUserModalCtrl = ctrl;
  }
  openAssignUserModal(appointment) {
    var _a;
    (_a = this.assignUserModalCtrl) === null || _a === void 0 ? void 0 : _a.open(appointment, {}, this);
  }
  filterByMedicalRecordStatus(values) {
    if (values) {
      this.setMedicalRecordStatusOptions(values);
      this.loadAppointmentsEffect();
    }
  }
  assignAppointmentToUser(model) {
    const {
      id,
      name,
      assignedToId
    } = model;
    const subscriber = this.actionResult$.subscribe(result => {
      var _a;
      const {
        done
      } = result;
      if (done) {
        subscriber.unsubscribe();
        (_a = this.assignUserModalCtrl) === null || _a === void 0 ? void 0 : _a.close();
      }
    });
    this.updateAppointmentEffect({
      id,
      name,
      assignedToId
    });
  }
}
WebAppointmentFeatureStore.ɵfac = function WebAppointmentFeatureStore_Factory(t) {
  return new (t || WebAppointmentFeatureStore)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_10__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_12__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_13__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_appointment_service__WEBPACK_IMPORTED_MODULE_14__.AppointmentService));
};
WebAppointmentFeatureStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
  token: WebAppointmentFeatureStore,
  factory: WebAppointmentFeatureStore.ɵfac
});

/***/ }),

/***/ 890111:
/*!*****************************************************************************!*\
  !*** ./libs/web/appointment/shared/rules/appointment-name-is-valid.rule.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppointmentNameIsValidRule": () => (/* binding */ AppointmentNameIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);

class AppointmentNameIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange {
  constructor(name, message, target, minLength, maxLenght) {
    super(name, message, target, minLength, maxLenght, true);
  }
}

/***/ }),

/***/ 697471:
/*!*************************************************************************************!*\
  !*** ./libs/web/appointment/shared/rules/create-appointment-input-is-valid.rule.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateAppointmentInputIsValidRule": () => (/* binding */ CreateAppointmentInputIsValidRule)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _appointment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appointment-name-is-valid.rule */ 890111);


class CreateAppointmentInputIsValidRule extends _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.CompositeRule {
  constructor(name, message, target, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.displayToUser = true;
    this.doNotDisplayToUser = false;
    this.target = target;
    this.configureRules();
  }
  configureRules() {
    this.rules.push(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('NotificationIsNotNull', 'The form message cannot be null or undefined.', this.target, this.doNotDisplayToUser));
    this.rules.push(new _appointment_name_is_valid_rule__WEBPACK_IMPORTED_MODULE_1__.AppointmentNameIsValidRule('name', 'The appointment name is not valid. Must be within 2 and 255 characters.', this.target.name, 2, 255));
  }
}

/***/ })

}]);