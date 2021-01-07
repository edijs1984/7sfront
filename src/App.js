import React from "react";
// import "./custome-theme.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// context
import { Container } from "react-bootstrap";
import { AuthProvider } from "../src/context/auth";
import { EditTaskProvider } from "./context/editTaskContext";
import { ToastProvider } from "./context/toastContext";
import { CustomInputProvider } from "./context/customInputContext";
import { CompanyProvider } from "./context/companyContetx";
import { SingleAuditProvider } from "./context/singleAuditContext";
import { ModalProvider } from "./context/modalContext";
import { EditUserProvider } from "./context/editUserContext";
// components
import LoginForm from "./users/usersPages/login";
import MenuBar from "./comonComponents/menuBar";
import MainUserPage from "./users/usersPages/MainUserPage";
import AdminRoutes from "./users/userRouteComponents/adminRoutes";
import AuthRoute from "./users/userRouteComponents/authRoutes";
import EditUser from "./users/usersPages/resetMypasswordPage";
import AuditRulles from "./audit/auditPages/auditRulles";
import Audit from "./audit/auditPages/audit";
import QuickTask from "./tasks/quicktasks/quicktask";
import Settings from "./settings/settings";
import CompanySettings from "./cp/companySettings";
import SingleAuditResult from "./audit/auditPages/singleAuditResult";
import ChartDashboard from "./charts/chartDashboard";
// app
const App = () => {
  return (
    <AuthProvider>
      <EditUserProvider>
        <ToastProvider>
          <CustomInputProvider>
            <ModalProvider>
              <EditTaskProvider>
                <CompanyProvider>
                  <SingleAuditProvider>
                    <Router>
                      <MenuBar />
                      <Container fluid>
                        <Switch>
                          <Route path="/login" exact component={LoginForm} />
                          <AuthRoute
                            path="/quicktasks"
                            exact
                            component={QuickTask}
                          />

                          <AuthRoute
                            path="/dashboard"
                            exact
                            component={ChartDashboard}
                          />
                          <AdminRoutes
                            path="/user/create"
                            exact
                            component={MainUserPage}
                          />
                          <AuthRoute
                            path="/user/edit"
                            exact
                            component={EditUser}
                          />
                          <AuthRoute path="/audit" exact component={Audit} />
                          <AuthRoute
                            path="/auditresult"
                            exact
                            component={SingleAuditResult}
                          />
                          <AuthRoute
                            path="/quicktasks"
                            exact
                            component={QuickTask}
                          />
                          <AdminRoutes
                            path="/settings"
                            exact
                            component={Settings}
                          />
                          <AdminRoutes
                            path="/company"
                            exact
                            component={CompanySettings}
                          />
                          <AdminRoutes
                            path="/auditrulles"
                            ecact
                            component={AuditRulles}
                          />
                          <Redirect to="/quicktasks" />
                        </Switch>
                      </Container>
                    </Router>
                  </SingleAuditProvider>
                </CompanyProvider>
              </EditTaskProvider>
            </ModalProvider>
          </CustomInputProvider>
        </ToastProvider>
      </EditUserProvider>
    </AuthProvider>
  );
};

export default App;
