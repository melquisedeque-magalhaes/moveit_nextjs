import { useTheme } from 'next-themes'
import { useState } from 'react'
import SwitchReact from 'react-switch'

interface ThemeData {
    type: 'light' | 'dark';
}

export default function Switch() {

    const { theme, setTheme } = useTheme()
    const [ isActiveTheme, setIsActiveTheme ] = useState(false)

    function changeTheme() {

        if(isActiveTheme){
            setTheme('light')
            setIsActiveTheme(false)
        }else {
            setTheme('dark')
            setIsActiveTheme(true)
        }

    }

    return (
        <SwitchReact
            onChange={changeTheme}
            checked={theme === 'dark' ? true : false}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor='#666666'
            onColor='#4953b8'
        />
    )
}
