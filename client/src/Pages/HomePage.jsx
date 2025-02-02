import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from "../context/Globalcontext"
import Card from '../components/Card'
import Pagination from '../components/Pagination';

const DoctorList = () => {
  const { doctors } = useContext(GlobalContext);

  const [currentPage, setCurrentPage] = useState(1)
  const doctorsForPage = 4

  // Calcolo degli indici per la paginazione
  const indexOfLastDoctor = currentPage * doctorsForPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsForPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Cambio pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className='title'>Elenco Medici</h2>
      {doctors.length > 0 ? (

        <div className={currentDoctors.length <= 2 ? 'containerCard2' : 'containerCard'} >
          <div className="row">
            {currentDoctors.map((doctor) => (
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

      {/* Componente di paginazione */}
      <Pagination
        doctorsForPage={doctorsForPage}
        totalDoctors={doctors.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div >
  );
};

export default DoctorList;
