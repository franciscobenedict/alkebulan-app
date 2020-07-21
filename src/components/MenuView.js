import React          from 'react';
import { withRouter } from 'react-router-dom';
// import Footer         from "./Footer";

const MenuView = ({history}) => {
  console.log('Menu view');
  return (
    <div className="main">
      <h1>Menu</h1>
      <div className="container">
        <h2>Item List</h2>
        <h2>Add Item</h2>
      </div>
    </div>
  )
}

export default withRouter(MenuView);
