import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import http from "../../http";

const UserChatRoom = ({otherUserAccount}) => {
    const [ user, setUser ] = useState(null);
    const [ otherUserAcc, setOtherUserAcc ] = useState(null);
    console.log("Other user is: " + otherUserAccount)

    const chatboxEL = useRef();
    const [ talkLoaded, markTalkLoaded ] = useState(false);
    Talk.ready.then(() => markTalkLoaded(true));

    useEffect(() => {
        http.get("/user/viewAccount")
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
                console.log(user);
                console.log("User Info successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        http.get(`/user/${otherUserAccount}`)
            .then((res) => {
                setOtherUserAcc(res.data);
                
                console.log(res.data);
                console.log("The other user is" + otherUserAcc);
                console.log("Successfully loaded user info");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (talkLoaded && user) {
            const currentUser = new Talk.User({
                id: user.id,
                name: user.userName,
                email: user.emailAccount,
                photoUrl: `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile
                    }`,
                welcomeMessage: "Hello!",
                role: "default"
            });

            const otherUser = new Talk.User({
                id: otherUserAcc.id,
                name: otherUserAcc.userName,
                email: otherUserAcc.emailAccount,
                role: "default",
            });

            const session = new Talk.Session({
                appId: "tgl97MQ2",
                me: currentUser,
            });

            const conversationId = Talk.oneOnOneId(
                currentUser,
                otherUser
            );
            const conversation =
                session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            const chatbox = session.createPopup();
            chatbox.select(conversation);
            chatbox.mount({ show: false });
            
            const button = document.getElementById("openChat");
            button.addEventListener("click", (event) => {
                event.preventDefault();
                chatbox.show();
            });

            return () => session.destroy();
        }
    }, [ talkLoaded, user ]);



    return (
        <div className="">
            <button id="openChat">
                Chat
            </button>
        </div>
    )
}

export default UserChatRoom