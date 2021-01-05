import React from "react";
// import "./custome-theme.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginForm from "./users/usersPages/login";
import MenuBar from "./comonComponents/menuBar";
import CreateUser from "./users/usersPages/createUser";
import { AuthProvider } from "../src/context/auth";
import AuthRoute from "./users/userComponents/authRoutes";
import AdminRoutes from "./users/userComponents/adminRoutes";
import NewTask from "./tasks/tasksPages/newTask";
import { EditTaskProvider } from "./context/editTaskContext";
import { ToastProvider } from "./context/toastContext";
import { CustomInputProvider } from "./context/customInputContext";
import TaskEditor from "./tasks/tasksPages/taskEditor";
import EditUser from "./users/usersPages/editUser";
import AuditRulles from "./audit/auditPages/auditRulles";
import Audit from "./audit/auditPages/audit";
import QuickTask from "./tasks/quicktasks/quicktask";
import Settings from "./settings/settings";
import CompanySettings from "./company/companySettings";
import { CompanyProvider } from "./context/companyContetx";
import SingleAuditResult from "./audit/auditPages/singleAuditResult";
import { SingleAuditProvider } from "./context/singleAuditContext";
import { ModalProvider } from "./context/modalContext";
import ChartDashboard from "./charts/chartDashboard";

const App = () => {
  return (
    <AuthProvider>
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
                          path="/taskeditor"
                          exact
                          component={TaskEditor}
                        />
                        <AuthRoute path="/newtask" exact component={NewTask} />
                        <AuthRoute
                          path="/dashboard"
                          exact
                          component={ChartDashboard}
                        />
                        <AdminRoutes
                          path="/user/create"
                          exact
                          component={CreateUser}
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
    </AuthProvider>
  );
};

export default App;
