import React, {Component} from 'react';
import client from "../../apollo-client";
import Note from '../../graphql/note'
import Layout from '../../components/layout'
import LibCookie from '../../lib/LibCookie'
import LibNote from '../../lib/LibNote'
//
export default class NoteCreate extends Component {
  static async getInitialProps(ctx) {
    return { item : {} }
  }  
  constructor(props){
    super(props)
    const tags = LibNote.get_tags();  
    const category = LibNote.getCategory();  
    this.state = {
      title: '', content: '', arr_tags: tags, category: category
    }
  }
  componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    }
// /console.log(tags);
  }   
  handleClick(){
    this.addItem()
  } 
  async addItem(){
    try {
      let noteId = 0;
      const title = document.getElementById('title');
      const content = document.getElementById('content');
      const category = document.getElementById('category');
      const arrTags = [];
      this.state.arr_tags.map((item, index) => {
        let elemName = "check_" + index;
        let element = document.getElementById(elemName);
        if(element.checked){
          arrTags.push(item);
        }
      }) 
      let result = await client.mutate({
        mutation: Note.get_gql_add(title.value, content.value)
      })
      if(typeof result.data.noteAdd.id === "number"){
        noteId = result.data.noteAdd.id;
//console.log("noteId=", noteId);
      }else{
        alert("Error, note save");
        return;
      }
      // Category
//console.log( "c=", category.value);
      result = await client.mutate({
        mutation: Note.getCategoryAdd(noteId, category.value)
      })
      //noteTag
      for (const item of arrTags) {
        result = await client.mutate({
          mutation: Note.getNoteTagAdd(noteId, item)
        })
      }     
      alert("Success, save");
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  }
  tagsRow(){
    const tags = this.state.arr_tags
//console.log(tags)
    return tags.map((item, index) => {
//console.log(item )
      let name = "check_" + String(index)
      let lbl_name = String(item)
      return(
        <div className="mt-2" key={index}>
          {lbl_name}
          <input type="checkbox" name={name} id={name} className="mx-2"
          /> {item.name}          
        </div>
      )
    })    
  }     
  render() {
//console.log(this.state.category);
    const category = this.state.category;
    return (
      <Layout>
        <div className="container">
          <hr className="mt-2 mb-2" />
          <h1>Notes - Create</h1>
          <div className="row">
            <div className="col-md-6">
              <label>Category :</label>
              <select id="category" name="category" className="form-control">
              {category.map((item, index) => {
  //console.log(item.name)
                return(<option key={index}
                  value={item}>{item}</option>)            
              })}                 
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" name="title" id="title"
                  />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>content:</label>
                <input type="text" className="form-control" name="content" id="content"
                  />
              </div>
            </div>
          </div>
          <hr />
          Tag:<br />
          {this.tagsRow()}
          <hr />          
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

