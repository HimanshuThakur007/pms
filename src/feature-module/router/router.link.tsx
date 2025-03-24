import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import DealsDashboard from "../mainMenu/dealsDashboard";



import Appearance from "../settings/websiteSettings/appearence";

import ConnectedApps from "../settings/generalSettings/connectedApps";


import BankAccounts from "../settings/financialSettings/bankAccounts";

import Calendar from "../mainMenu/apps/calendar";


import Currencies from "../settings/financialSettings/currencies";
import DataTable from "../tables/dataTable";
import BasicTable from "../tables/basicTable";

import DeleteRequest from "../userManagement/deleteRequest";
import Manageusers from "../userManagement/manageusers";
import LockScreen from "../authentication/lockscreen";
import Localization from "../settings/websiteSettings/localization";
import Login from "../auth/login";
import Register from "../auth/register";
import TwoStepVerification from "../auth/twoStepVerification";
import EmailVerification from "../auth/emailVerification";
import Success from "../auth/success";
import ResetPassword from "../auth/resetPassword";
import ForgotPassword from "../auth/forgotPassword";
import CustomFields from "../settings/appSettings/customFields";
import InvoiceSettings from "../settings/appSettings/invoiceSettings";
import Printers from "../settings/appSettings/printers";
import TaxRates from "../settings/financialSettings/taxRates";
import Notifications from "../settings/generalSettings/notifications";
import Profile from "../settings/generalSettings/profile";
import Security from "../settings/generalSettings/security";
import Storage from "../settings/otherSettings/storage";
import EmailSettings from "../settings/systemSettings/emailSettings";
import GdprCookies from "../settings/systemSettings/gdprCookies";
import SmsGateways from "../settings/systemSettings/smsGateways";
import CompanySettings from "../settings/websiteSettings/companySettings";
import Language from "../settings/websiteSettings/language";
import Preference from "../settings/websiteSettings/preference";
import Prefixes from "../settings/websiteSettings/prefixes";
import PaymentGateways from "../settings/financialSettings/paymentGateways";
import LeadsDashboard from "../mainMenu/leadsDashboard";
import ProjectDashboard from "../mainMenu/projectDashboard";
import TaskReport from "../reports/taskReport";
import RolesPermissions from "../userManagement/rolesPermissions";
import LanguageWeb from "../settings/websiteSettings/languageWeb";
import Permission from "../userManagement/permission";
import AllReportsPage from "../reports/allReportsPage";
import UserManagementComp from "../userManagement/usermanagementcomp";
import BusyIntegration from "../settings/generalSettings/busyIntegration";
import WhatsApp from "../settings/generalSettings/whatsApp";
import EmailSetting from "../settings/generalSettings/Email";
import ProfilePage from "../Profile/ProfilePage";

const route = all_routes;

