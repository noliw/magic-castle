import React from 'react'
import '../Avatars/Avatars.css'

// Assets
import bat from '../../assets/avatars/bat.png'
import bee from '../../assets/avatars/bee.png'
import cat from '../../assets/avatars/cat.png'
import crab from '../../assets/avatars/crab.png'
import dog from '../../assets/avatars/dog.png'
import elephant from '../../assets/avatars/elephant.png'
import fox from '../../assets/avatars/fox.png'
import koala from '../../assets/avatars/koala.png'
import turtle from '../../assets/avatars/turtle.png'

const Avatars = (props) => {

  return (
    <div className="popup-container">
      <div className="popup-menu">
        <div className="popup-header">
          <h3>Select Your Avatar</h3>
          <button id="close-button" onClick={props.handlePopup}>X</button>
        </div>
        <img src={props.formData.avatar} alt="animal-avatar"></img>
        <div className="bottom-ui">
          <select onChange={(e) => props.handleChange(e)} name="avatar" value={props.formData.avatar}>
            <option value={cat}>Cat</option>
            <option value={bat}>Bat</option>
            <option value={bee}>Bee</option>
            <option value={koala}>Koala</option>
            <option value={fox}>Fox</option>
            <option value={crab}>Crab</option>
            <option value={elephant}>Elephant</option>
            <option value={turtle}>Turtle</option>
            <option value={dog}>Dog</option>
          </select>
          <button onClick={props.handlePopup} type="button">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Avatars