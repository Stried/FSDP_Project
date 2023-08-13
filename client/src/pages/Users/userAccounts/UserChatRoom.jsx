import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import http from "../../../http";

const UserChatRoom = ({otherUserAccount}) => {
    const [ user, setUser ] = useState(null);
    const [ otherUserAcc, setOtherUserAcc ] = useState(null);
    const [ otherUserName, setOtherUserName ] = useState(otherUserAccount);
    console.log("Other user is: " + otherUserName)

    const chatboxEL = useRef();
    const [ talkLoaded, markTalkLoaded ] = useState(false);
    Talk.ready.then(() => markTalkLoaded(true));

    useEffect(() => {
        http.get("/user/viewAccount")
            .then((res) => {
                setUser(res.data);
                console.log("User Info successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        http.get(`/user/${otherUserName}`)
            .then((res) => {
                setOtherUserAcc(res.data);

                console.log("Successfully loaded user info");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [otherUserName]);

    useEffect(() => {
        if (talkLoaded && user && otherUserAcc) {
            const currentUser = new Talk.User({
                id: user.id,
                name: user.userName,
                email: user.emailAccount,
                photoUrl: `${import.meta.env.VITE_FILE_BASE_URL}${
                    user.imageFile
                }`,
                welcomeMessage: "Hello!",
                role: "default",
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

            const conversationId = Talk.oneOnOneId(currentUser, otherUser);
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
    }, [user, otherUserAcc, talkLoaded]);



    return (
        <div className="">
            <button id="openChat">
                Chat
            </button>
        </div>
    )
}

export default UserChatRoom