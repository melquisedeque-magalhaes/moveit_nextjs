import { createContext, useState, ReactNode } from 'react'

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

    function startNewChallenge() {
       const randomChallenges = Math.floor(Math.random() * challenges.length)
       const indexChallenges = challenges[randomChallenges]

       setActiveChallenges(indexChallenges)
    }

    function resetChallenge() {
        setActiveChallenges(null)
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
                experienceToNextLevel
             }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}
