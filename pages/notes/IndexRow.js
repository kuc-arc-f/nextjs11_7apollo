import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <li>
    ID: {props.id} , 
    <Link href={`/notes/${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <Link href={`/notes/edit/${props.id}`}>
      <a>[ edit ]</a>
    </Link>    
  </li>
);
export default IndexRow;
