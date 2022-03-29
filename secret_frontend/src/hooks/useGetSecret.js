import axios from "axios";
import {useEffect, useState} from "react";


export default function useGetSecret(hash){
    const [expireAt, setExpireAt] = useState('')
    const [secretText, setSecretText] = useState('')
    const options = {
        method: 'get',
        url: `http://localhost:3001/secrets/${hash}`
    };
    useEffect(() => {
        axios(options).then(res => {
            setExpireAt(res.data.result.expiresAt)
            setSecretText(res.data.result.secretText)
        })
    },[hash])



    return {
        secretText,
        expireAt
    }
}