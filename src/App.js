import React from 'react';
import { Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import FileUploadPage from "./components/pages/FileUploadPage";
import DashboardPage from "./components/pages/DashboardPage";
import TopNavigation from "./components/navigations/TopNavigation";
import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

function App() {
  return (
    <div>
    	<TopNavigation />
	    <Route path="/" exact component={HomePage}/>
	    <GuestRoute  path="/login" exact component={LoginPage} />
	    <GuestRoute  path="/register" exact component={RegisterPage} />
	    <UserRoute path="/image-upload" exact component={FileUploadPage} />
	    <UserRoute path="/dashboard" exact component={DashboardPage} />
    </div>
  );
}

export default App;
