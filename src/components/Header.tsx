const Header = ({ toolName }: { toolName: string }) => {
  return (
    <header>
      <div className="max"></div>
      <div className="logo">Blackboard</div>
      <div className="profile">
        <div className="account">Account</div>
        <div className="share">Share</div>
      </div>
    </header>
  );
};

export default Header;
