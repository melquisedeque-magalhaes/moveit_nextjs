import { createContext, useState, ReactNode, useEffect } from 'react'

import challenges from '../../challenges.json'

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenges {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number;
    challengeCompleted: number;
    startNewChallenge: () => void;
    activeChallenges: Challenges;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [ level, setLevel ] = useState(1)
    const [ currentExperience, setCurrentExperience ] = useState(0)
    const [ challengeCompleted, setChallengeCompleted ] = useState(0)

    const [ activeChallenges, setActiveChallenges ] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }

    useEffect(() => {
        Notification.requestPermission()
    },[])

    function startNewChallenge() {
       const randomChallenges = Math.floor(Math.random() * challenges.length)
       const indexChallenges = challenges[randomChallenges]

       setActiveChallenges(indexChallenges)

       new Audio('/notification.mp3').play()

       if(Notification.permission === 'granted'){
           new Notification('Novo Desafio \u{1F947}', {
               body: `Valendo ${indexChallenges.amount} Xp`,
               icon: '/favicon.png'
           })
       }
    }

    function resetChallenge() {
        setActiveChallenges(null)
    }

    function completeChallenge() {
        if(!activeChallenges)
            return

        const { amount } = activeChallenges

        let finalExperience = currentExperience + amount

        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenges(null)
        setChallengeCompleted(challengeCompleted + 1)
    }

    return(
        <ChallengesContext.Provider
            value={{
                level,
                levelUp,
                currentExperience,
                challengeCompleted,
                startNewChallenge,
                activeChallenges,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
             }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}
