import React, {useState} from "react";
import useAddSecret from "../hooks/useAddSecret";
import Expire from "../components/Expire";


export default function Index() {
    const [form, setForm] = useState({})
    const onInputChanged = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const {handleSubmit} = useAddSecret(form)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{display:`flex`,}}>
                    <label>
                        Secret:
                        <input type="text" name="secret" value={form.secret || ""} onChange={(event) => onInputChanged(event)} />
                    </label>
                    <label>
                        Expire After:
                        <input type="text" name="expireafter" value={form.expireafter || ""} onChange={(event) => onInputChanged(event)} />
                    </label>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}