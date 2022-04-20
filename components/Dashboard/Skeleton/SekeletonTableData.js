import { Group, Skeleton } from "@mantine/core"

export const SkeletonTableData = ({}) => {
    return(
        <div className="mt-10  px-6 py-6 bg-white flex flex-col radius-md">
            <Group position="apart">
            <Skeleton height={40} width={200} />
            <Skeleton height={40} width={80} />
            </Group>
            <Skeleton height={40} mt={40} />
            <Skeleton height={400} mt={20} />
        </div>
    )
}