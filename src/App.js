import React from "react";
// import "./custome-theme.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// context
import { AuthProvider } from "../src/context/auth";
import { ToastProvider } from "./context/toastContext";
import { UserProvider } from "./users/userContext";
import { CompanyProvider } from "./company/companyContetx";
import { AuditProvider } from "./audit/auditContext";
import { TaskProvider } from "./tasks/taskContext";

// components
import { Container } from "react-bootstrap";
import LoginForm from "./users/usersPages/login";
import MenuBar from "./comonComponents/menuBar";
import MainUserPage from "./users/usersPages/MainUserPage";
import AdminRoutes from "./users/userRouteComponents/adminRoutes";
import AuthRoute from "./users/userRouteComponents/authRoutes";
import AuditRulles from "./audit/auditRulles/auditRulles";
import Audit from "./audit/auditPages/audit";
import QuickTask from "./tasks/quicktasks/quicktask";
import Settings from "./settings/settings";
import SingleAuditResult from "./audit/auditPages/singleAuditResult";
import Myprofile from "./users/usersPages/MyProfile";
import Place from "./company/place.js";
import Tasks from "./tasks/taskPages.js/tasks";
import MainCompanyPage from "./company/CompanyMain.js";
// app
const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CompanyProvider>
          <TaskProvider>
            <ToastProvider>
              <AuditProvider>
                <Router>
                  <MenuBar />
                  <Container fluid>
                    <Switch>
                      <Route path="/login" exact component={LoginForm} />
                      {/* 
                                  <AuthRoute
                                  path="/dashboard"
                                  exact
                                  component={ChartDashboard}
                                /> */}
                      <AdminRoutes
                        path="/user/create"
                        exact
                        component={MainUserPage}
                      />
                      <AuthRoute
                        path="/user/profile"
                        exact
                        component={Myprofile}
                      />
                      {/* <AuthRoute path="/audit" exact component={Audit} />
                          <AuthRoute
                          path="/auditresult"
                          exact
                          component={SingleAuditResult}
                          /> */}
                      <AuthRoute path="/tasks" exact component={Tasks} />
                      <AdminRoutes
                        path="/settings"
                        exact
                        component={Settings}
                      />
                      <AdminRoutes path="/company" exact component={Place} />
                      <AdminRoutes
                        path="/auditrulles"
                        ecact
                        component={AuditRulles}
                      />
                      <Redirect to="/quicktasks" />
                    </Switch>
                  </Container>
                </Router>
              </AuditProvider>
            </ToastProvider>
          </TaskProvider>
        </CompanyProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
