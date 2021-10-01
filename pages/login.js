import React, {Component} from 'react';
import Link from 'next/link';
import client from "../apollo-client";
import User from '../graphql/user'
import Layout from '../components/layout'
import LibCookie from '../lib/LibCookie'
//
export default class Login extends Component {
  static async getInitialProps(ctx) {
    return { 
    }
  }  
  constructor(props){
    super(props)
//console.log(key)
  }
  componentDidMount(){
  }   
  handleClick(){
    this.login()
  } 
  /* Login */
  async login(){
    try {
      const key = process.env.COOKIE_KEY_USER_ID;
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const data = await client.query({
        query: User.get_query_valid(email.value, password.value),
        fetchPolicy: "network-only"
      });
console.log(data.data.userValid);
      if(data.data.userValid !== null){
        const uid = data.data.userValid.id;
console.log("uid=", uid);
        LibCookie.set_cookie(key, uid);
        alert("Success, login");
        location.href = '/';
      }else{
        alert("Error, login");
      }
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  } 
  render() {
    return (
      <Layout>
        <div className="container">
          <hr className="mt-2 mb-2" />
          <h1>Login</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>email:</label>
                <input type="text" className="form-control" name="email" id="email"
                  />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>password:</label>
                <input type="password" className="form-control" name="password" id="password"
                  />
              </div>
            </div>
          </div>          
          <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>
                Login
              </button>
          </div>                
          <hr />
          <Link href="/users/create"><a >[ Register ]</a>
          </Link>
        </div>
      </Layout>
    )    
  } 
}

