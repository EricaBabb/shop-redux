import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function CategoryMenu() {
  //Old code:
  // const categories = categoryData?.categories || [];

  //retrieve the current state from the global state object and the dispatch() method to update state
const [state, dispatch] = useStoreContext();
//we only need the categories array out of our global state, so we destructure it out of state to provide to our returning JSX
const { categories } = state;
const { data: categoryData } = useQuery(QUERY_CATEGORIES);
//need categoryData that returns from QUERY_CAT. to use in dispatch so state can update. 
//We can't just add the dispatch() method below it, b/c if Q_C is async then categoryData won't exist on load

//useEffect was meant for this situation: useEffect is a function that takes two arguments, a function to run given a certain condition, and then the condition.

useEffect(() => {
  // if categoryData exists or has changed from the response of useQuery, then run dispatch()
  if (categoryData) {
    // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories
    });
  }
  //the condition that categoryData exists (QUERY_CAT. finished to present cat.data)
  //useEffect renders continuously, so even if QUERY_CAT isn't done, meaning this condidition isnt fulfilled to run the inside function, it will run eventually. 
}, [categoryData, dispatch]);

//click-handler to update global state
const handleClick = id => {
  dispatch({
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: id
  });
};

return (
  <div>
    <h2>Choose a Category:</h2>
    {/* map over every item in the categories array */}
    {categories.map(item => (
      <button
      // each item has a specific id
        key={item._id}
        // when this item is clicked the handleClick function will run––adds category id to the global state
        onClick={() => {
          handleClick(item._id);
        }}
      >
        {item.name}
      </button>
    ))}
  </div>
);

}

export default CategoryMenu;
