import {useEffect, useState} from "react";


export default function Expire(props){
    const [visible, setVisible] = useState(true);
    let date = new Date()

    useEffect(() => {
        if(props.delay < 0){
            setTimeout(() => {
                setVisible(false);
            }, props.delay);
        }
    }, [props.delay]);

    return (
        visible ? <div>{props.children}</div>
            :  <div >Secret Cannot be Reachable!</div>
    )
}