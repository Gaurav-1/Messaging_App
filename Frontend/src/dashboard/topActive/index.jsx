import { useEffect, useState } from "react"
import style from "./style.module.css"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

export default function TopActives({ prop, path }) {

    const [topRegions, setTopRegions] = useState([])
    const [topGroups, setTopGroups] = useState([])
    const [topUsers, setTopUsers] = useState([])
    const navigate = useNavigate()


    function loadActives() {
        fetch(`${path}/topactives`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
        })
            .then(async res => {
                if (res.status == 401) {
                    const err = await res.json()
                    throw new Error(err.error)
                }
                else
                    return res.json()
            })
            .then(res => {
                console.log(res)
                setTopRegions(res.TopRegions)
                setTopGroups(res.TopGroups)
                setTopUsers(res.TopUsers)
            })
            .catch(err => {
                message.error(err.message)
                setTimeout(() => navigate('/signout'), 1000)
            }
            )
    }

    useEffect(()=>{loadActives()},[])

    return (
        <div className={style.topActive}>
            <div className={style.activeCard}>
                <div className={style.activeHeading}>Top Active Regions</div>
                {topRegions.map((ele)=><div>{ele.region}</div>)}
            </div>
            <div className={style.activeCard}>
                <div className={style.activeHeading}>Top Active Groups</div>
                {topGroups.map((ele)=><div>{ele.name}</div>)}
            </div>
            <div className={style.activeCard}>
                <div className={style.activeHeading}>Top Active Users</div>
                {topUsers.map((ele)=><div>{ele.name}</div>)}
            </div>
        </div>
    )
}