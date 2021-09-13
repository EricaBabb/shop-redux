import React, { createContext, useContext } from "react";
//createContext = to create the container to hold our global state data and functionality
//useContext = another React Hook that will allow us to use the state created from the createContext function.
import { useProductReducer } from './reducers';

const StoreContext = createContext();

//Provider makes the state data that's passed into it as a prop available to all other components
const { Provider } = StoreContext;
//StoreContent is an empty container waiting for data to be provided to it as state
//Consumer is our means of grabbing and using the data that the Provider holds for us 

//StoreProvider is a custom provider function that will be used to manage and update our state using the reducer (useProductReducer) we created earlier as well

//value opens us up to pass in more data for state if we need to
//...props use props.children, as this <StoreProvider> component will wrap all of our other components, making them children of it.
const StoreProvider = ({ value = [], ...props }) => {
    //state is the most up-to-date version of our global state object
    //dispatch is the method we execute to update our state. It is specifically going to look for an action object passed in as its argument
    const [state, dispatch] = useProductReducer({
      products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} 
    //return the StoreContext's <Provider> component with our state object and dispatch the function provided as data for the value prop
    //f we didn't include {...props} in our returning <Provider> component, nothing on the page would be rendered!
    />;
  };

  //useStoreContext = custom function using the useContext() Hook to be used by the components that actually need the data our <StoreProvider> will be providing!
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  //When we execute this function from within a component, we will receive the [state, dispatch] data our StoreProvider provider manages for us.
  //This means that any component that has access to our StoreProvider component can use any data in our global state container or update it using the dispatch function.

  export { StoreProvider, useStoreContext };