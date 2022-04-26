import { Box, Modal, Text, Divider, Group, Button, Stack } from "@mantine/core"
import { AlertTriangle  } from "tabler-icons-react"
import { useState } from 'react'
import { notif } from "@/lib/notification"
import { fetcher } from "@/lib/fetch"


const ModalDeleteBulk = ({ opened, setOpened, data ,mutate }) => {
    const [loading,setLoading] = useState(false)

    const handleCancel = () => {
        setOpened(false)
    }
    
    const handleDeleteBulk = async (values) => {
       
       
        const ids = values.map(user=>user.id)
       
        setLoading(true)
        try {
            const resp = await fetcher(`/api/users`,{
                method: "DELETE",
                headers :{
                    'Content-Type': 'application/json'
                }, 
                body : JSON.stringify({ids})
            });
            notif(true,"Users deleted","Successfully deleted")
            setOpened(false)
            mutate()
        } catch (error) {
            notif(false,"Users deleted",error)
        }
       
        setLoading(false)

      
    }

    return (
        <Modal
            centered
            title="Delete confirmation"
            opened={opened}
        >
                <Divider my={20}/>
                <Group mb={20}  >
                    <AlertTriangle size={50} color="red "/>
                    <Text size="lg" align="center" >Warning</Text>
                </Group>
                
                <Text>Do you want delete all this data?</Text>
                {data.map((item,id)=><Text key={id}>- <strong>{item.name}</strong></Text>)}
                <Divider my={20}/>
            <Group position="right" >
                <Button onClick={handleCancel} variant="outline" color="red">Cancel</Button>
                <Button loading={loading} onClick={()=>handleDeleteBulk(data)} variant="filled" color="red" >Delete</Button>
            </Group>
        </Modal>
    )
}

export default ModalDeleteBulk