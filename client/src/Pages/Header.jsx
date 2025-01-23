import Navbar from "../components/Navbar";

export default function Header() {
  return (
    <>
      <div className="header">
        <img className="img-header" src="https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <h1>The doctors</h1>
        <Navbar />
      </div>

    </>
  )
}