import React, {Component} from 'react';
import Layout from '../components/layout'
import LibCookie from '../lib/LibCookie'
//
export default class Test extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    }
  }   
  render() {
    return (
      <Layout>
        <div className="container">
          <hr className="mt-2 mb-2" />
          <h1>test</h1>
        </div>
      </Layout>
    )    
  } 
}
