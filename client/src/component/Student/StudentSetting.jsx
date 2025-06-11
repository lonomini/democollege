import React from 'react'

export default function StudentSetting() {

    const handleUpdateContact = (event) => {
        event.preventDefault();
    }

    const handleUpdatePassword = (event) => {
        event.preventDefault();
    }

  return (
    <div className='formContent'>
        <h3>Update your contact detail: <span style={{color:"gray"}}>(Disabled for demo purpose.)</span></h3>
        <form onSubmit={handleUpdateContact}>
            <div className='inputField'>
                <div className="inputLabel"><label htmlFor="telephone">Telephone:</label></div>
                <div className='inputDiv'>
                    <input type='text' name='telephone' id='telephone' />
                </div> 
            </div>
            <div>                
            <button type='submit' className='submitButton'>Update</button>
            </div>
        </form>
        <br /><br /><br />
        <h3>Reset your password: <span style={{color:"gray"}}>(Disabled for demo purpose.)</span></h3>
        <form onSubmit={handleUpdatePassword}>
            <div className='inputField'>
                <div className="inputLabel"><label htmlFor='oldpassword'>Old password: </label></div>                
                <div className='inputDiv'>
                    <input type='password' id='oldpassword' name='oldpassword'/>
                </div>
            </div>
            <div className='inputField'>
                <div className="inputLabel"><label htmlFor='newpassword'>New password: </label></div>                
                
                <div className='inputDiv'>
                    <input type='password' id='newpassword' name='newpassword'/>
                </div>
            </div>
            <div className='inputField'>
                <div className="inputLabel"><label>Re-type new password: </label></div>                
                <div className='inputDiv'>
                    <input type='password' id='renewpassword' name='renewpassword'/>
                </div>
            </div>
            <div>
            <button type='submit' className='submitButton'>Update</button>
            <button type='reset' className='submitButton'>Reset</button>
            </div>
        </form>
    </div>
  )
}
