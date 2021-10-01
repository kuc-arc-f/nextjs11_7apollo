
import { gql} from '@apollo/client';

const user = {
  get_gql_add : function(name, email, password){
    return gql`
      mutation {
        addUser(name: "${name}", email: "${email}", password: "${password}"){
          id
        }
      }                 
    `   
  },
  get_query_valid : function(email, password){
    return gql`
    query {
      userValid(email: "${email}", password: "${password}") {
        id
      }
    }    
   `   
  },  
  get_query_user : function(id){
    return gql`
    query {
      user(id: ${id}){
        id
        name
      }            
    }
   `   
  },  
}
export default user;

