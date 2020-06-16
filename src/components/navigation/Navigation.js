import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <p onClick={() => onRouteChange('signOut')} className='f2 link dim black pa1 pointer'>Sign Out</p>
                {/* <p className='f2 pa1'>|</p>
                <p onClick={() => onRouteChange('deleteAccount')} className='f2 link dim black pa1 pointer'>Sign Out</p> */}
            </nav>
        )
    } else {
        return (
            < nav style = {{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signIn')} className='f2 link dim black pa1 pointer'>Sign In</p>
        <p className='f2 pa1'>|</p>
        <p onClick={() => onRouteChange('register')} className='f2 link dim black pa1 pointer'>Register</p>
        </nav >
        )
    }
        
    
}

export default Navigation;
