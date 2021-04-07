import React from 'react'
import Video from './Video';
import HopeBox from './HopeBox';
import Quiz from './Quiz';
import HomeAssign from './HomeAssign';

import ModuleHeader from '../ModuleHeader/ModuleHeader';
import SideMenu from '../Menu/SideMenu';

import Worksheet from './Worksheet';


const Hope = ({ loggedIn,onLogin,user,setUser }) => {
    
    return (
        <div>
            
            <ModuleHeader
                loggedIn={loggedIn}
                onLogin={onLogin}
                user={user}
                setUser={setUser} />
            
            <Video />
            <Worksheet
                loggedIn={loggedIn}
                onLogin={onLogin}
                user={user}
                setUser={setUser}
                
            />
            <HopeBox
                loggedIn={loggedIn}
                onLogin={onLogin}
                user={user}
                setUser={setUser}
                
            />
            <Quiz />
            <HomeAssign
                loggedIn={loggedIn}
                onLogin={onLogin}
                user={user}
                setUser={setUser}
                
            />
        </div>
    );
}

export default Hope
