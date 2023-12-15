import DoctorCard from './../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import SidePanel from './SidePanel';
import { useEffect, useState } from 'react';
import {baseUrl} from '../../utils/Constants'
const Doctors = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [filterDoctors,setFilterDoctors] = useState([]);
    const [searchQuery,setSearchquery]= useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${baseUrl}randomdoctor/`);
          const data = await response.json();
          setDoctorData(data);
          setFilterDoctors(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(()=>{
      const filterDoctors=doctorData.filter((doctor)=>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterDoctors(filterDoctors);
    },[searchQuery, doctorData])
    const handleSearch = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredDoctors = doctorData.filter((doctor) => {
        const doctorString = JSON.stringify(doctor).toLowerCase();
        return doctorString.includes(lowerCaseQuery);
      });
    
      setFilterDoctors(filteredDoctors);
    };

  return (
    <>
      <section className='bg-[#fff9ea] mb-4'>
        <div className='container text-center'>
          <h2 className='heading'>Find a Doctor</h2>
              <div className='max-w-[570px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
                <input type='search'
                className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
                placeholder='Search Doctor'
                value={searchQuery}
                onChange={(e)=>setSearchquery(e.target.value)}
                />
                <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Search</button>
            </div>
        </div>
      </section>
      <section className='mb-6'>
        <div className='container'>
          {filterDoctors.length> 0 ?(
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {filterDoctors.map((doctor)=>(
                  <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
          </div>
          ) : (
            <p className='text-center'>Sorry, no doctors available for the given search criteria.</p>
          )}
          </div>
      </section>
      <section >
      <div className='container'>
      <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Whats our patients says...</h2>
          <p className='text__para text-center'>
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>
        <Testimonial /> 
      </div>
    </section>
      </>
  )
}

export default Doctors


