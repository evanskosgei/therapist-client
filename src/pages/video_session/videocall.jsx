import React, { useEffect, useRef, useState, useCallback } from 'react';

const Videocall = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const peerConnectionRef = useRef(null);

    // ICE configuration for STUN/TURN servers
    const iceConfig = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            // Add TURN servers here for better connectivity
            // {
            //     urls: 'turn:your-turn-server.com',
            //     username: 'your-username',
            //     credential: 'your-password'
            // }
        ]
    };

    // Set up local media stream
    const setupLocalStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            return stream;
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    }, []);

    // Create peer connection
    const createPeerConnection = useCallback(() => {
        const pc = new RTCPeerConnection(iceConfig);

        // Add local stream tracks to peer connection
        if (localStream) {
            localStream.getTracks().forEach(track => {
                pc.addTrack(track, localStream);
            });
        }

        // Handle incoming remote tracks
        pc.ontrack = (event) => {
            const remoteMediaStream = event.streams[0];
            setRemoteStream(remoteMediaStream);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteMediaStream;
            }
        };

        // Handle ICE candidate generation
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                // In a real app, you'd send this candidate to the remote peer
                console.log('New ICE candidate:', event.candidate);
            }
        };

        return pc;
    }, [localStream]);

    // Create offer
    const createOffer = useCallback(async () => {
        try {
            const pc = createPeerConnection();
            peerConnectionRef.current = pc;

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            // In a real app, you'd send this offer to the remote peer
            console.log('Created offer:', offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    }, [createPeerConnection]);

    // Handle incoming offer
    const handleOffer = useCallback(async (offer) => {
        try {
            const pc = createPeerConnection();
            peerConnectionRef.current = pc;

            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            // In a real app, you'd send this answer to the remote peer
            console.log('Created answer:', answer);
            return answer;
        } catch (error) {
            console.error('Error handling offer:', error);
        }
    }, [createPeerConnection]);

    // Initialize video call
    useEffect(() => {
        let cleanup = () => {};

        const initVideoCall = async () => {
            const stream = await setupLocalStream();
            
            // In a real app, you'd implement signaling to exchange offers/candidates
            await createOffer();

            // Cleanup function
            cleanup = () => {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                if (peerConnectionRef.current) {
                    peerConnectionRef.current.close();
                }
            };
        };

        initVideoCall();

        // Cleanup on component unmount
        return () => cleanup();
    }, [setupLocalStream, createOffer]);

    // Update video sources when streams change
    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [localStream, remoteStream]);

    return (
        <div className="flex justify-center space-x-4 p-4">
            <div className="w-1/2">
                <h2 className="text-center mb-2">Local Video</h2>
                <video 
                    ref={localVideoRef} 
                    autoPlay 
                    muted 
                    className="w-full rounded-lg shadow-lg"
                />
            </div>
            <div className="w-1/2">
                <h2 className="text-center mb-2">Remote Video</h2>
                <video 
                    ref={remoteVideoRef} 
                    autoPlay 
                    className="w-full rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default Videocall;