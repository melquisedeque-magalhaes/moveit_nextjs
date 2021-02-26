import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from './ChallengesContext'


interface ChallengesProviderProps {
    children: ReactNode;
}

interface CountdownContextData {
    minutes: number;
    seconds: number;
    startCountdown: () => void;
    resetCountdown: () => void;
    hasFinished: boolean;
    isActive: boolean;
}

export const CountdownContext = createContext({} as CountdownContextData )

export function CountdownProvider({ children }: ChallengesProviderProps){

    let countdownTimeout: NodeJS.Timeout

    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown(){
        setIsActive(false)
        clearTimeout(countdownTimeout)
        setHasFinished(false)
        setTime(25 * 60)
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    },[isActive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            startCountdown,
            resetCountdown,
            hasFinished,
            isActive
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
