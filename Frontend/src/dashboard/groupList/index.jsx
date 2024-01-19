import style from "./style.module.css"


export default function GroupList({props}){
    return(
        <div className={style.group_card} key={props._id}>
            <p className={style.group_name}>{props.name}</p>
        </div>
    )
}