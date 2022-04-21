import React from 'react';
import Router from 'next/router';

import { fetcher } from '@/lib/fetch';
import { getSession } from "next-auth/react"
import { DotsLoader } from '@/components/Dashboard/Loaders';


const authenticateRoute = (Component = null, options = {}) => {
   

  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      const session = await getSession()
      if(session){
        const { userId } = session
        const { user }  = await fetcher(`/api/users/${userId}`);
        // console.log(user)
        // if(user){
        //   const { menuAuths }  = await fetcher(`/api/menuAuths?userRoleCode=${user.userRoleCode}`);
        //   console.log(menuAuths)
        // }
        
        this.setState({loading:false})
      }else{
        Router.push("/login")
      }
    //   if (userService.userTokenValue) {
    //     const { token } = userService.userTokenValue;

    //     const { user } = await fetcher('/api/user');

    //     const menuAuths =
    //       (user &&
    //         user.userRole.menuAuths.map(
    //           ({ menu: { id, name, parentMenuId, slug } }) => ({
    //             id,
    //             name,
    //             parentMenuId,
    //             slug,
    //           })
    //         )) ||
    //       [];

    //     //check path
    //     const userCanAccess =
    //       menuAuths.filter(({ slug }) => Router.pathname === slug).length > 0;
    //     if (user && userCanAccess) {
    //       this.setState({ loading: false });
    //     } else {
    //       toast.error("You dont have access to the page");
    //       Router.push(options.pathAfterFailure || '/login');
    //     }
    //   }else{
    //     Router.push("/login")
    //   }
    }

    render() {
      const { loading } = this.state;

      if (loading) {
        return <DotsLoader />;
       
      }

      return <Component {...this.props} />;
    }
  }

  return AuthenticatedRoute;
};

export default authenticateRoute;