export const types = {

    // UI Reducer
    uiOpenModel: '[UI] Open modal',
    uiCloseModel: '[UI] Close modal',
    uiSetDatesModel: '[UI] Set dates modal',

    // Event Reducer
    eventSetActive: '[Event] Set active',
    eventGetByUserId: '[Event] Get events',
    eventRemoveActive: '[Event] Remove active',
    eventAddNew: '[Event] Add new event',
    eventUpdate: '[Event] Upate new event',
    eventDelete: '[Event] Delete new event',
    eventReset: '[Event] Reset events',

    // Auth Reducer
    authChecking: '[Auth] Checking login state',
    authCheckingFinish: '[Auth] Finish checking login state',
    authStartLogin: '[Auth] Start login',
    authLogin: '[Auth] Login state',
    authStartRegister: '[Auth] Start register state',
    authTokenRenew: '[Auth] Token renew',
    authLogout: '[Auth] Logout state',

}