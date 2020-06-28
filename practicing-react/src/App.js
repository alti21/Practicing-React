import React from 'react';

//const title='React';

const welcome = {
  greeting: 'Hi',
  title: 'React'
}

const array = [0,1,2,3,4,5,6,7,8,9]

function getTitle(title) {
  return title;
}

/*
const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
*/

//function component
const App = () => {
  
 // const title2='React';//will be redefined each time function runs

 const stories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const [searchTerm, setSearchTerm] = React.useState('');

const greeting = {
  subject: 'React',
  description: 'Your component library for ...'
}

// 1) A callback function is introduced
const handleSearch = event => {
  // 3) Callback from 2 "calls back" to the place it was introduced (right here)
  console.log(event.target.value);
  setSearchTerm(event.target.value);// set searchTerm equal to value typed into input field
}

const searchedStories = stories.filter(story =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
);
//now we can filter and search for stories based on the title, by typing the title in the input field!!!!!!
 return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>
      <h2>Hi there {getTitle('React')}</h2> {/* everything in curly braces in JSX can be used for JavaScript expressions (e.g. function execution) */}
      
      <Search onSearch={handleSearch}/> {/* callback from 1 is passed as props to Search component (child) */}

      <div>{array[7]}</div>
      <hr />
      <List list={searchedStories}/>
      <hr />
      
      <GreetingOne greeting={greeting} />

      <GreetingTwo {...greeting} />

      <GreetingThree {...greeting} />

      

    </div>
  );
}

const List = props => 
 props.list.map(item=>(
          <div key={item.objectID}>
            <a href={item.url}>{item.title}</a>,
            <span>{item.author}</span>,
            <span>{item.num_comments}</span>,
            <span>{item.points}</span>
          </div>
));




const GreetingOne = props => 
  <div>
    <Title title={`Welcome to ${props.greeting.subject}`} />
    <Description description={props.greeting.description} />
  </div>

// a Function Component which invoked as a normal function
const GreetingTwo = ({ subject, description }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description description={description} />
  </div>
);

const GreetingThree = ({ subject, ...other }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description {...other} />
  </div>
);

const Title = props =>
  <h1>{props.title}</h1>;
 
const Description = props =>
  <p>{props.description}</p>;




const Search = props => {
 // const [searchTerm, setSearchTerm] = React.useState('');

  /*
  const handleChange = event => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);//sets state (value of searchTerm)

    // 2) Callback function from 1 is used here since in App component, onSearch={handleSearch}
    props.onSearch(event);// handleSearch is the callback function from App component, so that runs here
  };                      // and calls back to App component since it's located there?
  */

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch}/>
     {/*
     <input id="search" type="text" onChange={handleChange}/> // onSearch uses input field event 
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    */}
    </div>
  );
}

/* List component without implicit return statements
const List = () => {
  return list.map(item => {
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  });
}; 
*/
/*    
const Search = () => (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  )
*/
export default App;



