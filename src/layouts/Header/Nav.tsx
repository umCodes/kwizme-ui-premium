import NavBtn from "./NavBtn"

const Nav = () => {
  


  return (
    <nav className="max-sm:border mx-auto grid grid-cols-3 gap-4">
        <NavBtn  to="/" text="Lab"/>
        <NavBtn  to="/quizhistory" text="History"/>
        <NavBtn to="/feedback" text="Feedback"/>
    </nav>
  )
}

export default Nav