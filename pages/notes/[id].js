import Head from 'next/head'
import React from 'react'
import client from "../../apollo-client";
import Note from '../../graphql/note'
import Layout from '../../components/layout'
//
function Page(props) {
  const item = props.item
  const tags = item.noteTag;
console.log(item.noteTag)
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>ID : {item.id}
      </div>  
      <hr />
      Tag :<br />  
      {tags.map((item ,index) => {
        return (
          <li key={index}>{item.name}</li>
        )
      })}         
    </div>
  </Layout>
  )
}
/* getServerSideProps */
export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
console.log(id);
  const data = await client.query({
    query: Note.get_query_item(id),
    fetchPolicy: "network-only"
  });
console.log(data.data.note);
  const item = data.data.note;
  return {
    props: { item: item } 
  }
}
export default Page

