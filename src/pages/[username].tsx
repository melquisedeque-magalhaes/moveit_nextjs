import Head from 'next/head'
import { GetServerSideProps } from 'next'
import CompletedChallenges from "../components/CompletedChallenges";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import Countdown from "../components/Countdown";

import styles from '../styles/pages/Dashboard.module.css'
import ChallengeBox from '../components/ChallengeBox';
import SwitchReact from '../components/Switch'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface IUserGithub {
    name: string;
    avatar_url: string;
}

interface ProfileData {
    user: IUserGithub;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}

export default function Dashboard({
    user,
    level,
    challengeCompleted,
    currentExperience
}: ProfileData) {

  return (
    <ChallengesProvider
        level={level}
        challengeCompleted={challengeCompleted}
        currentExperience={currentExperience}
    >
        <div className={styles.container}>
            <Head>
                <title>Início | Move.it</title>
            </Head>

            <div className={styles.header}>
                <SwitchReact />
            </div>
            <ExperienceBar />

            <CountdownProvider>
                <section>
                    <div>
                        <Profile user={user} />
                        <CompletedChallenges />
                        <Countdown />
                    </div>
                    <div>
                        <ChallengeBox />
                    </div>
                </section>
            </CountdownProvider>
        </div>
    </ChallengesProvider>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { username } = params

    const { level, currentExperience, challengeCompleted } = req.cookies

    const response = await fetch(`https://api.github.com/users/${username}`)

    const user = await response.json()

    return {
        props: {
            user,
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengeCompleted: Number(challengeCompleted)
        }
    }

}
