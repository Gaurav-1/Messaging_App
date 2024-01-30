import style from './style.module.css'

export default function Messages({prop}){
    return(
        <div className={prop.userId=="me"?style.me : style.other}>
            <p>{prop.message}</p>
            <span>{new Date(prop.sendTime).toLocaleString()}</span>
        </div>
    )
}