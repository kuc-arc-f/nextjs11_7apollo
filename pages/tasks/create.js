import React, {Component} from 'react';
import client from "../../apollo-client";
import Task from '../../graphql/task'
import Layout from '../../components/layout'
import LibCookie from '../../lib/LibCookie'
//
export default class TaskCreate extends Component {
  static async getInitialProps(ctx) {
    return {}
  }  
  constructor(props){
    super(props)
    this.state = {title: '', content: ''}
  }
  componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    }    
  }   
  handleClick(){
    this.addItem()
  } 
  async addItem(){
    try {
      const title = document.getElementById('title');
      const result = await client.mutate({
        mutation: Task.get_gql_add(title.value)
      })
      return result
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
          <h1>Tasks - Create</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" name="title" id="title"
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

