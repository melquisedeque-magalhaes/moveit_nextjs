import Head from 'next/head'
import CompletedChallenges from "../components/CompletedChallenges";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import Countdown from "../components/Countdown";

import styles from '../styles/pages/Dashboard.module.css'
import ChallengeBox from '../components/ChallengeBox';
import SwitchReact from '../components/Switch'
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Dashboard() {
  return (
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
                    <Profile />
                    <CompletedChallenges />
                    <Countdown />
                </div>
                <div>
                    <ChallengeBox />
                </div>
            </section>
        </CountdownProvider>
    </div>
  )
}
