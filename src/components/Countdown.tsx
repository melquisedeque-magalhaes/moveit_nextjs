import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export default function Countdown() {

    const {
        minutes,
        seconds,
        isActive,
        hasFinished,
        resetCountdown,
        startCountdown
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] =  String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] =  String(seconds).padStart(2, '0').split('')



    return (
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                    Ciclo Encerrado
                </button>
            ) : (
                <>
                     {isActive ? (
                        <button
                            onClick={resetCountdown}
                            type='button'
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                            Abandonar Ciclo
                        </button>
                    ) : (
                        <button
                            onClick={startCountdown}
                            type='button'
                            className={styles.countdownButton}>
                            Iniciar um Ciclo
                        </button>
                    )}
                </>
            )}



        </>
    )
}
