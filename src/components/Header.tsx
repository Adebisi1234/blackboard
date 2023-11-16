const Header = ({ toolName }: { toolName: string }) => {
  console.log("Header Rendered");
  return (
    <header>
      <div className="menu">{toolName}</div>
      <div className="logo">Blackboard</div>
      <div className="profile">
        <div className="account">Account</div>
        <div className="share">Share</div>
      </div>
    </header>
  );
};

export default Header;
