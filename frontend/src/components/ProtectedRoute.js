import React from "react";
import { Route, Redirect } from "react-router";


function ProtectedRoute({component: Component,...props}) {

  return(
    <Route>
      {() =>
        props.loggedIn || true ? <Component {...props} /> : <Redirect to='/sign-in' />
      }
    </Route>
  )
}

export default ProtectedRoute;



// НА ПРОДАКШЕНЕ УБРАТЬ TRUE ИЗ СТРОКИ 10!!!!!!!!!!!