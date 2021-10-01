import React, {Component} from 'react';
import client from "../../apollo-client";
import User from '../../graphql/user'
import Layout from '../../components/layout'
//
export default class TaskCreate extends Component {
  static async getInitialProps(ctx) {
    return { 
    }
  }  
  constructor(props){
    super(props)
    this.state = {title: '', content: ''}
//console.log(props.BASE_URL)
  }
  componentDidMount(){
  }   
  handleClick(){
    this.addItem()
  } 
  async addItem(){
    try {
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const result = await client.mutate({
        mutation: User.get_gql_add(name.value, email.value, password.value)
      })
console.log(result);
      alert("complete, save");
      location.href = '/';
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
          <h1>User - Create</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>name:</label>
                <input type="text" className="form-control" name="name" id="name"
                  />
              </div>
            </div>
          </div>
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
              <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Create
              </button>
          </div>                
          <hr />
        </div>
      </Layout>
    )    
  } 
}

