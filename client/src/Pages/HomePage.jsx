import { useContext } from 'react';
import { GlobalContext } from "../context/Globalcontext"
import Card from '../components/Card'

const DoctorList = () => {
  const { doctors } = useContext(GlobalContext);

  return (
    <div>
      <h2 className='title'>Elenco Medici</h2>
      {doctors.length > 0 ? (

        <div className="container">
          <div className="row">
            {doctors.map((doctor) => (
              <div className="card-position" key={doctor.ID_medico}>
                <Card doctor={doctor} />
              </div>
            ))}

          </div>
        </div>
      ) : (
        <p>Nessun medico trovato.</p>
      )
      }
    </div >
  );
};

export default DoctorList;
