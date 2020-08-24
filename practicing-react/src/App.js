import React, { Children } from 'react';

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

const initialStories = [
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

const getAsyncStories = () => 
  new Promise(resolve => 
    setTimeout(
      () => resolve({ data: { stories: initialStories } }), // data: { stories: initialStories is what we want to return 
      2000                                                  // from this promise
    )
  )


//generalized custom hook
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  
  React.useEffect(()=>{
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue];
};

//function component
const App = () => {

 // const title2='React';//will be redefined each time function runs

const [searchTerm, setSearchTerm] = useSemiPersistentState(
  'search',
  'React'
);

//make the stories stateful
const [stories, setStories] = React.useState([]);// start with empty list of stories, will be populated asynchronously

const [isLoading, setIsLoading] = React.useState(false);
const [isError, setIsError] = React.useState(false);

React.useEffect(() => {
  setIsLoading(true);

  getAsyncStories().then(result => {
    setStories(result.data.stories); // once promise is resolved, set state asynchronously (just simulating async)
    setIsLoading(false); // once loaded, loading is set to false
  })
  .catch(() => setIsError(true));
}, []);// run this side effect only once, when component renders for 1st time

//callback handler to remove stories
const handleRemoveStory = item => {
  const newStories = stories.filter(
    story => item.objectID !== story.objectID
  );
  //update to new state
  setStories(newStories);
}

// const [current state, function to update state] = React.useState('');
// const [searchTerm, setSearchTerm] = React.useState(
//   localStorage.getItem('search') || 'React'
// );

// React.useEffect(()=>{
//   localStorage.setItem('search', searchTerm);
// },[searchTerm])

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
      
     { /* <Search search={searchTerm} onSearch={handleSearch}/> {/* callback from 1 is passed as props to Search component (child) */} 
      <InputWithLabel
        id="search"
        //label="Search Here"
        isFocused
        value={searchTerm}
        onInputChange={handleSearch}
      >
        {/* the following line is the children prop in InputWithLabel */}
        <strong>Search:</strong>
      </InputWithLabel> 

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={searchedStories}
          onRemoveItem={handleRemoveStory}
        />
      )}

      <div>{array[7]}</div>
      <hr />
      
      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>

      <Text>
        {/* the following 3 lines is the children prop in InputWithLabel */}
        <h3>APARTIPREDACT</h3>
        <h2>RAVER TEN SCAVER</h2>
        <h1>KISHMIRGA!</h1>
      </Text>
      <hr />
      
      <GreetingOne greeting={greeting} />

      <GreetingTwo {...greeting} />

      <GreetingThree {...greeting} />

      

    </div>
  );
}
/*
const List = props => 
 props.list.map(item=>(
          <div key={item.objectID}>
            <a href={item.url}>{item.title}</a>,
            <span>{item.author}</span>,
            <span>{item.num_comments}</span>,
            <span>{item.points}</span>
          </div>
));
*/

/*************DESTRUCTURING PROPS**************/

//const List = ({ list }) =>
 //list.map(item => <Item key={item.objectID} item={item} />);
/* Desctructuring props object in function signature of each component
const Item = ({ item }) => (
 <div>
   <span>
     <a href={item.url}>{item.title}</a>
   </span>
   <span>{item.author}</span>
   <span>{item.num_comments}</span>
   <span>{item.points}</span>
 </div>
);
*/

// 1) Nested destructuring in component's function signature
/*
const Item = ({

  item: {
    title,
    url,
    author,
    num_comments,
    points,
  },
 
 }) => (
  <div>
    <span>
 
      <a href={url}>{title}</a>
 
    </span>
 
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
 
  </div>
 );
 */

// 2) can use spread operator
 const List = ({ list, onRemoveItem }) =>
  list.map(item => (
   <Item
     key={item.objectID}

    //  title={item.title}
    //  url={item.url}
    //  author={item.author}
    //  num_comments={item.num_comments}
    //  points={item.points}

    //following line is equivalent to above 5 lines, using spread operator
    //{...item}

     item={item}
     onRemoveItem={onRemoveItem}
   />
  )
 );

 // 3) using rest parameter/operator, this way is more consiste but also more advanced
// const List = ({ list }) =>

// list.map(({ objectID, ...item }) => (
//   <Item key={objectID} {...item} />

// ));

// const Item = ({ title, url, author, num_comments, points }) => (
//  <div>
//    <span>
//      <a href={url}>{title}</a>
//    </span>
//    <span>{author}</span>
//    <span>{num_comments}</span>
//    <span>{points}</span>
//  </div>
// );
 const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
 );




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


// due to imperative focus, input field will automatically be focused on page load
const InputWithLabel = ({id, value, type='text', onInputChange, isFocused, children  }) => {

  /* A) First, create a ref with React’s useRef hook. This ref object is a persistent value which stays 
        intact over the lifetime of a React component. It comes with a property called current, which, 
        in contrast to the ref object, can be changed. */
  const inputRef = React.useRef();

  // focus input field imperatively
  /* C) Third, opt into React’s lifecycle with React’s useEffect Hook, performing the focus on the input 
        field when the component renders (or its dependencies change). */
  React.useEffect(() => {
    if( isFocused && inputRef.current )
    {
      /* D) And fourth, since the ref is passed to the input field’s ref attribute, its current property 
            gives access to the element. Execute its focus programmatically as a side-effect, but only if 
            isFocused is set and the current property is existent. */
      inputRef.current.focus();
    }
  },[isFocused]);


  return (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;

    {/* B) Second, the ref is passed to the input field’s JSX-reserved ref attribute and the element 
           instance is assigned to the changeable current property. */}
    <input 
      ref={inputRef}
      id={id}
      value={value}
      type={type}
      onChange={onInputChange}
    />
  </>
 );
};

const Text = ({ children }) => (

  <>
    <strong>{children}</strong>
  </>

)

//const Search = ({ search, onSearch }) => ( {
 // const [searchTerm, setSearchTerm] = React.useState('');

  /*
  const handleChange = event => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);//sets state (value of searchTerm)

    // 2) Callback function from 1 is used here since in App component, onSearch={handleSearch}
    props.onSearch(event);// handleSearch is the callback function from App component, so that runs here
  };                      // and calls back to App component since it's located there?
  */

 // const { search, onSearch } = props; // destructuring props object so that it's properties can be used w/o props object
  // above line is same as:
  //      const search = props.search
  //      const onSearch = props.onSearch

 // return (
    // <>
    //   <label htmlFor="search">Search: </label>
    //   <input 
    //     id="search" 
    //     type="text" 

    //     value={search}
    //     onChange={onSearch}
    //   />
     {/*
     <input id="search" type="text" onChange={handleChange}/> // onSearch uses input field event 
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    
    </>
  );
//}
*/}



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



