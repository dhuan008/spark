import React from 'react'
import './UserInfoInput.scss'

function UserInfoInput(): JSX.Element {
  return (
    <div className='uk-container'>
      <form>
        <fieldset className='uk-fieldset'>
          <legend className='uk-legend'>Personal Details</legend>
        </fieldset>
      </form>
    </div>
  )
}

export default UserInfoInput
