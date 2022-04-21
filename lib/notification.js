import { Notif } from '@/components/Dashboard/Notifications';
import toast from 'react-hot-toast';


export const notif = ( success, title, message ) => {
    toast.custom((t) => {
        return (<Notif
            title={title}
            message={message}
            success={success}
            t={t} />)
    })
}