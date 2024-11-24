import React, { useState, useEffect} from 'react'
import axios from 'axios'
import './foodquality.css'
import FoodQualityView from '../../components/FoodQualityView';

const FoodQuality = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
          const fetchMenu = async () => {
            const { data } = await axios.get('/api/menu?_limit=2');
            setMenu(data)
          }
          fetchMenu()
      }, []);

  return (
    <div className='responsibility'>
      <div className='responsibility-header quality'>
        <h1>Our Desserts</h1>
      </div>
      <div className="our-desserts">
        <div className='dessert-wrapper'>
            {menu.map((item) => (
               <FoodQualityView key={item.id} {...item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default FoodQuality
