import { fetcher } from "@/lib/fetch"
import { notif } from "@/lib/notification"
import { Box, Modal, Text, Divider, Group, Button, Stack } from "@mantine/core"
import { useState } from "react"
import { AlertTriangle  } from "tabler-icons-react"



const ModalDelete = ({ opened, setOpened, data, mutate }) => {
    const [loading,setLoading] = useState(false)

    const handleCancel = () => {
        setOpened(false)
    }
    
    const handleDelete = async (value) => {
        const { id }  = value
        setLoading(true)
        try {
            const resp = await fetcher(`/api/menus/${id}`,{
                method: "DELETE",
                headers :{
                    'Content-Type': 'application/json'
                },    
            });
            notif(true,"Menu deleted","Successfully delete")
            setOpened(false)
            mutate()
        } catch (error) {
            notif(false,"Menu deleted",error)
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
                
                <Text>Do you want delete <strong>{data.name}</strong>?</Text>
                <Divider my={20}/>
            <Group position="right" >
                <Button onClick={handleCancel} variant="outline" color="red">Cancel</Button>
                <Button loading={loading} onClick={()=>handleDelete(data)} variant="filled" color="red" >Delete</Button>
            </Group>
        </Modal>
    )
}

export default ModalDelete