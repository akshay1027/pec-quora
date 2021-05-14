import React, {useState, useEffect, Suspense} from "react";
import './App.css';
import axios from "axios"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
const LazyQuestionBox  = React.lazy( () => import("./components/QuestionBox"));
const LazySignUp  = React.lazy( () => import("./screens/SignUp"));
const LazySignIn  = React.lazy( () => import("./screens/SignIn"));
const LazyNavBar  = React.lazy( () => import("./components/Navbar"));
const LazyQuesstionList  = React.lazy( () => import("./components/QuestionList"));
const LazyQuestionScreen  = React.lazy( () => import("./screens/QuestionScreen"));
const LazyBackground  = React.lazy( () => import("./components/Background"));
const LazyAbout  = React.lazy( () => import("./screens/about"));
const LazyFind  = React.lazy( () => import("./screens/find"));

// use callbacks instead of "function App()"

const App = () =>  {
  
  // prop drilling

  const [authStatus, setAuthStatus] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(null);

  // whenever anything happens in the "App", useEffect is triggered.

  useEffect(()=>{
    axios
        .get("/isLoggedIn")
        .then((response)=>{
            setAuthStatus(response.data.authStatus);
            setProfileImage(response.data.profileImage);
            setUsername(response.data.username);
        })
        .catch((error)=>{
            console.log(error);
        });
  });

  return (
    <Router className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <LazyNavBar profileImage={profileImage}/> {/* header will be present in all pages */}
         <Switch>
          <Route path="/signin">
            <LazySignIn />
          </Route>

          <Route path="/signup">
            <LazySignUp />
          </Route>

          <Route path="/questions/:id" render={(props) => (  
            <LazyQuestionScreen authStatus={authStatus} profileImage={profileImage} username={username}
                {...props} />
            )} exact />

          <Route path="/about">
              <LazyAbout />
          </Route>

          <Route path="/find">
              <LazyFind />
          </Route>
        
          <Route path="/">
          <div style={{background:"rgba(25, 28, 31)"}}>
            <LazyBackground />
            <LazyQuestionBox authStatus={authStatus} profileImage={profileImage} username={username}/>
            <LazyQuesstionList />
          </div>
          </Route>

          </Switch>
          </Suspense>
    </Router>
  );
} 

export default App;

