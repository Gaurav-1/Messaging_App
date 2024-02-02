import style from './style.module.css'

export default function Messages({ prop, CurrentUser }) {
    console.log('Prop: ',prop,"Cur: ",CurrentUser)
    return (
        <div className={(prop.userId[0] == CurrentUser) ? style.me : style.other}>
            <p>{prop.message}</p>
            <span>{new Date(prop.sendTime).toLocaleString()}</span>
        </div>
    )
}