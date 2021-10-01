//import Head from 'next/head'
import React from 'react'
import client from "../../../apollo-client";
import Note from '../../../graphql/note'
import LibNote from '../../../lib/LibNote'
import Layout from '../../../components/layout'
//
export default class NoteEdit extends React.Component {
  static async getInitialProps(ctx) {
//console.log("id=", ctx.query.id)
    const id = ctx.query.id;
    const data = await client.query({
      query: Note.get_query_item(id),
      fetchPolicy: "network-only"
    });
console.log(data.data.note);
    const item = data.data.note;
    return {
      id: id,
      item: item,
    };
  }
  constructor(props){
    super(props)
    const tags = LibNote.get_tags();
    const category = LibNote.getCategory();  
    this.state = {
      title: this.props.item.title, 
      content: this.props.item.content,
      noteTag: this.props.item.noteTag,
      category: category, 
      arr_tags: tags
    }
//console.log(this.props.item)
  }
  componentDidMount(){
//    console.log(this.props.item.category)
    if(this.props.item.category !== null){
      const elem = document.getElementById('category')
      elem.value = this.props.item.category.name
    }
  }     
  async handleClickDelete(){
    console.log("#deete-id:" , this.props.id)
    try {
      const result = await client.mutate({
        mutation: Note.getDelete(this.props.id)
      })
console.log(result)
      return result
    } catch (error) {
      console.error(error);
    }     
  } 
  async handleClick(){
    await this.updateItem()
  }     
  async updateItem(){
    try {
      console.log("#update_item-id:" , this.props.id)
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
console.log(arrTags);
      const noteId = this.props.id;
      let result = await client.mutate({
        mutation: Note.getUpdate(this.props.id, title.value, content.value)
      })
//console.log(result.data.noteUpdate);
      if(typeof result.data.noteUpdate.id === "number"){
        console.log("noteId=", noteId);
      }else{
        alert("Error, note save");
        return;
      }   
      // category
      result = await client.mutate({
        mutation: Note.getCategoryAdd(noteId, category.value)
      })
      // Tag   
      for (const item of arrTags) {
        result = await client.mutate({
          mutation: Note.getNoteTagAdd(noteId, item)
        })
      }
      alert("Success, save");
    } catch (error) {
      console.error(error);
      alert("Error, save")
    }     
  }
  valid_dispCheck(value, items){
    let ret = false
    items.map((item, index) => {
//console.log(item.name )
      if(item.name === value){
        ret = true
      }
    })    
    return ret
  }  
  tagsRow(){
    const self = this;
    const tags = this.state.arr_tags
//console.log(tags)
    return tags.map((item, index) => {
//console.log(item )
      let name = "check_" + String(index)
      let lbl_name = String(item)
      let valid = self.valid_dispCheck(item, this.state.noteTag)
      return(
        <div className="mt-2" key={index}>
          {lbl_name}
          <input type="checkbox" name={name} id={name} className="mx-2"
          defaultChecked={valid} /> {item.name}          
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
            <h1>Note - Edit</h1>
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
                  <input type="text" id="title" className="form-control"
                    defaultValue={this.state.title} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>content:</label>
                  <input type="text" className="form-control" name="content" id="content"
                    defaultValue={this.state.content} />
                </div>
              </div>
            </div>
            Tag:<br />
            {this.tagsRow()}
            <hr />
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Save
              </button>
            </div>
            <hr />                  
            <div className="form-group">
              <button className="btn btn-danger" onClick={this.handleClickDelete.bind(this)}>Delete
              </button>
            </div>
            <hr />
            ID : {this.props.id}
          </div>
      </Layout>
    );
  }
}

