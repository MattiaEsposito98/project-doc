import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <>
      <div className="containerHeader">
        <div className="rowHeader">
          <div className="col-40">
            <img className="img-header" src="https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="col-60">
            <div className="header">
              <h1> DocAdvisor <FontAwesomeIcon icon={faUserDoctor} /></h1>
              <Navbar />
            </div>
          </div>
        </div>
      </div>


    </>
  )
}