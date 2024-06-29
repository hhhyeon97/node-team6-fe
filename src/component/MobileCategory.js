import React, { useState } from 'react'
import '../style/css/MobileCategory.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const MobileCategory = ({showCategory, setShowCategory}) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  let categoryIndex = null;
  const menuList = [
    { name: '뮤지컬', code: 'GGGA' },
    { name: '콘서트', code: 'CCCD' },
    { name: '클래식', code: 'CCCA' },
    { name: '국악', code: 'CCCC' },
    { name: '무용', code: 'BBBC' },
    { name: '연극', code: 'AAAA' },
  ]
  const sendCategory = (code) => {
    categoryIndex = menuList.findIndex(menu => menu.code === code);
    let categoryName = menuList.find(menu => menu.code === code);
    setCategory(categoryIndex)
    setShowCategory(0);
    console.log('categoryName:', categoryName.name)
    navigate(`/performance?category=${code}&categoryName=${categoryName.name}`)
  }

  return (
    <ul className='mobile_nav_category_area' style={{width:showCategory}}>
      <li className='close_btn' onClick={()=>setShowCategory(0)}><FontAwesomeIcon icon={faMinus} /></li>
        {menuList.map((menu, index) => (
            <li key={index}>
                <button onClick={() => sendCategory(menu.code)} className='nav_category_button'>
                    {menu.name}
                </button>
            </li>
        ))}
    </ul>
  )
}

export default MobileCategory