export const publicRoutes = [
  {
    path: route.dealsDashboard,
    element: <DealsDashboard />,
    route: Route,
    title:'PMS Dashboard'
  },
  {
    path: '/',
    name: 'Root',
    element: <Navigate to="/login" />,
    route: Route,
    title:'Login'
  },
  
  {
    path: route.appearance,
    element: <Appearance />,
    route: Route,
    title:'Appearance'
  },
 
  {
    path: route.connectedApps,
    element: <ConnectedApps />,
    route: Route,
    title:'Connected Apps'
  },
 
  {
    path: route.bankAccounts,
    element: <BankAccounts />,
    route: Route,
    title:'Bank Accounts'
  },

  {
    path: route.calendar,
    element: <Calendar />,
    route: Route,
    title:'Calendar'
  },
  {
    path: route.manageusers,
    element: <Manageusers />,
    route: Route,
    title:'Manage Users'
  },
  // =========user-management====
  {
    path: route.usermanagementlist,
    element: <UserManagementComp />,
    route: Route,
    title:'Manage Lists'
  },

  {
    path: route.currencies,
    element: <Currencies />,
    route: Route,
    title:'Currencies'
  },
  {
    path: route.customFields,
    element: <CustomFields />,
    route: Route,
    title:'Custom Fields'
  },
  {
    path: route.dataTables,
    element: <DataTable />,
    route: Route,
    title:'Data Table'
  },
  {
    path: route.tablesBasic,
    element: <BasicTable />,
    route: Route,
    title:'Basic Table'
  },
 

 
 
 
  {
    path: route.deleteRequest,
    element: <DeleteRequest />,
    route: Route,
    title:'Delete Request'
  },
 
 
  { path: route.localization, element: <Localization />, route: Route,title:'Localization'
  },
 
 
  
 
  {
    path: route.customFields,
    element: <CustomFields />,
    route: Route,
    title:'Custom Fields'
  },
  {
    path: route.invoiceSettings,
    element: <InvoiceSettings />,
    route: Route,
    title:'Invoice Settings'
  },
  {
    path: route.printers,
    element: <Printers />,
    route: Route,
    title:'Printers'
  },
  {
    path: route.bankAccounts,
    element: <BankAccounts />,
    route: Route,
    title:'Bank Accounts'
  },
  {
    path: route.currencies,
    element: <Currencies />,
    route: Route,
    title:'Currencies'
  },
  {
    path: route.paymentGateways,
    element: <PaymentGateways />,
    route: Route,
    title:'PaymentGateways'
  },
  {
    path: route.taxRates,
    element: <TaxRates />,
    route: Route,
    title:'TaxRates'
  },
  {
    path: route.connectedApps,
    element: <ConnectedApps />,
    route: Route,
    title:'ConnectedApps'
  },
  {
    path: route.notification,
    element: <Notifications />,
    route: Route,
    title:'Notifications'
  },
  {
    path: route.profile,
    element: <Profile />,
    route: Route,
    title:'Profile'
  },
  {
    path: route.profilePage,
    element: <ProfilePage />,
    route: Route,
    title:'profilePage'
  },
  {
    path: route.security,
    element: <Security />,
    route: Route,
    title:'Security'
  },
 
  {
    path: route.storage,
    element: <Storage />,
    route: Route,
    title:'Storage'
  },
  {
    path: route.emailSettings,
    element: <EmailSettings />,
    route: Route,
    title:'Email Settings'
  },
  {
    path: route.gdprCookies,
    element: <GdprCookies />,
    route: Route,
    title:'Gdpr Cookies'
  },
  {
    path: route.smsGateways,
    element: <SmsGateways />,
    route: Route,
    title:'Sms Gateways'
  },
  {
    path: route.appearance,
    element: <Appearance />,
    route: Route,
    title:'Appearance'
  },
  {
    path: route.companySettings,
    element: <CompanySettings />,
    route: Route,
    title:'Company Settings'
  },
  {
    path: route.language,
    element: <Language />,
    route: Route,
    title:'Language'
  },
  // {
  //   path: route.localization,
  //   element: <Localization />,
  //   route: Route,
  // },
  {
    path: route.preference,
    element: <Preference />,
    route: Route,
    title:'Preference'
  },
  {
    path: route.prefixes,
    element: <Prefixes />,
    route: Route,
    title:'Prefixes'
  },
  {
    path: route.leadsDashboard,
    element: <LeadsDashboard />,
    route: Route,
    title:'Leads Dashboard'
  },
  {
    path: route.projectDashboard,
    element: <ProjectDashboard />,
    route: Route,
    title:'Project Dashboard'
  },

  {
    path: route.taskReports,
    element: <TaskReport />,
    route: Route,
    title:'TaskReport'
  },

  {
    path: route.deleteRequest,
    element: <DeleteRequest />,
    route: Route,
    title:'Delete Request'
  },
  {
    path: route.rolesPermissions,
    element: <RolesPermissions />,
    route: Route,
    title:'Roles Permissions'
  },
 
 
 
  
 
  
 
 
 
 
  
  


 
 
  {
    path: route.languageWeb,
    element: <LanguageWeb />,
    route: Route,
    title:'Language Web'
  },
  {
    path: route.permissions,
    element: <Permission />,
    route: Route,
    title:'Permission'
  },
    // =================routing by me==============
   
    {
      path: route.allReportsPage,
      element: <AllReportsPage />,
      route: Route,
      title:'Reports'
    },
    {
      path: route.busyIntegration,
      element: <BusyIntegration />,
      route: Route,
      title:'General Setting'
    },
    {
      path: route.emailSetting,
      element: <EmailSetting />,
      route: Route,
      title:'General Setting'
    },
    {
      path: route.whatsappSetting,
      element: <WhatsApp />,
      route: Route,
      title:'General Setting'
    },
];

export const authRoutes = [
 
  {
    path: route.login,
    element: <Login />,
    route: Route,
    title:'Login'
  },
  {
    path: route.register,
    element: <Register />,
    route: Route,
    title:'Register'
  },
  {
    path: route.twoStepVerification,
    element: <TwoStepVerification />,
    route: Route,
    title:'TwoStepVerification'
  },
  {
    path: route.emailVerification,
    element: <EmailVerification />,
    route: Route,
    title:'EmailVerification'
  },
  {
    path: route.success,
    element: <Success />,
    route: Route,
    title:'Success'
  },

  {
    path: route.resetPassword,
    element: <ResetPassword />,
    route: Route,
    title:'Reset Password'
  },
  {
    path: route.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
    title:'Forgot Password'
  },
  {
    path: route.lockScreen,
    element: <LockScreen />,
    route: Route,
    title:'Lock Screen'
  },

];
