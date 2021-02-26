import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
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
    closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    const [ level, setLevel ] = useState(rest.level ?? 1)
    const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0)
    const [ challengeCompleted, setChallengeCompleted ] = useState(rest.challengeCompleted ?? 0)

    const [ activeChallenges, setActiveChallenges ] = useState(null)
    const [ isLevelModalOpen, setIsLevelModalOpen ] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
    }

    useEffect(() => {
        Notification.requestPermission()
    },[])

    useEffect(() => {

        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeCompleted', String(challengeCompleted))

    },[level, currentExperience, challengeCompleted])

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

    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
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
                completeChallenge,
                closeLevelUpModal
             }}
        >
            {children}
            {isLevelModalOpen && <LevelUpModal />}

        </ChallengesContext.Provider>
    )
}
