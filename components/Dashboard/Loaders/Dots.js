import { Loader } from "@mantine/core"

export const DotsLoader = () => {
    return(
        <div className="fixed w-full h-full top-0 left-0 bottom-0 right-0 justify-center items-center flex flex-col">
            <Loader size="xl" variant="dots" />
            <p>Please Wait....</p>
        </div>
    )
}