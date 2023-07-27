import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";

function MyChatComponent() {
    // wait for talkjs to load
    const chatboxEl = useRef();
    const [talkLoaded, markTalkLoaded] = useState(false);
    Talk.ready.then(() => markTalkLoaded(true));

    useEffect(() => {
        if (talkLoaded) {
            // safe to use the SDK here
            const currentUser = new Talk.User({
                id: "1",
                name: "Henry Mill",
                email: "henrymill@example.com",
                welcomeMessage: "Hello!",
                role: "default",
            });

            const otherUser = new Talk.User({
                id: "2",
                name: "Jessica Wells",
                email: "jessicawells@example.com",
                welcomeMessage: "Hello!",
                role: "default",
            });

            const session = new Talk.Session({
                appId: "tgl97MQ2",
                me: currentUser,
            });

            const conversationId = Talk.oneOnOneId(currentUser, otherUser);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            const chatbox = session.createInbox();
            chatbox.select(conversation);
            chatbox.mount(chatboxEl.current)

            return () => session.destroy();
        }
    }, [ talkLoaded ]);
    
    return <div ref={chatboxEl} className="h-screen" />
}

export default MyChatComponent;