import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
    //Fetch profile threads specific to the user
    let result = await fetchUserPosts(accountId);
    if(!result) redirect('/')

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                content={thread.text}
                author={
                    accountType === 'User' 
                    ? { name: result.name, image: result.image, id: result.id }
                    : { name: thread.author.name, image: thread.author.image,
                    id: thread.author.id }
                } //to check if the current user is the author 
                community={thread.community} //todo: check if the current user is the owner of the community
                createdAt={thread.createdAt}
                comments={thread.children}
                isComment
            />
            ))}
        </section>
    )
}

export default ThreadsTab;