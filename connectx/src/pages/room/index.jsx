import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';

const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const MyMeeting = async (element) => {
        const appID = 134944629;
        const serverSecret = "350f22f84c2ff00455e1d67411f8cad0";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Yash");

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: 'http://localhost:3000/room/${roomId/}',
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            showScreenSharingButton: true,
        });
    };
    return (
        <>
            <div
                className="MyMeeting"
                ref={MyMeeting}
                style={{ width: '100vw', height: '100vh' }}
            >
            </div>
            <button className='btn btn-primary' onClick={() => navigate("/")}>Logout</button>
        </>
    );
};

export default RoomPage;

