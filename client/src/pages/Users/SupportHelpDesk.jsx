import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import http from "../../http";

function SupportHelpDesk() {
    const [user, setUser] = useState(null);

    // wait for talkjs to load
    const chatboxEl = useRef();
    const [talkLoaded, markTalkLoaded] = useState(false);
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
    }, [])

    useEffect(() => {
        if (talkLoaded && user) {
            // safe to use the SDK here
            const currentUser = new Talk.User({
                id: user.id,
                name: user.userName,
                email: user.emailAccount,
                photoUrl: `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}`,
                welcomeMessage: "Hello!",
                role: "default",
            });

            const otherUser = new Talk.User({
                id: "0",
                name: "Ecolife Team",
                email: "support@ecolife.sg",
                welcomeMessage: "Hello! Please leave a message and we will get back to you as soon as possible!",
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
            chatbox.mount(chatboxEl.current);

            return () => session.destroy();
        }
    }, [talkLoaded, user]);

    return (
        <div
            ref={chatboxEl}
            className="h-screen"
        />
    );
}

export default SupportHelpDesk;
