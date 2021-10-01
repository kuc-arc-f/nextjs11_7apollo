
import { gql} from '@apollo/client';

const task = {
  get_gql_add : function(title){
    return gql`
      mutation {
        addTask(title: "${title}"){
          id
        }
      }            
    `   
  },
  get_gql_update : function(id, title){
    return gql`
      mutation {
        updateTask(id: ${id}, title: "${title}"){
          id
        }
      }            
    `   
  },
  get_gql_delete: function(id){
    return gql`
      mutation {
        deleteTask(id: ${id}){
          id
        }
      }      
      
    `   
  },    
  get_query_task : function(id){
    return gql`
    query {
      task(id: ${id}){
        id
        title
      }            
    }
   `   
  },  
}
export default  task;

