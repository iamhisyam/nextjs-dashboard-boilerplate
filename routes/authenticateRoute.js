import React from 'react';
import Router from 'next/router';

import { fetcher } from '@/lib/fetch';
import { getSession } from "next-auth/react"
import { DotsLoader } from '@/components/Dashboard/Loaders';


const authenticateRoute = (Component = null, options = {}) => {
   

  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
      user : {}
    };

    async componentDidMount() {
      const session = await getSession()
      if(session){
        const { userId } = session
        const { user }  = await fetcher(`/api/users/${userId}`);
        this.setState({loading:false, user})
      }else{
        Router.push("/login")
      }
    }

    render() {
      const { loading, user } = this.state;

      if (loading) {
        return <DotsLoader />;
       
      }

      return <Component {...this.props} user={user} />;
    }
  }

  return AuthenticatedRoute;
};

export default authenticateRoute;