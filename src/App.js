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
import Settings from "./settings/settings";
import SingleAuditResult from "./audit/auditPages/singleAuditResult";
import Myprofile from "./users/usersPages/MyProfile";
import Tasks from "./tasks/taskPages.js/tasks";
import ObservationType from "./company/observationType/Observationtype";
import Places from "./company/Places";
import Test from "./test";

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
                      <AuthRoute path="/test" exec component={Test} />
                      <AuthRoute path="/audit" exact component={Audit} />
                      <AuthRoute path="/tasks" exact component={Tasks} />
                      <AdminRoutes
                        path="/settings"
                        exact
                        component={Settings}
                      />
                      <AdminRoutes path="/places" exact component={Places} />
                      <AdminRoutes
                        path="/obstypes"
                        exact
                        component={ObservationType}
                      />
                      <AdminRoutes
                        path="/auditrulles"
                        ecact
                        component={AuditRulles}
                      />
                      <Redirect to="/tasks" />
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
