import {useParams} from "react-router-dom";
import Expire from "../../components/Expire";
import useGetSecret from "../../hooks/useGetSecret";
import {useEffect, useState} from "react";

export default function Secret(){
    const currentdate = new Date();
    let newDate = null
    const [dif, setDif] = useState('')
    let { hash } = useParams();
    const {expireAt,secretText} = useGetSecret(hash)
    useEffect(() => {
        const [first, second] = expireAt.split(' ').map(item => item.trim());
        const [day, month, year] = first.split('.');
        if(second){
            const [hours, minutes, seconds] = second.split(':');
            newDate = new Date(Number(year), month - 1, Number(day), hours, minutes, seconds);
            setDif(Math.floor(parseInt(newDate.getTime() - currentdate.getTime() ) / 1000) * 100);
        }
    }, [expireAt])
    return (
        <div>
            <Expire delay={dif}>{secretText}</Expire>
        </div>

    )
}