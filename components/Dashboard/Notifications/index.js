import { Notification } from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import toast from 'react-hot-toast';


export const Notif = ({ success, title, message, t }) => {
    console.log(t)
    const Icon = success ? Check : X;
    const color = success ? "teal" : "red";
    return (
        
            <Notification 
            icon={<Icon size={18} />} 
            className={`${t.visible? "animate-fade-in":"animate-fade-out"}`}
            color={color} 
            onClose={() => toast.dismiss(t.id)} 
            title={title}
     
            >
                {message}
            </Notification>
       
    )
}

