
import { gql} from '@apollo/client';

const note = {
  get_gql_add : function(title, content){
    return gql`
      mutation {
        noteAdd(title: "${title}", content: "${content}"){
          id
        }
      }                  
    `   
  },
  getNoteTagAdd : function(noteId, name){
    return gql`
      mutation {
        noteTagAdd(noteId: ${noteId}, name: "${name}"){
          id
        }
      }  
    `   
  },
  get_query_item : function(id){
    return gql`
    query {
      note(id: ${id}) {
        id
        title
        content
        noteTag{
          id
          name
        }    
      }
    }
   `   
  },
  getUpdate : function(id, title, content){
    return gql`
      mutation {
        noteUpdate(id: ${id}, title: "${title}", content: "${content}"){
          id
        }
      }
    `   
  },
  getDelete: function(id){
    return gql`
      mutation {
        noteDelete(id: ${id}){
          id
        }
      }            
    `   
  },      
}
export default  note;

