import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalContext"
import Card from '../components/Card'
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';

const DoctorList = () => {
  const { doctors, filters } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1)
  const doctorsForPage = 4


  function home() {
    window.location.reload()
  }

  // Filtraggio dei medici in base ai filtri
  const filteredDoctors = doctors.filter(doctor => {
    return (
      (filters.Nome ? doctor.Nome.toLowerCase().includes(filters.Nome.toLowerCase()) : true) &&
      (filters.Cognome ? doctor.Cognome.toLowerCase().includes(filters.Cognome.toLowerCase()) : true) &&
      (filters.Specializzazione ? doctor.Specializzazione.toLowerCase().includes(filters.Specializzazione.toLowerCase()) : true)
    );
  });


  // Calcolo degli indici per la paginazione
  const indexOfLastDoctor = currentPage * doctorsForPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsForPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Cambio pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      <h2 className='title'>Elenco Medici</h2>
      <Filter />
      {filteredDoctors.length > 0 ? (
        <div className={currentDoctors.length <= 3 ? 'containerCard2' : 'containerCard'} >
          <div className="row">
            {currentDoctors.map((doctor) => (
              <div className="card-position" key={doctor.ID_medico}>
                <Card doctor={doctor} />
              </div>
            ))}

          </div>

        </div>
      ) : (
        <div className='nobodyDoctors'>
          <button className='buttonNavigate' onClick={home}> Ritorna alla pagina principale</button>
          <p>Nessun medico trovato.</p>
        </div>

      )
      }

      {/* Componente di paginazione */}
      <Pagination
        doctorsForPage={doctorsForPage}
        totalDoctors={filteredDoctors.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div >
  );
};

export default DoctorList;
