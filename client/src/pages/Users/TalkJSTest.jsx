import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import http from "../../http";
import { Spinner } from "flowbite-react";

function MyChatComponent() {
    const [user, setUser] = useState(null);

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

    // wait for talkjs to load
    const chatboxEl = useRef();
    const [talkLoaded, markTalkLoaded] = useState(false);
    Talk.ready.then(() => markTalkLoaded(true));

    useEffect(() => {
        if (talkLoaded && user) {
            // safe to use the SDK here
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

            const session = new Talk.Session({
                appId: "tgl97MQ2",
                me: currentUser,
            });

            const chatbox = session.createInbox();
            // chatbox.select(conversation);
            chatbox.mount(document.getElementById("chatboxEl"));

            return () => session.destroy();
        }
    }, [talkLoaded, user]);

    return (
        <div className="h-screen">
            
                <div
                    id="chatboxEl"
                    className="h-3/4 mx-auto max-w-screen"
                />
            
        </div>
    );
}

export default MyChatComponent;
