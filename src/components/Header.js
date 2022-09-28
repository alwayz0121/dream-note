function Header({ title, leftSide, rightSide }) {
  return (
    <header>
      <div className="header_left">{leftSide}</div>
      <div className="header_title">{title} </div>
      <div className="header_right">{rightSide} </div>
    </header>
  );
}

export default Header;
