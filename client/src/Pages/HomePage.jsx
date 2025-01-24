import { useContext } from 'react';
import { GlobalContext } from "../context/Globalcontext"

const DoctorList = () => {
  const { doctors } = useContext(GlobalContext);

  return (
    <div>
      <h2>Elenco Medici</h2>
      {doctors.length > 0 ? (
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.ID_medico}>
              <h3>{doctor.Nome} {doctor.Cognome}</h3>

            </li>
          ))}
        </ul>
      ) : (
        <p>Nessun medico trovato.</p>
      )}
    </div>
  );
};

export default DoctorList;
