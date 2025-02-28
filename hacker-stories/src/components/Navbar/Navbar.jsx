import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="nav">
        <div className="nav-logo">GeoGuessr</div>
        <ul className="nav-menu">
            <li>Leaderboard</li>
            <li>Chat</li>
            <li>Explore</li>
            <li className="nav-sign">Login</li>
            <li className="nav-sign">Register</li>
            
        </ul>
      
    </div>
  )
}

export default Navbar
