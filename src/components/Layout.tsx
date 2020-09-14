import React from "react";

const Layout = (props) => {
  return (
    <div className="wrapper">
      <header>
        <div>Logo</div>
      </header>
      <main>
        <div>{props.children}</div>
      </main>
      <footer>
        <h3>Our addresses'</h3>
      </footer>
    </div>
  );
};

export default Layout;
