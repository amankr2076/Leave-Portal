import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Error from './pages/Error';
import Homepage from './pages/HomePage';
import NotAuthorized from './components/core/NotAuthorized';
import OpenRoute from './components/core/OpenRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import PrivateRoute from './components/core/PrivateRoute';
import UserRoute from './components/core/UserRoute';
import AdminRoute from './components/core/AdminRoute';
import Dashboard from './pages/Ḍashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import StudentMainPage from './components/core/Dashboard/n_user/StudentMainPage';
import NewApplForm from './components/core/Dashboard/n_user/NewApplForm';
import AllLeaves from './components/core/Dashboard/n_user/AllLeaves';
import LeaveDetails from './components/core/Dashboard/n_user/LeaveDetails';
import UserSetting from './components/core/Dashboard/n_user/UserSetting';
import AllNewApplications from './components/core/Dashboard/admin/AllNewApplications';
import NewApplicationDetails from './components/core/Dashboard/admin/NewApplicationDetails';
import AllApplications from './components/core/Dashboard/admin/AllApplications';
import AllUsersList from './components/core/Dashboard/admin/AllUsersList';
import DashboardMainPage from './components/core/Dashboard/admin/DashboardMainPage';
import AddUser from './components/core/Dashboard/admin/AddUser';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {

  const {token}=useSelector((state)=>state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);


  const dispatch=useDispatch();
  const navigate=useNavigate();





  return (
    <div className="App relative">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/not-auth' element={<NotAuthorized />} />
        <Route path='/*' element={<Error />} />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

          <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />



        {/* -----------------------------------------Routes for Dashboard----------------------------------- */}

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="my-profile" element={<MyProfile />} />
          </Route>
        </Route>


        {/* ---------------------------------------------for normal user------------------------------------------- */}

        <Route element={<UserRoute></UserRoute>}>
              <Route path='/dashboard' element={<Dashboard></Dashboard>}>
                  <Route path="student/main-page" element={<StudentMainPage />} />
                  <Route path="student/new-application" element={<NewApplForm />} />
                  <Route path="student/all-leave-list" element={<AllLeaves />} />
                  <Route path="student/all-leave-list/get-user-leave-details/:applicationID" element={<LeaveDetails />} />
                  <Route path="student/user-settings" element={<UserSetting />} />

              </Route>
          </Route>



        {/* ---------------------------------------------for admin route------------------------------------------------ */}
        

        <Route element={<AdminRoute></AdminRoute>}>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}>
            <Route path="admin/all-new-applications" element={<AllNewApplications />} />
            <Route path="admin/all-applications/:initialFilter?" element={<AllApplications />} />
            <Route path="admin/all-users-list" element={<AllUsersList />} />
            <Route path="admin/admin-setting" element={<UserSetting />} />
            <Route path="admin/main-page" element={<DashboardMainPage />} />
            <Route path="admin/add-user" element={<AddUser />} />
            <Route path="admin/all-applications/all-application-details/:applicationID" element={<LeaveDetails />} />
            <Route path="admin/all-new-applications/new-application-details/:applicationID" element={<NewApplicationDetails />} />
          </Route>
        </Route>




      </Routes>
    </div>
  );
}

export default App;
