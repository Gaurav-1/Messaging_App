import style from "./style.module.css"


export default function GroupList({props, HandelChat}){
    return(
        <div className={style.group_card} key={props._id} onClick={()=>HandelChat(props._id,true)}>
            <p className={style.group_name}>{props.name}</p>
        </div>
    )
}